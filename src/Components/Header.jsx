import {
  Box,
  Spacer,
  Text,
  Flex,
  Heading,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  Img,
} from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import { app } from '../Config/Firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import arrow from '../assets/arrow.svg';
const auth = getAuth(app);
const Header = () => {
  const [user, setUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef();
  const navigate = new useNavigate();
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
            <VStack>
              <Text as="b">{user.displayName}</Text>
              <Button onClick={onOpen} ref={buttonRef} h={'15px'} w={'15px'}>
                <Img
                  style={{ filter: 'brightness(0) invert(1)' }}
                  h={'15px'}
                  w={'15px'}
                  src={arrow}
                  transform="rotate(90deg)"
                />
              </Button>
              <Drawer
                isOpen={isOpen}
                onClose={onClose}
                finalFocusRef={buttonRef}
                initialFocusRef={buttonRef}
              >
                <DrawerOverlay />
                <DrawerContent style={{ width: '30vw', height: '30vh' }}>
                  <DrawerCloseButton />
                  <DrawerBody>
                    <VStack>
                      <Button onClick={onClose} variant={'ghost'}>
                        <Link to={'/Portfolio'}>Your PortFolio</Link>
                      </Button>
                      <Button variant={'ghost'} onClick={handleSignOut}>
                        <Link to={'/Portfolio'}>SignOut</Link>
                      </Button>
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </VStack>
          ) : (
            <NavLink to="/SignUP">SignUp</NavLink>
          )}
        </Text>
      </Flex>
    </Flex>
  );
};
export default Header;
