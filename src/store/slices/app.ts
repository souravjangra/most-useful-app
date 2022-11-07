import {IBlock} from '@application/interfaces/Block';
import {
  getLastNMonths,
  getThisWeekDates,
  MONTH_MAP,
} from '@application/utils/date';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import _ from 'lodash';
import moment from 'moment';

interface AppInitialState {
  blocks: IBlock[];
  timeTrackedByMonth: number[];
  timeTrackedToday: number;
  timeTrackedThisWeek: number;
}

const initialState: AppInitialState = {
  blocks: [],
  timeTrackedByMonth: [0, 0, 0, 0, 0, 0],
  timeTrackedToday: 0,
  timeTrackedThisWeek: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setBlocks: (state, action: PayloadAction<IBlock[]>) => {
      const groupByMonth = _.groupBy(action.payload, 'month');
      const last6Months = getLastNMonths();
      const sortedBlocksByMonth = _.map(last6Months)
        .sort((a, b) => MONTH_MAP[a.slice(0, 3)] - MONTH_MAP[b.slice(0, 3)])
        .map(key => {
          let blockTimeInHrs = 0;
          const val = key.slice(0, 3);
          if (groupByMonth[val]) {
            blockTimeInHrs = groupByMonth[val].reduce(
              (partialSum, a) => partialSum + a.blockTimeInHrs!,
              0,
            );
          }

          return blockTimeInHrs;
        });
      state.timeTrackedByMonth = sortedBlocksByMonth;

      const today = new Date(Date.now());
      const currentDate = today?.getDate();
      const currentMonth = moment(today).format('MMM');

      const thisWeek = getThisWeekDates();

      action.payload.map(it => {
        const startDate = it?.startDate;
        startDate?.setHours(0, 0, 0, 0);
        if (
          it?.month === currentMonth &&
          it?.startDate?.getDate() === currentDate
        ) {
          state.timeTrackedToday += it.blockTimeInHrs ?? 0;
        }
        if (startDate && thisWeek.includes(startDate)) {
          state.timeTrackedThisWeek += it.blockTimeInHrs ?? 0;
        }

        return it;
      });
    },
    reset: state => {
      state.blocks = initialState.blocks;
      state.timeTrackedByMonth = initialState.timeTrackedByMonth;
      state.timeTrackedThisWeek = initialState.timeTrackedThisWeek;
      state.timeTrackedToday = initialState.timeTrackedToday;
    },
  },
});

const appReducer = appSlice.reducer;
export const {setBlocks} = appSlice.actions;
export default appReducer;
