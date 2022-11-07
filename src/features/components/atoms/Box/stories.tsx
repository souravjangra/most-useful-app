import {storiesOf} from '@storybook/react-native';
import React from 'react';
import Box from './Box';

storiesOf('Box', module)
  .add('Background Color', () => (
    <Box bgVariant="primary" width={'100%'} height={100} />
  ))
  .add('Border', () => {
    return (
      <Box>
        <Box
          bgVariant="secondary"
          size={100}
          borderRadius="lg"
          justifyContent="center"
          alignItems="center"
          alignSelf="center">
          <Box bg={'grayLight'} size={50} />
        </Box>
      </Box>
    );
  });
