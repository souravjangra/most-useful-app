import {Button, Typography} from '@features/components/atoms';
import HStack from '@features/components/atoms/HStack';
import {SvgIcon} from '@features/components/atoms/Icon';
import VStack from '@features/components/atoms/VStack';
import React from 'react';

interface CreateGraphProps {
  onTap: () => void;
}

const CreateGraph = (props: CreateGraphProps) => {
  const {onTap} = props;
  return (
    <HStack backgroundColor="gray" marginTop="lg" p={'lg'} borderRadius="lg">
      <SvgIcon name="Heart" width={72} height={85.09} />
      <VStack flex={1} marginLeft="md2">
        <Typography variant="header" fontSize={'lg'} lineHeight="lg6">
          Want more data?
        </Typography>
        <Typography
          variant="caption"
          fontSize={'md32'}
          mt={'md'}
          color={'lightGray'}>
          Press this button to add 1,000 blocks!
        </Typography>
        <HStack alignSelf={'flex-end'} marginTop="lg">
          <Button
            variant="rounded"
            backgroundColor={'lightGreen'}
            onPress={onTap}>
            <Typography variant="header" fontSize={'md4'} lineHeight="lg6">
              Do it!
            </Typography>
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default CreateGraph;
