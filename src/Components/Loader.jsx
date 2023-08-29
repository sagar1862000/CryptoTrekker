import { Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <VStack h={'90vh'} justifyContent={'center'}>
      <Spinner color='alphablack.900'/>
    </VStack>
  )
}

export default Loader
