import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // colors
  black: '#1E1F20',
  white: '#FFFFFF',
  offWhite: '#FAF9F6',
  primaryColor: '#F5E5DE',
  secondaryColor: '#ffddb0',
  lightGray: '#ABAFB8',
  gray: '#BEC1D2',
  background: '#1F0808',
  clear: 'rgba(0,0,0,0)',
  facebook: '#3b5998',
  transparent: 'rgba(0,0,0,0)',
  silver: '#F7F7F7',
  steel: '#CCCCCC',
  error: 'rgba(200, 0, 0, 0.8)',
  ricePaper: 'rgba(255,255,255, 0.75)',
  frost: '#D8D8D8',
  cloud: 'rgba(200,200,200, 0.35)',
  windowTint: 'rgba(0, 0, 0, 0.4)',
  panther: '#161616',
  charcoal: '#595959',
  coal: '#2d2d2d',
  bloodOrange: '#fb5f26',
  snow: 'white',
  ember: 'rgba(164, 0, 48, 0.5)',
  fire: '#e73536',
  drawer: 'rgba(30, 30, 29, 0.95)',
  eggplant: '#251a34',
  border: '#483F53',
  banner: '#5F3E63',
  text: '#E0D7E5',
  headerColor: '#FF0026',
  vfdGray: '#444',
  vfdRed: '#ef473a',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  navTitle: 25,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  navTitle: {fontFamily: 'CarmenSans-Thin', fontSize: SIZES.navTitle},
  largeTitleBold: {fontFamily: 'CarmenSans-SemiBold', fontSize: SIZES.h2},
  h1: {fontFamily: 'CarmenSans-SemiBold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'CarmenSans-SemiBold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'CarmenSans-SemiBold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'CarmenSans-SemiBold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'CarmenSans-SemiBold', fontSize: SIZES.h5, lineHeight: 22},
  body1: {
    fontFamily: 'CarmenSans-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'CarmenSans-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'CarmenSans-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'CarmenSans-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'CarmenSans-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
