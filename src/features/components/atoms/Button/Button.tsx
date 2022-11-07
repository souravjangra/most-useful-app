import {theme} from '@core/theme';
import React from 'react';
import styled from 'styled-components/native';
import {
  borders,
  BordersProps,
  buttonStyle,
  ButtonStyleProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  variant,
} from 'styled-system';

type VariantTypes = 'outlined' | 'rounded' | 'box' | 'disabled';

interface ButtonProps
  extends LayoutProps,
    ColorProps<typeof theme>,
    SpaceProps<typeof theme>,
    BordersProps<typeof theme>,
    PositionProps,
    FlexboxProps<typeof theme>,
    ButtonStyleProps {
  children?: React.ReactNode;
  variant?: VariantTypes;
}

const variantStyle = (props: ButtonProps) => {
  return variant<ButtonProps, VariantTypes, 'variant'>({
    key: 'button',
    prop: 'variant',
    variants: {
      box: {
        width: '100%',
        height: '100%',
      },
      outlined: {
        borderColor: 'primary',
        borderWidth: 'sm',
        borderStyle: 'solid',
      },
      rounded: {
        borderRadius: 'md3',
        paddingX: 'lg',
        paddingY: 'md',
        backgroundColor: props?.backgroundColor ?? 'primary',
      },
      disabled: {
        backgroundColor: 'black',
      },
    },
  });
};

const Button = styled.TouchableOpacity<ButtonProps>`
  ${compose(color, layout, space, borders, position, flexbox, buttonStyle)}
  ${props => variantStyle(props)}
`;
Button.defaultProps = {};

export default Button;
