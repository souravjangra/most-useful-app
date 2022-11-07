/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-new */
import {IBlock} from '@application/interfaces/Block';
import {randomDate} from '@application/utils';
import {
  getLastNMonths,
  millisToHours,
  millisToMinutes,
  roundToNearestMinutes,
} from '@application/utils/date';
import {wp} from '@application/utils/normalize';
import {theme} from '@core/theme';
import {Box} from '@features/components/atoms';
import HStack from '@features/components/atoms/HStack';
import {CreateGraph} from '@features/components/molecules/CreateGraph';
import {StatsCard} from '@features/components/molecules/StatsCard';
import {TimeTrackGraph} from '@features/components/molecules/TimeTrackGraph';
import {TimeTrackGraphData} from '@features/components/molecules/TimeTrackGraph/TimeTrackGraph';
import {useNavigation, useRoute} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '@store/index';
import {setBlocks} from '@store/slices/app';
import moment from 'moment';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStackParamList} from '..';
import Style from './Style';

type Props = NativeStackScreenProps<CommonStackParamList, 'Home'>;
type HomeScreenNavigationProp = Props['navigation'];
type HomeScreenRouteProp = Props['route'];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();

  const dispatch = useAppDispatch();
  const appState = useAppSelector(state => state.app);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Most Useful App Ever',
    });
  }, [navigation]);

  const [timeTrackData, setTimeTrackData] = useState<TimeTrackGraphData>({
    data: {
      labels: getLastNMonths(),
      datasets: [
        {
          data: [100, 200],
          color: () => theme.colors.black,
          strokeWidth: 2,
        },
      ],
    },
  });

  useEffect(() => {
    setTimeTrackData({
      ...timeTrackData,
      data: {
        ...timeTrackData.data,
        datasets: [
          {
            data: appState.timeTrackedByMonth,
            color: () => theme.colors.black,
            strokeWidth: 2,
          },
        ],
      },
    });
  }, [appState.timeTrackedByMonth]);

  /**
   *
   * @param startDate
   * @param endDate
   * @returns break time for the block
   */
  const calculateBreakTime = (startDate: Date, endDate: Date): number => {
    var startBreak: number = randomDate(startDate, endDate).getTime() / 1000;
    var endBreak: number = randomDate(startDate, endDate).getTime() / 1000;

    var breakDiff = moment(endBreak).diff(startBreak, 'milliseconds');

    var breakDiffInMinutes = millisToMinutes(breakDiff);

    /**
     * Minimum break length (in minutes)
     */
    const MIN_BREAK_LENGTH = 0;

    /**
     * Maximum break length (in minutes)
     */
    const MAX_BREAK_LENGTH = 45;

    /**
     * Regenerate break if the break length is less than 0 minutes and greater than 45 minutes
     */

    while (
      breakDiffInMinutes < MIN_BREAK_LENGTH ||
      breakDiffInMinutes > MAX_BREAK_LENGTH
    ) {
      startBreak = randomDate(startDate, endDate).getTime() / 1000;
      endBreak = randomDate(startDate, endDate).getTime() / 1000;

      breakDiff = moment(endBreak).diff(startBreak, 'milliseconds');
      breakDiffInMinutes = millisToMinutes(breakDiff);
    }
    return breakDiff;
  };

  /**
   *
   * @param minDate
   * @param currentDate
   * @returns block length object
   */
  const calculateBlockLength = (minDate: Date, currentDate: Date) => {
    const startDate: Date = randomDate(minDate, currentDate);
    const endDate: Date = randomDate(minDate, currentDate);

    const breakTimeLength = calculateBreakTime(startDate, endDate);
    const startDateInMillis = startDate.getTime() / 1000;
    const endDateInMillis = endDate.getTime() / 1000;

    /**
     * block length in milliseconds
     */
    const blockLength = endDateInMillis - startDateInMillis - breakTimeLength;
    /** rounding block length to the nearest 15 minutes */
    const roundedBlockLength =
      roundToNearestMinutes(blockLength).getTime() / 1000;

    return {
      startDate,
      endDate,
      breakTimeLength,
      blockLength,
      roundedBlockLength,
    };
  };

  const onDoIt = async () => {
    const currentDate = new Date(Date.now());
    const minDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 6,
      currentDate.getDate(),
    );

    /**
     * Setting the minimum date to have only past 6 months
     */
    minDate.setMonth(currentDate.getMonth() - 6);
    const noOfDates = 100;
    const arr = [...Array(noOfDates).keys()];
    const promises: Promise<IBlock>[] = [];
    arr.map(i => {
      promises.push(
        new Promise(resolve => {
          var calculateblockData = calculateBlockLength(minDate, currentDate);
          var roundedBlockLength = calculateblockData.roundedBlockLength;

          var blockTimeLenthInHours = millisToHours(roundedBlockLength);
          var blockTimeLenthInMinutes = millisToMinutes(roundedBlockLength);

          /** total length of the block should be between 10 minutes and 10 hours */
          while (blockTimeLenthInMinutes < 10 || blockTimeLenthInHours > 10) {
            calculateblockData = calculateBlockLength(minDate, currentDate);
            roundedBlockLength = calculateblockData.roundedBlockLength;

            blockTimeLenthInHours = millisToHours(roundedBlockLength);
            blockTimeLenthInMinutes = millisToMinutes(roundedBlockLength);
          }
          var {startDate, endDate, breakTimeLength} = calculateblockData;
          const block: IBlock = {
            startDate,
            endDate,
            breakLength: breakTimeLength,
            createdAt: new Date(Date.now()),
            blockTimeInHrs: blockTimeLenthInHours,
            month: moment(startDate).format('MMM'),
          };

          resolve(block);
        }),
      );
    });

    await Promise.all(promises).then(dates => {
      dispatch(setBlocks(dates));
    });
  };

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Style.container.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={Style.container}
        contentContainerStyle={Style.contentContainerStyle}>
        {/** Graph Component */}
        <TimeTrackGraph data={timeTrackData.data} />
        <HStack marginTop={'lg'}>
          {/** Stats card for today tracked time */}
          <StatsCard variant="today" value={`${appState.timeTrackedToday}h`} />
          <Box width={wp(16)} />
          {/** Stats card for this week tracked time */}
          <StatsCard
            variant="this_week"
            value={`${appState.timeTrackedThisWeek}h ${
              appState.timeTrackedThisWeek / 60
            }m`}
          />
        </HStack>
        <CreateGraph onTap={onDoIt} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
