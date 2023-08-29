import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Img,
  Input,
  VStack,
} from '@chakra-ui/react';
import { auth,googleprovider } from '../Config/Firebase';
import { createUserWithEmailAndPassword ,signInWithPopup, updateProfile} from 'firebase/auth';
import { Form, NavLink,useNavigate } from 'react-router-dom';
import logo from '../assets/signin.jpeg';
const SignUp = () => {
  const navigate=new useNavigate();
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    Password: '',
  });
  let name, value;
  const setuserdata = event => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const HandleSubmit = async () => {
    try {
     const { Name , Email, Password } = user;
      let msg = await createUserWithEmailAndPassword(auth,Email,Password);
      if (msg) {
        const user=msg.user;
        await updateProfile(user,{
          displayName:  Name,
        })
        alert('signIn SuccesFull');
      }
      navigate('/')
    } catch (err) {
      document.write(err);
    }
  };

  const googleSignUp = async ()=>{
    try{
     let msg = await signInWithPopup(auth,googleprovider);
     if(msg){
      alert("SignUp SuccesFull");
     }
    }
    catch(err){
      document.write(err);
    }
  }
  return (
    <Center h={'140vh'} w={'full'}>
      <Container h={'70vh'} w={'80vh'} mt={'-350px'}>
        <Box p={2}>
          <Heading textAlign={'center'}>Coin Trekker</Heading>
          <Img ml={'190px'} h={20} w={20} borderRadius={'full'} srcSet={logo} />
        </Box>

        <Box mt={'-10px'}>
          <VStack p={5} gap={8}>
          <Input
              fontWeight={'bold'}
              color={'black.700'}
              placeholder="Name"
              name="Name"
              value={user.Namr}
              onChange={setuserdata}
              required
            />
            <Input
              fontWeight={'bold'}
              color={'black.700'}
              placeholder="Email"
              name="Email"
              value={user.Email}
              onChange={setuserdata}
              required
            />
            <Input
              fontWeight={'bold'}
              color={'black.700'}
              placeholder="Password"
              name="Password"
              type="password"
              value={user.Password}
              onChange={setuserdata}
              required
            />
            <Button
              type="submit"
              mt={3}
              bg={'purple.300'}
              onClick={HandleSubmit}
            >
              SignUp
            </Button>
            <Button onClick={googleSignUp}> SignUp With Google</Button>
            <NavLink to={'/SignIn'} ml={250} mt={-5}>
              Already SignUp? SignIn.
            </NavLink>
          </VStack>
        </Box>
      </Container>
    </Center>
  );
};

export default SignUp;
