import { Box, Button, Flex, HStack, Heading, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { app } from '../Config/Firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import yo from '../assets/signin.jpeg'
const auth = getAuth(app);
const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Flex alignItems={'center'} borderBottom={'2px'} borderColor={'yellow.300'}>
      <Box>
        <Heading
          bgGradient="linear(to-b, yellow.100, yellow.800)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Coin Trekker
        </Heading>
      </Box>
      <Spacer />
      <Flex p={'4px'} m={'2px'} w={'50%'} justifyContent={'end'}>
        <Text m={2} p={2}>
          <Link to={'/'}>Home</Link>
        </Text>

        <Text m={2} p={2}>
          <Link to={'Coins'}> Coins</Link>
        </Text>
        <Text m={2} p={2}>
          <Link to={'Exchange'}>Exchange</Link>
        </Text>
          <Text m={2} p={2}>
            {user ? (
              <HStack >
              <Button mt={-6} variant={'ghost'}  onClick={handleSignOut}>Sign Out</Button>
              <VStack>
              <Image h={'20px'} w={'20px'} borderRadius={'full'} src={yo}/>
              <Text as='b' >{user.displayName}</Text>
              </VStack>
              </HStack>
            ) : (
              <a href="/SignUP">SignUp</a>
            )}
          </Text>  
      </Flex>
    </Flex>
  );
};
export default Header;
