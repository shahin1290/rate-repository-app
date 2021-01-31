import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#fff',
    primary: '#0366d6',
    barBackground: '#24292e',
    danger: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'system',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 10,
    margin: 5,
    textAlign: 'center',
    borderRadius: 3,
    color: '#fff',
  },
};

export default theme;
