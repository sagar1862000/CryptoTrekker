import { Box, Center, Flex, Heading, Img } from '@chakra-ui/react';
import React from 'react';
import bitcoin from '../assets/bitcoin.png';
const Home = () => {
  return (
    <Center h={'90vh'} w={'100%'}>
      <Flex direction={'column'} alignItems={'center'}>
        <Img
          h={450}
          w={450}
          borderRadius={'full'}
          src={bitcoin}
          filter={'grayscale(1)'}
        />
        <Heading color={'gray.300'}>Coin Trekker</Heading>
      </Flex>
    </Center>
  );
};

export default Home;
