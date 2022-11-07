import {theme} from '@core/theme';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: theme.space.lg3,
    paddingTop: theme.space.md,
  },
});
