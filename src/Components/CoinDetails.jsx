import React from 'react';
import {
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import { server } from '../index';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import Chart from './Chart';
import { db } from '../Config/Firebase';
import { addDoc, collection } from 'firebase/firestore';
import {auth} from '../Config/Firebase'

const CoinDetails = () => {
  const [coin, SetCoin] = useState({});
  const [loading, SetLoading] = useState(true);
  const [isError, SetisError] = useState('');
  const [Currency, SetCurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartarray, setChartArray] = useState([]);
  const [portId, setPortId] = useState({
    PortCoinId: '',
    PortCoinSymbol: '',
    PortCurrPrice: '',
    Port24H: '',
    PortCoinImg : '',
    PortCoinPriceChange : ''
  });
  const params = useParams();

  const CurrencySymbol =
    Currency === 'inr' ? '₹' : Currency === 'eur' ? '€' : '$';

  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '1y', 'max'];

  const switchChartStats = key => {
    switch (key) {
      case '24h':
        setDays('24h');
        SetLoading(true);
        break;
      case '7d':
        setDays('7d');
        SetLoading(true);
        break;
      case '14d':
        setDays('14d');
        SetLoading(true);
        break;
      case '30d':
        setDays('30d');
        SetLoading(true);
        break;
      case '60d':
        setDays('60d');
        SetLoading(true);
        break;
      case '200d':
        setDays('200d');
        SetLoading(true);
        break;
      case '1y':
        setDays('365d');
        SetLoading(true);
        break;
      case 'max':
        setDays('max');
        SetLoading(true);
        break;

      default:
        setDays('24h');
        SetLoading(true);
        break;
    }
  };
  const userUID = auth.currentUser.uid;
  useEffect(() => {
    if (portId.PortCoinId === '') {
      return;
    } else {
      //alert(portId);
      const coinIdRef = collection(db, `users/${userUID}/Portfolio`);
      addDoc(coinIdRef, {
        CoinId: portId.PortCoinId,
        Symbol: portId.PortCoinSymbol,
        Price: portId.PortCurrPrice,
        Change: portId.Port24H,
        Image : portId.PortCoinImg,
        HelperChange : portId.PortCoinPriceChange
      })
        .then(Response => {
          alert(`data added  SuccesFully`);
        })
        .catch(console.error);
    }
  }, [portId]);

  const HandleAddToPortfolio = () => {
    const updatedState = { ...portId };
    updatedState.PortCoinId = coin.id;
    updatedState.PortCoinSymbol = coin.symbol;
    updatedState.Port24H = coin.market_data.price_change_percentage_24h;
    updatedState.PortCurrPrice = coin.market_data.current_price.inr;
    updatedState.PortCoinImg=coin.image.large;
    updatedState.PortCoinPriceChange = coin.market_data.price_change_percentage_24h;
    setPortId(updatedState);
    console.log(portId);
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${Currency}&days=${days}`
        );
        setChartArray(chartData.prices);
        SetCoin(data);
        SetLoading(false);
        console.log(data);
      } catch (error) {
        SetisError(error.message);
        SetLoading(false);
      }
    };
    fetchCoin();
  }, [Currency, params.id, days]);

  if (isError !== '') return isError;

  return (
    <Container h={'300vh'} maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup
            m={2}
            p={2}
            defaultValue="inr"
            value={Currency}
            onChange={SetCurrency}
          >
            <Flex>
              <Radio p={2} value="inr">
                INR
              </Radio>
              <Radio p={2} value="eur">
                EUR
              </Radio>
              <Radio p={2} value="usd">
                USD
              </Radio>
            </Flex>
            <Button
              ml={'1vh'}
              color={'green.300'}
              onClick={HandleAddToPortfolio}
              height={'30px'}
              w={'125px'}
              mb={'10px'}
              mt={'10px'}
            >
              Add to Portfolio
            </Button>
          </RadioGroup>
          <Box w={'full'} borderWidth={1}>
            <Chart arr={chartarray} currency={CurrencySymbol} days={days} />
          </Box>

          <HStack p="4" overflowX={'auto'}>
            {btns.map(i => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>

          <VStack
            spacing={'4'}
            p={'16'}
            alignItems={'flex-start'}
            alignSelf={'center'}
            opacity={0.7}
          >
            <Text fontSize={'small'}>
              Last Updated On{' '}
              {Date(coin.market_data.last_updated).split('G')[0]}
            </Text>
            <Image
              h={'16'}
              w={'16'}
              objectFit={'contain'}
              src={coin.image.large}
            ></Image>
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatLabel>
                {CurrencySymbol}
                {coin.market_data.current_price[Currency]}
              </StatLabel>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={'2xl'}
              bg={'blackAlpha.900'}
              color={'whiteAlpha.900'}
            >
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${CurrencySymbol}${coin.market_data.high_24h[Currency]}`}
              low={`${CurrencySymbol}${coin.market_data.low_24h[Currency]}`}
            />
            <Box w={'full'} p={'4'}>
              <Item title={'Max Supply'} value={coin.market_data.max_supply} />
              <Item
                title={'Circulating Supply'}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={'Market Cap'}
                value={`${CurrencySymbol}${coin.market_data.market_cap[Currency]}`}
              />
              <Item
                title={'All Time Low'}
                value={`${CurrencySymbol}${coin.market_data.atl[Currency]}`}
              />
              <Item
                title={'All Time High'}
                value={`${CurrencySymbol}${coin.market_data.ath[Currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={'full'}>
      <Progress value={60} colorScheme={'teal'} w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={low} colorScheme={'red'} />
        <Text fontSize={'sm'}>24h range</Text>
        <Badge children={high} colorScheme={'green'} />
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
      <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};
export default CoinDetails;
