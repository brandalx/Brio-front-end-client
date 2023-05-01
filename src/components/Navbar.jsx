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
  MenuButton
} from '@chakra-ui/react';
import { IconShoppingBag } from '@tabler/icons-react';

import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Logo from '../assets/svg/logo';

export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();

  return (
    <>
      <Container maxW='1110px'>
        <chakra.header w='full' px={{ base: 2, sm: 4 }} py={4}>
          <Flex alignItems='center' justifyContent='space-between' mx='auto'>
            <Flex>
              <chakra.a href='/' title='Homepage' display='flex' alignItems='center'>
                <Logo />
                <VisuallyHidden>Brio</VisuallyHidden>
              </chakra.a>
              <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                Brio
              </Text>

              <Flex alignItems='center' justifyContent='center' px={4} display={{ base: 'none', md: 'inline-flex' }}>
                <InputGroup>
                  <InputRightElement pointerEvents='none'>
                    <AiOutlineSearch />
                  </InputRightElement>
                  <Input type='tel' placeholder='Search...' />
                </InputGroup>
              </Flex>
            </Flex>
            <HStack display='flex' alignItems='center' spacing={1}>
              <HStack spacing={1} mr={1} display={{ base: 'none', md: 'inline-flex' }}>
                <Button variant='ghost'>Restaurants</Button>
                <Button variant='ghost'>Deals</Button>
                <Box color='neutral.grayDark'>|</Box>
                <Button variant='ghost'>My orders</Button>
                <Button borderRadius='100px'>
                  <Flex gap={2}>
                    <Badge ml='1' colorScheme='blue' borderRadius={100} px={2} py={1}>
                      1
                    </Badge>{' '}
                    <IconShoppingBag />
                  </Flex>
                </Button>
                <Button
                  mx={5}
                  _hover={{ color: 'black', background: 'primary.30' }}
                  color='white'
                  background='primary.default'
                >
                  Get Started
                </Button>

                <Menu>
                  <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                    <Avatar size='sm' name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />{' '}
                  </MenuButton>

                  <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem>Link 3</MenuItem>
                  </MenuList>
                </Menu>
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
                  <Box>
                    <InputGroup>
                      <InputRightElement pointerEvents='none'>
                        <AiOutlineSearch />
                      </InputRightElement>
                      <Input type='tel' placeholder='Search...' />
                    </InputGroup>
                  </Box>
                  <Button variant='ghost'>Restaurants</Button>
                  <Button variant='ghost'>Deals</Button>
                  <Button variant='ghost'>My orders</Button>
                  <Button borderRadius='100px'>
                    <Flex gap={2}>
                      <Badge ml='1' colorScheme='blue' borderRadius={100} px={2} py={1}>
                        1
                      </Badge>{' '}
                      <IconShoppingBag />
                    </Flex>
                  </Button>
                  <Button
                    mx={5}
                    _hover={{ color: 'black', background: 'primary.30' }}
                    color='white'
                    background='primary.default'
                  >
                    Get Started
                  </Button>
                  <Avatar size='md' name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />{' '}
                  <Flex w='100%' justifyContent='space-between' px='16px'>
                    <Flex justifyContent='flex-end'>
                      {/* <Flex alignItems='center'>
                        <Logo />
                      </Flex>
                      <Flex alignItems='center'>
                        <Box as='span' fontSize='xl' fontWeight='extrabold' color={`${dc}.primary.default`} ml='2'>
                          Brio
                        </Box>
                      </Flex> */}
                    </Flex>
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
