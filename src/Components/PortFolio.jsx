import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Img,
  Text,
  VStack,
  StatArrow,
  Stat,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../Config/Firebase';
import { server } from '../index';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Portfolio = () => {
  const [portCoins, setPortCoins] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);

        getPortCoins();
      } else {
        setUser(null);
        //setPortCoins([]);
      }
    });
    return () => unsubscribe();
  });

  useEffect(() => {
    console.log(portCoins);
  }, [portCoins]);

  const getPortCoins = () => {
    if (user) {
      const CoinsCollectionRef = collection(db, `users/${user.uid}/Portfolio`);
      getDocs(CoinsCollectionRef)
        .then(Response => {
          const Coins = Response.docs.map(doc => ({
            data: doc.data(),
            id: doc.id,
          }));
          setPortCoins(Coins);
        })
        .catch(error => console.log(error.message));
    }
  };

  return (
    <Box h="100vh" w="full" overflowY={'auto'} overflow={'hidden'}>
      <Center>
        <VStack>
          <Heading
            m="20px"
            bgGradient="linear(to-b, yellow.100, yellow.800)"
            bgClip="text"
            fontWeight="extrabold"
          >
            WatchList
          </Heading>
          <Table size="lg" overflow={'auto'}>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Symbol</Th>
                <Th>Price</Th>
                <Th>24H Change</Th>
              </Tr>
            </Thead>
            <Tbody>
              {portCoins.map(i => (
                <Tr key={i.id}>
                  <Td>
                    <Link to={`/Coin/${i.data.CoinId}`} variant="ghost">
                      <Img
                        src={i.data.Image}
                        h="35px"
                        w="35px"
                        borderRadius="full"
                      />
                    </Link>
                  </Td>

                  <Td fontWeight={'bold'}>
                    <Link to={`/Coin/${i.data.CoinId}`} variant="ghost">
                      {i.data.CoinId}
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/Coin/${i.data.CoinId}`} variant="ghost">
                      {i.data.Symbol}
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/Coin/${i.data.CoinId}`} variant="ghost">
                      ₹{i.data.Price}
                    </Link>
                  </Td>
                  <Td>
                    <Stat>
                      <StatArrow
                        type={i.data.HelperChange > 0 ? 'increase' : 'decrease'}
                      />
                    </Stat>
                    <Link to={`/Coin/${i.data.CoinId}`} variant="ghost">
                      {i.data.Change.toFixed(2)}%
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      </Center>
    </Box>
  );
};

export default Portfolio;
