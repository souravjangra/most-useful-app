import {fp} from '@application/utils/normalize';
import {theme} from '@core/theme';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  labelText: {
    fontFamily: theme.fonts.secondaryRegular,
    fontSize: fp(13),
    lineHeight: fp(16),
    textAlign: 'center',
  },
  graph: {
    marginTop: theme.space.xl5,
  },
});
