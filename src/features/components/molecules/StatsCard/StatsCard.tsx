/* eslint-disable @typescript-eslint/no-shadow */
import {theme} from '@core/theme';
import {Typography} from '@features/components/atoms';
import {BoxProps} from '@features/components/atoms/Box/Box';
import React from 'react';
import styled, {DefaultTheme} from 'styled-components/native';
import {
  borders,
  BordersProps,
  color,
  ColorProps,
  compose,
  flex,
  flexbox,
  FlexboxProps,
  FlexProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  variant,
} from 'styled-system';

type VariantTypes = 'today' | 'this_week';

const variantStyle = (_theme?: DefaultTheme) => {
  return variant<BoxProps, VariantTypes, 'variant'>({
    key: 'box',
    prop: 'variant',
    variants: {
      today: {
        backgroundColor: 'lightGreen2',
      },
      this_week: {
        backgroundColor: 'lightBlue',
      },
    },
  });
};
interface StatsCardProps
  extends LayoutProps,
    ColorProps<typeof theme>,
    SpaceProps<typeof theme>,
    BordersProps<typeof theme>,
    FlexProps,
    PositionProps,
    FlexboxProps {
  variant?: VariantTypes;
  value?: string;
}

const StatsCardStyled = styled.View<StatsCardProps>`
  ${compose(color, layout, space, borders, flex, position, flexbox)}
  ${({}) => variantStyle(theme)}
`;

const StatsCard = (props: StatsCardProps) => {
  const {variant, value} = props;

  const getTitleForVariant = (): string => {
    switch (variant) {
      case 'today':
        return 'Today';
      case 'this_week':
        return 'This week';
      default:
        return '';
    }
  };

  return (
    <StatsCardStyled
      variant={variant}
      flex={1}
      paddingX={'lg3'}
      paddingY={'lg'}
      borderRadius={'lg'}>
      <Typography variant="label">{value}</Typography>
      <Typography variant="caption" marginTop={'sm'}>
        {getTitleForVariant()}
      </Typography>
    </StatsCardStyled>
  );
};

export default StatsCard;
