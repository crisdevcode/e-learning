import { Flex, Circle, Box, Image, Badge, useColorModeValue, Icon, Button, Tooltip, Stack, Link, HStack, Text, useColorMode } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi';
import { Link as ReactLink } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const Rating = ({rating, numberOfReviews}) => {
    const { iconSize, setIconSize } = useState('14px');
    return (
        <Flex>
            <HStack spacing='2px'>
                <StarIcon size={iconSize} w='14px' color='orange.500' />
                <StarIcon size={iconSize} w='14px' color={rating >= 2 ? 'orange.500' : 'gray.200' }/>
                <StarIcon size={iconSize} w='14px' color={rating >= 3 ? 'orange.500' : 'gray.200' }/>
                <StarIcon size={iconSize} w='14px' color={rating >= 4 ? 'orange.500' : 'gray.200' }/>
                <StarIcon size={iconSize} w='14px' color={rating >= 5 ? 'orange.500' : 'gray.200' }/>
            </HStack>
            <Text fontSize='md' fontWeight='bold' ml='4px'>
                {`${numberOfReviews} ${numberOfReviews === 1 ? 'Opinión' : 'Opiniones'}`}
            </Text>
        </Flex>
    )
}

const ProductCard = ({ product }) => {
  return (
      <Stack
        p='2'
        spacing='3'
        bg={useColorModeValue('white', 'gray.800')}
        minW='240px'
        h='450px'
        borderWidth='1px'
        rounded='lg'
        shadow='lg'
        position='relative'>

        {product.isNew && <Circle size='10px'position='absolute' top={2} right={2} bg='green.300' />}
        {product.stock <= 0 && <Circle size='10px' position='absolute' top={2} right={2} bg='red.200'/>}
        <Image src={product.image} alt={product.name} rounded='lg'/>
        <Box flex='1' maxH='5' alignItems='baseline'>
            {product.stock <= 0 && (
                <Badge rounded='full' px='2' font-size='0.8em' colorScheme='red'>
                    No Disponible
                </Badge>
            )}
            {product.isNew && (
                <Badge rounded='full' px='2' font-size='0.8em' colorScheme='green'>
                    Disponible
                </Badge>
            )}
        </Box>
        <Flex mt='1' justifyContent='space-between' alignContent='center'>
            <Link as={ReactLink} to={`/product/${product._id}`} pt='2' cursor='pointer'>
                <Box fontSize='2x1' fontWeight='semibold' as='h4' lineHeight='tight'>
                    {product.name}
                </Box>
            </Link>
        </Flex>
        <Flex justifyContent='space-between' alignContent='center' py='2'>
            <Rating rating={product.rating} numberOfReviews={product.numberOfReviews}/>
        </Flex>
        <Flex justifyContent='space-between'>
            <Box fontSize='2x1' color={useColorModeValue('gray.800', 'white')}>
                <Box as='span' color={'gray.600'} fontSize='lg'>
                    $ {''}
                </Box>
                {Number(product.price).toFixed(2)}
            </Box>
            <Tooltip label='Añadir al carrito' bg='white' placement={'top'} color={'gray.800'}  fontSize={'1.2em'}>
                <Button variant='ghost' display={'flex'}  isDisabled={product.stock <= 0}>
                    <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </Button>
            </Tooltip>
        </Flex>
      </Stack>
  )
}

export default ProductCard