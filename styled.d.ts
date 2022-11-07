import 'styled-components';
import 'styled-system';

declare module 'styled-components' {
  export interface DefaultTheme {
    space: {
      none: number;
      xs: number;
      sm: number;
      md: number;
      md2: number;
      lg: number;
      lg2: number;
      lg3: number;
      lg4: number;
      lg5: number;
      xl: number;
      xl2: number;
      xl3: number;
      xl4: number;
      xl5: number;
    };
    colors: {
      transparent: string;
      primary: string;
      secondary: string;
      gray: string;
      white: string;
      black: string;
      black2: string;
      success: string;
      backgroundColor: string;
      lightBlue: string;
      lightGray: string;
      lightGray2: string;
      lightGreen: string;
      lightGreen2: string;
    };
    typography: {
      // FONT_REGULAR: string;
      // FONT_BOLD: string;
    };
    borderWidths: {
      none: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    bordersColors: {
      primary: string;
      secondary: string;
      white: string;
      black: string;
      success: string;
    };
    radii: {
      none: number;
      xs: number;
      sm: number;
      md: number;
      md2: number;
      md3: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    fontSizes: {
      none: number;
      xs: number;
      sm: number;
      md: number;
      md2: number;
      md3: number;
      md32: number;
      md4: number;
      lg: number;
      lg2: number;
      lg3: number;
      xl: number;
    };
    fonts: {
      primaryRegular: string;
      primaryBold: string;
      primarySemiBold: string;
      secondaryRegular: string;
      // body: string;
      // heading: string;
    };
    letterSpacings: {
      normal: string;
    };
    fontStyle: {
      normal: string;
      italic: string;
    };
    lineHeights: {
      none: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      lg2: number;
      lg3: number;
      lg4: number;
      lg5: number;
      lg6: number;
      xl: number;
    };
    fontWeights: {
      hairline: number;
      thin: number;
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
      black: number;
      extraBlack: number;
    };
  }
}
