import {Dimensions, PixelRatio} from 'react-native';
import {RFValue} from './responsive_fontsize';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 812;

export function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
export const wp = (size: number) => {
  return normalize(size, 'width');
};

//for height  pixel
export const hp = (size: number) => {
  return normalize(size, 'height');
};

//for font  pixel
export const fp = (size: number) => {
  return RFValue(size);
};

//for Margin and Padding vertical pixel
export const pv = (size: number) => {
  return hp(size);
};

//for Margin and Padding horizontal pixel
export const ph = (size: number) => {
  return wp(size);
};
