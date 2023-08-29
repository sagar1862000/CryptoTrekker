import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Img,
  Text,
  VStack,
} from '@chakra-ui/react';
import Loader from './Loader';
const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [isError,SetisError]=useState("");
  useEffect(() => {
    const fecthExchanges = async () => {
      try{
      const { data } = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      console.log(data);
      SetLoading(false);
      }
      catch(error){

SetisError(error.message);
SetLoading(false);
      }
    };
    fecthExchanges();
  }, []);
  if(isError!=="") return isError;
  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <Heading m={4} p={4} >Populer Exchanges</Heading>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {exchanges.map(i => (
              <Exchangecard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
export default Exchange;
const Exchangecard = ({ name, img, rank, url }) => {
  return (
    
      <a href={url}>
        <VStack
          h={'150px'}
          w={'180px'}
          m={2}
          p={2}
          shadow={'lg'}
          transition={'0.3s'}
          css={{
            "&:hover":{
              transform:"scale(1.1)",
            },
          }}
        >
          <Img h={'70px'} src={img} />
          <Heading size={'20px'}>{rank}</Heading>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
      </a>
    
  );
};
