import {theme} from '@core/theme';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {
  color,
  ColorProps,
  compose,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  textStyle,
  TextStyleProps,
  typography,
  TypographyProps as TextProps,
  variant,
} from 'styled-system';

interface TypographyProps
  extends TextStyleProps<typeof theme>,
    LayoutProps<typeof theme>,
    SpaceProps<typeof theme>,
    TextProps<typeof theme>,
    ColorProps<typeof theme> {
  variant?: VariantTypes;
  fontFamily?: keyof typeof theme.fonts;
}

type VariantTypes = 'header' | 'title' | 'label' | 'body' | 'caption';

const variantStyle = (props: TypographyProps) => {
  return variant<TypographyProps, VariantTypes, 'variant'>({
    prop: 'variant',
    variants: {
      header: {
        fontFamily: props?.fontFamily ?? 'primaryBold',
        fontSize: props?.fontSize ?? 'lg3',
        color: props?.color ?? 'black2',
      },
      title: {
        fontFamily: props?.fontFamily ?? 'primarySemiBold',
        fontSize: props?.fontSize ?? 'lg',
        color: props?.color ?? 'black2',
      },
      label: {
        fontFamily: props?.fontFamily ?? 'primarySemiBold',
        fontSize: props?.fontSize ?? 'lg3',
        color: props?.color ?? 'black2',
        lineHeight: props?.lineHeight ?? 'lg6',
      },
      body: {},
      caption: {
        fontFamily: props?.fontFamily ?? 'secondaryRegular',
        fontSize: props?.fontSize ?? 'lg3',
        color: props?.color ?? 'black2',
        lineHeight: props?.lineHeight ?? 'lg6',
      },
    },
  });
};

const Typography = styled(Text)<TypographyProps>`
  ${compose(layout, textStyle, space, typography, color)}
  ${({...props}) => variantStyle(props)}
`;

Typography.defaultProps = {
  overflow: 'hidden',
};
export default Typography;
