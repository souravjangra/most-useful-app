import React from 'react';
import Box from '../Box';
import {BoxProps} from '../Box/Box';

const VStack = (props: BoxProps) => {
  return <Box flexDirection={'column'} {...props} />;
};

export default VStack;
