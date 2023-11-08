import {
  Flex,
  Heading,
  Img,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import fb from '../assets/fb.png';
import insta from '../assets/insta.jpeg';
import whatsapp from '../assets/whatsapp.png';
const Footer = () => {
  return (
    <Flex
      borderTop={'2px'}
      borderColor={'yellow.300'}
      w={'100%'}
      h={'40vh'}
      justifyContent={'space-between'}
      flexDirection={'row'}
    >
      <VStack textAlign={'center'}>
        <Heading
          bgGradient="linear(to-b, yellow.100, yellow.800)"
          bgClip="text"
          fontWeight="extrabold"
          m={4}
        >
          Coin Trekker
        </Heading>
        <Img w={20} h={20} borderRadius={'full'} src={logo} />
        <Text mt={20}>@All Right Reserved</Text>
      </VStack>

      <Flex p={2} flexDirection={'column'} textAlign={'start'}>
      <Heading ml={3} fontSize={20}>Explore</Heading>
        <Text m={2} p={2}css={{
        '&:hover': {
          transform: 'scale(1.1)',
          borderColor: 'blue',
        },
      }}>
          <Link to={'/'}>Home</Link>
        </Text>

        <Text m={2} p={2}css={{
        '&:hover': {
          transform: 'scale(1.1)',
          borderColor: 'blue',
        },
      }}>
          <Link to={'Coins'}> Coins</Link>
        </Text>

        <Text m={2} p={2}css={{
        '&:hover': {
          transform: 'scale(1.1)',
          borderColor: 'blue',
        },
      }}>
          <Link to={'Exchange'}>Exchange</Link>
        </Text>
      </Flex>

      <Flex direction={'column'} gap={5}>
        <Heading  fontSize={20}>Follow Us</Heading>
        <Flex direction={'column'} gap={8} mr={10}>
          <Flex direction={'row'} gap={2}>
            <Img h={6} w={6} borderRadius={'full'} src={whatsapp}></Img>
            <a css={{
        '&:hover': {
          transform: 'scale(1.1)',
          borderColor: 'blue',
        },
      }}href="https://www.whatsapp.com/">whatsapp</a>
          </Flex>

          <Flex direction={'row'} gap={2}>
            <Img h={6} w={6} borderRadius={'full'} src={insta}></Img>
            <a css={{
        '&:hover': {
          transform: 'scale(1.1)',
          borderColor: 'blue',
        },
      }}href="https://www.instagram.com/">Instagram</a>
          </Flex>

          <Flex direction={'row'} gap={2}>
            <Img h={6} w={6} borderRadius={'full'} src={fb}></Img>
            <a css={{
        '&:hover': {
          transform: 'scale(1.1)',
          borderColor: 'blue',
        },
      }}href="https://www.facebook.com/">Facebook</a>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
