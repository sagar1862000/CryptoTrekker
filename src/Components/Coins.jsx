import React, { useEffect, useState } from 'react';
import { server } from '../index';
import axios from 'axios';
import { Container, HStack, Heading, Img, VStack,Text, Flex, Input, RadioGroup, Radio, Button } from '@chakra-ui/react';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const Coins = () => {
  const [coins, SetCoins] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [isError, SetisError] = useState('');
  const [Currency,SetCurrency]=useState("inr");
  const [page,SetPage]=useState(1);

  const CurrencySymbol = Currency==="inr" ? "₹" : Currency==="eur" ? "€" :"$";
 
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${Currency}&page=${page}`
        );
        console.log(data);
        SetCoins(data);
        SetLoading(false);
      } catch (error) {
        SetisError(error.message);
        SetLoading(false);
      }
    };
    fetchCoins();
  }, [Currency,page]);
  if (isError !== '') return isError;
  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Heading m={2} p={4}>
            Populer Coins
          </Heading>
          <RadioGroup 
          m={2} p={2} defaultValue='inr' value={Currency} onChange={SetCurrency}>
            <Flex>
              <Radio p={2} value='inr' >INR</Radio>
              <Radio p={2} value='eur'>EUR</Radio>
              <Radio p={2} value='usd' >USD</Radio>
            </Flex>
          </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {coins.map(i => (
              <CoinsCard
                id={i.id}
                key={i.id}
                name={i.name}
                rank={i.market_cap_rank}
                symbol={i.symbol}
                price={i.current_price}
                img={i.image}
                CurrencySymbol={CurrencySymbol}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
export default Coins;

const CoinsCard = ({ id,name, img, rank, symbol, price,CurrencySymbol }) => {
  return (
   <Link to={`/Coin/${id}`}> 
    <VStack
      h={'180px'}
      w={'200px'}
      p={4}
      m={3}
      shadow={'lg'}
      transition={'0.3s'}
      borderRadius={8}
      css={{
        '&:hover': {
          transform: 'scale(1.1)',
          borderColor: 'blue',
        },
      }}
    >
      <Img h={'50px'} src={img}/>
      <Text mt={'-4px'} >{rank}</Text>
      <Heading mt={'-8px'} size={'8px'}>{symbol}</Heading>
  
      <Flex>
      <Text ml={'-4'}>current price: </Text>
      <Text> {CurrencySymbol}{price}</Text>
      </Flex>
    </VStack>
    </Link>
  );
};
