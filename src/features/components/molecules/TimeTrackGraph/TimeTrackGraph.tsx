import {hp, wp} from '@application/utils/normalize';
import {theme} from '@core/theme';
import {Typography} from '@features/components/atoms';
import HStack from '@features/components/atoms/HStack';
import {SvgIcon} from '@features/components/atoms/Icon';
import VStack from '@features/components/atoms/VStack';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import Style from './Style';

interface GraphData {
  data: number[];
  color: () => string;
  strokeWidth: number;
}

export interface TimeTrackGraphData {
  data: {
    labels: string[];
    datasets: GraphData[];
  };
}

const TimeTrackGraph = (props: TimeTrackGraphData) => {
  const {data} = props;

  /**
   * Chart Configuration for customizing the graph
   */
  const chartConfig = {
    backgroundColor: theme.colors.white,
    backgroundGradientTo: theme.colors.white,
    backgroundGradientFromOpacity: 0,
    backgroundGradientFrom: theme.colors.white,
    backgroundGradientToOpacity: 0,
    fillShadowGradientFrom: theme.colors.white,
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientFromOffset: 0,
    fillShadowGradientTo: theme.colors.white,
    fillShadowGradientToOpacity: 0,
    fillShadowGradientToOffset: 0,
    color: () => theme.colors.black,
    labelColor: () => theme.colors.lightGray,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForVerticalLabels: Style.labelText,
    propsForHorizontalLabels: Style.labelText,
    propsForDots: {
      r: '6',
      strokeWidth: '4',
      stroke: theme.colors.primary,
      fill: theme.colors.white,
    },
    propsForBackgroundLines: {
      stroke: theme.colors.lightGray2,
      strokeWidth: 1,
    },
  };

  /**
   *
   * @param value value of the dot item at y position
   * @param index index of the dot point
   * @returns object for the dot svg component
   */
  const getDotProps = (value: number, index: number) => {
    if (index === 0 || index === data.datasets[0].data.length - 1) {
      return {
        r: '6',
        strokeWidth: '4',
        stroke: theme.colors.primary,
        fill: theme.colors.white,
      };
    }
    return null;
  };

  return (
    <VStack>
      <HStack>
        <SvgIcon name="Clock" width={wp(24)} height={hp(24)} />
        <Typography variant="title" marginLeft={'md'}>
          Total Tracked Time
        </Typography>
      </HStack>
      <LineChart
        data={data}
        width={wp(335)}
        height={hp(188)}
        chartConfig={chartConfig}
        withVerticalLines={false}
        formatXLabel={e => e.slice(0, 3)}
        formatYLabel={e => `${e}h`}
        // @ts-ignore
        getDotProps={getDotProps}
        bezier
        transparent
        style={Style.graph}
      />
    </VStack>
  );
};

TimeTrackGraph.defaultProps = {
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [110, 250, 312, 390],
        color: () => theme.colors.black,
        strokeWidth: 2,
      },
    ],
  },
};

export default TimeTrackGraph;
