import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../Config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const SignIn = () => {
  const [user, setUser] = useState({
    Email: '',
    Password: '',
  });
  const [visible, setVisible] = useState(false);
  const navigate = new useNavigate();
  const HandleChange = async event => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  const toggleVisibilty = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const UserSignIn = async () => {
    try {
      const { Email, Password } = user;
      let rem = await signInWithEmailAndPassword(auth, Email, Password);
      if (rem) {
        alert('SignIn SuccesFull');
      }
      navigate('/');
    } catch (err) {
      document.write(err);
    }
  };

  return (
    <Center h={'100vh'} w={'full'}>
      <Container h={'50vh'} w={'80vh'}>
        <Box p={2}>
          <Heading textAlign={'center'}>WELCOME BACK</Heading>
        </Box>
        <Box>
          <VStack p={5} gap={8}>
            <Input
              fontWeight={'bold'}
              color={'whiteAlpha.700'}
              placeholder="Email"
              name="Email"
              type="Email"
              value={user.Email}
              onChange={HandleChange}
            />

            <Input
              fontWeight={'bold'}
              color={'whiteAlpha.700'}
              placeholder="Password"
              name="Password"
              type={visible ? 'text' : 'Password'}
              value={user.Password}
              onChange={HandleChange}
            />
            <Button
              h={'20px'}
              w={'20px'}
              ml={'450px'}
              mt={'-60px'}
              onClick={toggleVisibilty}
            >
              {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </Button>

            
            <Button
              type={'submit'}
              mt={0}
              bg={'purple.300'}
              onClick={UserSignIn}
            >
              SignIn
            </Button>
            <Box ml={60} mt={-6}>
              <NavLink to={'/SignUp'}>New User? SignUp.</NavLink>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Center>
  );
};

export default SignIn;
