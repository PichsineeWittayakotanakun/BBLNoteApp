import {moderateScale} from 'react-native-size-matters';
export const Size = {
  size64: moderateScale(64),
  size50: moderateScale(50),
  size48: moderateScale(48),
  size44: moderateScale(44),
  size32: moderateScale(32),
  size24: moderateScale(24),
  size16: moderateScale(16),
  size10: moderateScale(10),
  size8: moderateScale(8),
  size6: moderateScale(6),
  size4: moderateScale(4),
  size3: moderateScale(3),
  size2: moderateScale(2),
  size1: moderateScale(1),
  size0: moderateScale(0),
  sizepoint9: moderateScale(0.9),
  sizepoint1: moderateScale(0.1),
  sizeShadowOpacityProfile: moderateScale(0.2),
  sizeShadowOpacity: moderateScale(0.25),
  sizeShadowRadius: moderateScale(3.84),
};

export type SizeType = keyof typeof Size;
