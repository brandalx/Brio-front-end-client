import React from 'react';

import {
  chakra,
  Text,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  Input,
  InputRightElement,
  Badge,
  Avatar,
  Container,
  MenuItem,
  MenuDivider,
  MenuList,
  Menu,
  MenuButton,
  InputLeftElement
} from '@chakra-ui/react';
import { IconShoppingBag } from '@tabler/icons-react';

import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Logo from '../../assets/svg/logo';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();

  return (
    <>
      <Container maxW='1110px'>
        <chakra.header w='full' px={{ base: 2, sm: 4 }} py={4}>
          <Flex alignItems='center' justifyContent='space-between' mx='auto'>
            <Flex alignItems='center'>
              <chakra.a href='/' title='Homepage' display='flex' alignItems='center'>
                <Link to='/'>
                  {' '}
                  <Logo />
                </Link>
                <VisuallyHidden>Brio</VisuallyHidden>
              </chakra.a>
              <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                <Link to='/'> Brio</Link>
              </Text>

              <InputGroup size='md' fontSize='md' mx='10px'>
                <InputRightElement pointerEvents='none'>
                  <AiOutlineSearch color='#828282' size={18} />
                </InputRightElement>
                <Input
                  background='neutral.grayLightest'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius={100}
                  fontSize='2xs'
                  type='tel'
                  placeholder='Search...'
                />
              </InputGroup>
            </Flex>
            <HStack display='flex' alignItems='center' spacing={1}>
              <HStack spacing={2} mr={1} display={{ base: 'none', md: 'inline-flex' }}>
                <Button variant='ghost'>
                  <Link to='/restaurant'>Restaurants</Link>
                </Button>
                <Button variant='ghost'>Deals</Button>
                <Box color='neutral.grayDark'>|</Box>
                <Button variant='ghost'>My orders</Button>
                {/* <Box as='div' ps={2} pe={4}>
                  <Button background='primary.light' borderRadius='100px' py='20px' position='relative'>
                    <Flex>
                      <Badge
                        fontSize='3xs'
                        color='white'
                        background='primary.default'
                        borderRadius={100}
                        px={2}
                        py={1}
                        position='absolute'
                        top='-5px'
                        right='-5px'
                        transform='translate(20%, -20%)'
                      >
                        1
                      </Badge>
                      <IconShoppingBag color='#4E60FF' />
                    </Flex>
                  </Button>
                </Box> */}
                {/* USER CART WILL BE HIDDEN FOR RELEASE 0.1 */}

                <Button variant='ghost' px={2} py={6} borderRadius={100}>
                  <Menu>
                    <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                      <Avatar size='sm' name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />{' '}
                    </MenuButton>

                    <MenuList>
                      <MenuItem fontWeight='medium'>My Account</MenuItem>
                      <MenuItem fontWeight='medium'>Settings</MenuItem>
                      <MenuDivider />
                      <MenuItem fontWeight='medium'> Log Out</MenuItem>
                    </MenuList>
                  </Menu>
                </Button>
              </HStack>

              <Box display={{ base: 'inline-flex', md: 'none' }}>
                <IconButton
                  display={{ base: 'flex', md: 'none' }}
                  aria-label='Open menu'
                  fontSize='20px'
                  color='gray.800'
                  _dark={{ color: 'inherit' }}
                  variant='ghost'
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />

                <VStack
                  transition='all 0.2s'
                  flexDir='column-reverse'
                  alignItems='start'
                  pos='absolute'
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? 'flex' : 'none'}
                  flexDirection='column'
                  p={2}
                  pb={4}
                  m={2}
                  mt={2}
                  bg={bg}
                  spacing={3}
                  borderRadius='15px'
                  border='light.neutral.light'
                  borderWidth={1}
                  shadow='lg'
                >
                  <Box my='8px'>
                    <InputGroup size='sm' fontSize='md' mx='10px'>
                      <InputRightElement pointerEvents='none'>
                        <AiOutlineSearch color='#828282' size={14} />
                      </InputRightElement>
                      <Input
                        background='neutral.grayLightest'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius={100}
                        fontSize='2xs'
                        type='tel'
                        placeholder='Search...'
                      />
                    </InputGroup>
                  </Box>
                  <Button fontWeight='extrabold' fontSize='xs' variant='ghost'>
                    <Link to='/restaurant'>Restaurants </Link>
                  </Button>
                  <Button fontWeight='extrabold' fontSize='xs' variant='ghost'>
                    Deals
                  </Button>
                  <Button fontWeight='extrabold' fontSize='xs' variant='ghost'>
                    My orders
                  </Button>
                  {/* <Box as='div' ps={2} pe={4}>
                    <Button background='primary.light' borderRadius='100px' py='20px' position='relative'>
                      <Flex>
                        <Badge
                          fontSize='3xs'
                          color='white'
                          background='primary.default'
                          borderRadius={100}
                          px={2}
                          py={1}
                          position='absolute'
                          top='-5px'
                          right='-5px'
                          transform='translate(20%, -20%)'
                        >
                          1
                        </Badge>
                        <IconShoppingBag color='#4E60FF' />
                      </Flex>
                    </Button>
                  </Box> */}
                  {/* USER CART WILL BE HIDDEN FOR RELEASE 0.1 */}
                  <Button variant='ghost' px={2} py={6} borderRadius={100}>
                    <Menu>
                      <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                        <Avatar size='md' name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />{' '}
                      </MenuButton>

                      <MenuList>
                        <MenuItem fontWeight='medium'>My Account</MenuItem>
                        <MenuItem fontWeight='medium'>Settings</MenuItem>
                        <MenuDivider />
                        <MenuItem fontWeight='medium'> Log Out</MenuItem>
                      </MenuList>
                    </Menu>
                  </Button>
                  <Flex w='100%' justifyContent='space-between' px='16px'>
                    <Flex justifyContent='flex-end'></Flex>
                    <CloseButton aria-label='Close menu' onClick={mobileNav.onClose} />
                  </Flex>
                </VStack>
              </Box>
            </HStack>
          </Flex>
        </chakra.header>
      </Container>
    </>
  );
}
