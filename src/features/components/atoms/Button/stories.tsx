import {storiesOf} from '@storybook/react-native';
import React from 'react';
import Typography from '../Typography';
import Button from './Button';

storiesOf('Button', module)
  .add('Button Box', () => (
    <Button variant="box" justifyContent="center" alignItems="center">
      <Typography variant="bold">Button Box</Typography>
    </Button>
  ))
  .add('Button Outlined', () => {
    return (
      <Button variant="outlined" bg={'secondary'}>
        <Typography variant="regular" color={'primary'}>
          Button outlined
        </Typography>
      </Button>
    );
  })
  .add('Button Rounded', () => {
    return (
      <Button variant="rounded" bg={'primary'}>
        <Typography variant="regular" color={'secondary'}>
          Button rounded
        </Typography>
      </Button>
    );
  })
  .add('Button Disable', () => {
    return (
      <Button variant="disabled" mx="xl" disabled>
        <Typography variant="regular" fontSize={16} color={'secondary'}>
          Button disabled
        </Typography>
      </Button>
    );
  });
