import {Typography} from '@features/components/atoms';
import React from 'react';

interface HeaderTitleProps {
  title: String;
}

const HeaderTitle = ({title}: HeaderTitleProps) => {
  return <Typography variant="header">{title}</Typography>;
};

HeaderTitle.defaultProps = {
  title: '',
};

export default HeaderTitle;
