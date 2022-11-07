import React from 'react';
import Box from '../Box';
import {BoxProps} from '../Box/Box';

const HStack = (props: BoxProps) => {
  return <Box flexDirection={'row'} {...props} />;
};

export default HStack;
