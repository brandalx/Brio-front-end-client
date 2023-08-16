import React, { useContext, useEffect, useRef, useState } from 'react';

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
  Avatar,
  Container,
  MenuItem,
  MenuDivider,
  MenuList,
  Menu,
  MenuButton,
  Skeleton,
  useToast,
  FormControl,
  useColorMode
} from '@chakra-ui/react';
import { IconShoppingBag } from '@tabler/icons-react';
import Sun from '../../assets/svg/Sun';
import Moon from '../../assets/svg/Moon';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Logo from '../../assets/svg/Logo';
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { API_URL, TOKEN_KEY, handleApiGet, handleApiMethod } from '../../services/apiServices';
import { useCheckToken } from '../../services/token';
import { avatarContext, cartContext, geolocationContext, useColorModeContext } from '../../context/globalContext';
import GeolocationDefinder from './Navbar/GeolocationDefinder';
import jwtDecode from 'jwt-decode';
import onAudio from '../../assets//sounds/on.mp3';
import offAudio from '../../assets//sounds/off.mp3';
export default function Navbar() {
  const isTokenExpired = useCheckToken();
  const { cartLen, setCartLen } = useContext(cartContext);
  const { avatarUser, setAvatarUser } = useContext(avatarContext);
  const { city, setCity, isTrue, setIsTrue } = useContext(geolocationContext);
  // useEffect(() => {
  //   if (isTokenExpired) {
  //   }
  // }, [isTokenExpired]);
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const location = useLocation();
  const isInCart = location.pathname.startsWith('/user/cart');

  const isInRestaurants = location.pathname.startsWith('/restaurant');
  const isInBlog = location.pathname.startsWith('/blog');
  const isInMyOrders = location.pathname.startsWith('/user/orders');

  const isInDeals = location.pathname.startsWith('/deals');

  const token = localStorage.getItem(TOKEN_KEY);
  let checkerIfAdmin = false;

  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);

  const [srcav, setSrcav] = useState();
  const randomarr = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'];
  if (token) {
    try {
      checkerIfAdmin = jwtDecode(token).role === 'ADMIN';
    } catch (error) {
      console.error('Failed to decode token', error);
    }
  }
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(searchTerm);

    if (searchTerm.length > 0) {
      navigate('/search', { state: { searchinfo: searchTerm } });
    }
  };
  const clearUserCart = async () => {
    try {
      const url = API_URL + '/users/cart/clear';

      const data = await handleApiMethod(url, 'DELETE', null);
      if (data.msg === true) {
        toast({
          title: 'Cart was cleared.',
          description: "We've deleted items from your cart.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });

        setCartLen(0);
        if (isInCart) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Error when clearing your cart',
        description: 'Error when clearing your cart data.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  const genavatar = () => {
    const rand = getRandomNumber(0, 6);
    setSrcav(randomarr[rand]);
  };
  const handleApi = async () => {
    const url = API_URL + '/users/info/user';
    try {
      const data = await handleApiGet(url);
      setArr(data);

      setAvatarUser(API_URL + '/' + data.avatar);

      setCartLen(data.cart.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    handleApi();
    genavatar();
  }, []);

  const onLogOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem('location');
    window.location.href = '/login';
    toast({
      title: 'Loggin out.',
      description: 'Successfuly logged out!',
      status: 'success',
      duration: 9000,
      isClosable: true
    });
  };
  const { colorMode, setColorMode } = useColorModeContext();

  const audioRef = useRef(null);
  const playAudio = () => {
    if (audioRef.current) {
      const audioSource = localStorage.getItem('colormode') === 'light' ? offAudio : onAudio;
      audioRef.current.src = audioSource;
      audioRef.current.play();
    }
  };

  return (
    <Box bg={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.white' : 'neutral.white')}>
      <Container maxW='1110px'>
        <chakra.header w='full' px={{ base: 2, sm: 4 }} py={4}>
          <Flex alignItems='center' justifyContent='space-between' mx='auto'>
            <Flex alignItems='center'>
              <Link to='/'>
                <Box title='Homepage' display='flex' alignItems='center'>
                  <Logo />
                </Box>
                <VisuallyHidden>Brio</VisuallyHidden>
              </Link>

              <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                <Link to='/' title='Homepage'>
                  Brio
                </Link>
              </Text>

              <Box mx='10px' display={{ base: 'none', lg: 'block' }}>
                <InputGroup display={{ base: 'none', md: 'inline-flex' }} size='md' fontSize='md'>
                  <form onSubmit={handleSearch}>
                    <InputRightElement>
                      <Button type='submit'>
                        <AiOutlineSearch color='#828282' size={14} />
                      </Button>
                    </InputRightElement>
                    <Input
                      defaultValue={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      background={() =>
                        localStorage.getItem('colormode') === 'dark' ? 'neutral.white' : 'neutral.grayLightest'
                      }
                      _placeholder={{ color: 'neutral.gray' }}
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                      borderRadius={100}
                      fontSize='2xs'
                      type='text'
                      placeholder='Search...'
                    />
                  </form>
                </InputGroup>
              </Box>
            </Flex>
            <HStack display='flex' alignItems='center' spacing={1}>
              <HStack spacing={2} mr={1} display={{ base: 'none', md: 'inline-flex' }}>
                <Button
                  bg={localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.lightest'}
                  variant={'link'}
                  size='xs'
                  py='8px'
                  px='8px'
                  color='primary.default'
                  onClick={() => {
                    const newColorMode = colorMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem('colormode', newColorMode);
                    setColorMode(newColorMode);
                    playAudio();
                  }}
                >
                  {localStorage.getItem('colormode') === 'dark' ? (
                    <Box>
                      <Moon />
                    </Box>
                  ) : (
                    <Box>
                      <Sun />
                    </Box>
                  )}
                </Button>
                <Button
                  fontWeight='bold'
                  fontSize='2xs'
                  _hover={{
                    borderRadius: '16px',
                    background: localStorage.getItem('colormode') !== 'dark' ? 'primary.light' : '#363654',
                    textDecoration: 'none'
                  }}
                >
                  <Link fontSize='fontSizes.2xs' to='/restaurant'>
                    <Text
                      fontWeight={isInRestaurants ? 'bold' : 'regular'}
                      m={0}
                      p={0}
                      color={
                        isInRestaurants
                          ? 'primary.default'
                          : localStorage.getItem('colormode') === 'dark'
                          ? 'neutral.black'
                          : 'neutral.black'
                      }
                    >
                      Restaurants
                    </Text>
                  </Link>
                </Button>
                <Link to='/deals'>
                  <Button
                    color='neutral.black'
                    fontWeight='bold'
                    fontSize='2xs'
                    _hover={{
                      borderRadius: '16px',
                      background: localStorage.getItem('colormode') !== 'dark' ? 'primary.light' : '#363654',
                      textDecoration: 'none'
                    }}
                  >
                    {' '}
                    <Text
                      m={0}
                      p={0}
                      color={
                        isInDeals
                          ? 'primary.default'
                          : localStorage.getItem('colormode') === 'dark'
                          ? 'neutral.black'
                          : 'neutral.black'
                      }
                    >
                      Deals
                    </Text>
                  </Button>
                </Link>
                <Link to='/blog'>
                  <Button
                    color='neutral.black'
                    fontWeight='bold'
                    fontSize='2xs'
                    _hover={{
                      borderRadius: '16px',
                      background: localStorage.getItem('colormode') !== 'dark' ? 'primary.light' : '#363654',
                      textDecoration: 'none'
                    }}
                  >
                    {' '}
                    <Text
                      m={0}
                      p={0}
                      color={
                        isInBlog
                          ? 'primary.default'
                          : localStorage.getItem('colormode') === 'dark'
                          ? 'neutral.black'
                          : 'neutral.black'
                      }
                    >
                      Blogs
                    </Text>
                  </Button>
                </Link>
                {localStorage[TOKEN_KEY] && (
                  <>
                    <Box ml='13px' mr='12px' h='20px' w='1px' mx='4' bg='neutral.grayLightest' />

                    <Button
                      color='neutral.black'
                      fontWeight='bold'
                      fontSize='2xs'
                      _hover={{
                        borderRadius: '16px',
                        background: localStorage.getItem('colormode') !== 'dark' ? 'primary.light' : '#363654',
                        textDecoration: 'none'
                      }}
                    >
                      {' '}
                      <Text
                        m={0}
                        p={0}
                        color={
                          isInMyOrders
                            ? 'primary.default'
                            : localStorage.getItem('colormode') === 'dark'
                            ? 'neutral.black'
                            : 'neutral.black'
                        }
                      >
                        <Link fontSize='fontSizes.2xs' to='/user/orders'>
                          My orders
                        </Link>
                      </Text>
                    </Button>
                  </>
                )}

                <HStack spacing={6} display={{ base: 'none', md: 'inline-flex' }}>
                  {localStorage[TOKEN_KEY] && (
                    <>
                      <Box>
                        <GeolocationDefinder setLoading={setLoading} loading={loading} isInCart={isInCart} />
                      </Box>
                      <Skeleton borderRadius='16px' isLoaded={!loading}>
                        <Box
                          borderColor={isInCart ? 'primary.default' : 'neutral.white'}
                          borderWidth='1px'
                          ml='4px'
                          bg={localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.lightest'}
                          _hover={{ bg: localStorage.getItem('colormode') === 'dark' ? '#414165' : 'primary.light' }}
                          color='black'
                          px={'8px'}
                          py={'7.5px'}
                          borderRadius='16px'
                          position='relative'
                        >
                          <Box
                            px={1}
                            position='absolute'
                            top='-2px'
                            right='-4px'
                            bg='primary.default'
                            h='20px'
                            minW='20px'
                            borderRadius='8px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            fontSize='xs'
                            fontWeight='semibold'
                            color='whiteAlpha.900'
                            textAlign='center'
                            minWidth='20px'
                          >
                            {!loading && cartLen}
                          </Box>
                          <Menu>
                            <MenuButton
                              as={Button}
                              p='6px'
                              rounded={'full'}
                              variant={'link'}
                              cursor={'pointer'}
                              minW={0}
                            >
                              <IconShoppingBag color='#4E60FF' />
                            </MenuButton>

                            <MenuList>
                              <Link to='/user/cart'>
                                {/* //because it should refresh to update user logged in */}
                                <MenuItem
                                  color={
                                    localStorage.getItem('colormode') === 'dark' ? 'neutral.white' : 'neutral.black'
                                  }
                                  fontWeight='medium'
                                >
                                  My cart
                                </MenuItem>
                              </Link>

                              {!loading && cartLen > 0 && (
                                <MenuItem
                                  onClick={clearUserCart}
                                  m={0}
                                  h='100%'
                                  background='neutral.white'
                                  variant='solid'
                                  color='error.default'
                                  _hover={{
                                    background: 'error.default',
                                    color: 'neutral.white'
                                  }}
                                  fontWeight='medium'
                                >
                                  Clear cart
                                </MenuItem>
                              )}
                            </MenuList>
                          </Menu>
                        </Box>
                      </Skeleton>
                    </>
                  )}

                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Menu>
                      {!localStorage[TOKEN_KEY] && (
                        <Box
                          borderWidth='2px'
                          borderColor='neutral.white'
                          transition='all 0.3s'
                          _hover={{ borderWidth: '2px', borderColor: 'primary.default', transition: 'all 0.3s' }}
                          borderRadius='100px'
                          display='flex'
                          alignItems='center'
                        >
                          <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                            <Avatar
                              py='2px'
                              borderRadius='100px'
                              size='md'
                              name={'Anonimus'}
                              src={'/assets/avatars/' + srcav}
                            />{' '}
                          </MenuButton>
                        </Box>
                      )}
                      {localStorage[TOKEN_KEY] && (
                        <>
                          <Box
                            borderWidth='2px'
                            borderColor='neutral.white'
                            transition='all 0.3s'
                            _hover={{ borderWidth: '2px', borderColor: 'primary.default', transition: 'all 0.3s' }}
                            borderRadius='14px'
                            display='flex'
                            alignItems='center'
                          >
                            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                              <Avatar
                                borderRadius='12px'
                                size='md'
                                name={!loading && arr.firstname + ' ' + arr.lastname}
                                src={!loading && avatarUser}
                              />{' '}
                            </MenuButton>
                          </Box>
                        </>
                      )}
                      {localStorage[TOKEN_KEY] ? (
                        <>
                          <MenuList>
                            <Link to='/user/account'>
                              {/* //because it should refresh to update user logged in */}
                              <MenuItem fontWeight='medium'>Settings</MenuItem>
                            </Link>
                            {checkerIfAdmin && (
                              <Link to='/admin/restaurant/dashboard'>
                                <MenuItem fontWeight='medium'>Your restaurant</MenuItem>
                              </Link>
                            )}

                            <MenuDivider />

                            <MenuItem
                              onClick={onLogOut}
                              m={0}
                              h='100%'
                              background='neutral.white'
                              variant='solid'
                              color='error.default'
                              _hover={{
                                background: 'error.default',
                                color: 'neutral.white'
                              }}
                              fontWeight='medium'
                            >
                              Log Out
                            </MenuItem>
                          </MenuList>
                        </>
                      ) : (
                        <MenuList>
                          <a href='/signup'>
                            {' '}
                            <MenuItem fontWeight='medium'>Sign up</MenuItem>
                          </a>

                          <a href='/login'>
                            {' '}
                            <MenuItem fontWeight='medium'>Log in</MenuItem>
                          </a>
                        </MenuList>
                      )}
                    </Menu>
                  </Skeleton>
                </HStack>
              </HStack>

              <Box display={{ base: 'inline-flex', md: 'none' }}>
                <HStack display='flex' alignItems='center' spacing={4}>
                  {localStorage[TOKEN_KEY] && (
                    <>
                      <Box>
                        <GeolocationDefinder
                          pxx={'2px'}
                          pyy={'2px'}
                          setLoading={setLoading}
                          loading={loading}
                          isInCart={isInCart}
                        />
                      </Box>
                      <Skeleton borderRadius='16px' isLoaded={!loading}>
                        <Box
                          borderColor={isInCart ? 'primary.default' : 'neutral.white'}
                          borderWidth='1px'
                          ml='4px'
                          bg={localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.lightest'}
                          color='black'
                          _hover={{ bg: localStorage.getItem('colormode') === 'dark' ? '#414165' : 'primary.light' }}
                          px={'2px'}
                          py={'2px'}
                          borderRadius='12px'
                          position='relative'
                        >
                          <Box
                            px={1}
                            position='absolute'
                            top='-2px'
                            right='-4px'
                            bg='primary.default'
                            h='20px'
                            minW='20px'
                            borderRadius='8px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            fontSize='xs'
                            fontWeight='semibold'
                            color='whiteAlpha.900'
                            textAlign='center'
                            minWidth='20px'
                          >
                            {!loading && cartLen}
                          </Box>
                          <Menu>
                            <MenuButton
                              as={Button}
                              p='6px'
                              rounded={'full'}
                              variant={'link'}
                              cursor={'pointer'}
                              minW={0}
                            >
                              <IconShoppingBag color='#4E60FF' />
                            </MenuButton>
                            <MenuList>
                              <Link to='/user/cart'>
                                {/* //because it should refresh to update user logged in */}
                                <MenuItem
                                  color={
                                    localStorage.getItem('colormode') === 'dark' ? 'neutral.white' : 'neutral.black'
                                  }
                                  fontWeight='medium'
                                >
                                  My cart
                                </MenuItem>
                              </Link>

                              {!loading && cartLen > 0 && (
                                <MenuItem
                                  onClick={clearUserCart}
                                  m={0}
                                  h='100%'
                                  background='neutral.white'
                                  variant='solid'
                                  color='error.default'
                                  _hover={{
                                    background: 'error.default',
                                    color: 'neutral.white'
                                  }}
                                  fontWeight='medium'
                                >
                                  Clear cart
                                </MenuItem>
                              )}
                            </MenuList>
                          </Menu>
                        </Box>
                      </Skeleton>
                    </>
                  )}
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Menu>
                      {!localStorage[TOKEN_KEY] && (
                        <Box
                          borderWidth='2px'
                          borderColor='neutral.white'
                          transition='all 0.3s'
                          _hover={{ borderWidth: '2px', borderColor: 'primary.default', transition: 'all 0.3s' }}
                          borderRadius='100px'
                          display='flex'
                          alignItems='center'
                        >
                          <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                            <Avatar
                              py='2px'
                              borderRadius='100px'
                              size='md'
                              name={'Anonimus'}
                              src={'/assets/avatars/' + srcav}
                            />{' '}
                          </MenuButton>
                        </Box>
                      )}

                      {localStorage[TOKEN_KEY] ? (
                        <>
                          <MenuButton as={Button} variant={'link'} cursor={'pointer'} minW={0}>
                            <Avatar
                              borderRadius='12px'
                              size='md'
                              style={{ transform: 'scale(0.9)' }}
                              name={!loading && arr.firstname + ' ' + arr.lastname}
                              src={(!loading && avatarUser) || null}
                            />{' '}
                          </MenuButton>
                          <MenuList>
                            {/* //because it should refresh to update user logged in */}
                            <Link to='/user/account'>
                              {' '}
                              <MenuItem fontWeight='medium'>Settings</MenuItem>
                            </Link>
                            {checkerIfAdmin && (
                              <Link to='/admin/restaurant/dashboard'>
                                <MenuItem fontWeight='medium'>Your restaurant</MenuItem>
                              </Link>
                            )}

                            <MenuDivider />

                            <MenuItem
                              onClick={onLogOut}
                              m={0}
                              h='100%'
                              background='neutral.white'
                              variant='solid'
                              color='error.default'
                              _hover={{
                                background: 'error.default',
                                color: 'neutral.white'
                              }}
                              fontWeight='medium'
                            >
                              Log Out
                            </MenuItem>
                          </MenuList>
                        </>
                      ) : (
                        <MenuList>
                          <a href='/signup'>
                            {' '}
                            <MenuItem fontWeight='medium'>Sign up</MenuItem>
                          </a>

                          <a href='/login'>
                            {' '}
                            <MenuItem fontWeight='medium'>Log in</MenuItem>
                          </a>
                        </MenuList>
                      )}
                    </Menu>
                  </Skeleton>
                  <Box ml='13px' mr='12px' h='32px' w='1px' mx='4' bg='neutral.grayLightest' />
                  <IconButton
                    display={{ base: 'flex', md: 'none' }}
                    aria-label='Open menu'
                    fontSize='20px'
                    bg={localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.lightest'}
                    _dark={{ color: 'inherit' }}
                    variant='ghost'
                    color={() => (localStorage.getItem('colormode') === 'dark' ? 'black' : 'grayLight')}
                    h='40px'
                    w='40px'
                    borderRadius='12px'
                    icon={<AiOutlineMenu />}
                    onClick={mobileNav.onOpen}
                  />
                </HStack>
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
                  spacing={4}
                  borderRadius='15px'
                  border='light.neutral.light'
                  borderWidth={1}
                  shadow='lg'
                >
                  <Flex w='100%' direction='column' justifyContent='space-between'>
                    <Box display='flex' justifyContent='center' w='100%' mx='auto' my={4}>
                      <Link to='/'>
                        <Box title='Homepage' display='flex' alignItems='center'>
                          <Logo />
                        </Box>
                        <VisuallyHidden>Brio</VisuallyHidden>
                      </Link>

                      <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                        <Link to='/' title='Homepage'>
                          Brio
                        </Link>
                      </Text>
                    </Box>
                    <Button
                      _hover={{
                        background: localStorage.getItem('colormode') !== 'dark' ? 'primary.light' : '#363654'
                      }}
                      color={
                        isInRestaurants
                          ? 'primary.default'
                          : localStorage.getItem('colormode') === 'dark'
                          ? 'neutral.black'
                          : 'neutral.black'
                      }
                      fontWeight='extrabold'
                      fontSize='xs'
                      variant='ghost'
                      mb='24px'
                    >
                      <Link to='/restaurant'>Restaurants</Link>
                    </Button>
                    <Button
                      _hover={{
                        background: localStorage.getItem('colormode') !== 'dark' ? 'primary.light' : '#363654'
                      }}
                      color={
                        isInDeals
                          ? 'primary.default'
                          : localStorage.getItem('colormode') === 'dark'
                          ? 'neutral.black'
                          : 'neutral.black'
                      }
                      fontWeight='extrabold'
                      fontSize='xs'
                      variant='ghost'
                      mb='24px'
                    >
                      <Link to='/deals'>Deals </Link>
                    </Button>
                    <Button
                      _hover={{
                        background: localStorage.getItem('colormode') !== 'dark' ? 'primary.light' : '#363654'
                      }}
                      color={
                        isInBlog
                          ? 'primary.default'
                          : localStorage.getItem('colormode') === 'dark'
                          ? 'neutral.black'
                          : 'neutral.black'
                      }
                      fontWeight='extrabold'
                      fontSize='xs'
                      variant='ghost'
                      mb='24px'
                    >
                      <Link to='/blog'>Blogs </Link>
                    </Button>
                    {localStorage[TOKEN_KEY] && (
                      <Button
                        _hover={{
                          background: localStorage.getItem('colormode') !== 'dark' ? 'primary.light' : '#363654'
                        }}
                        color={
                          isInMyOrders
                            ? 'primary.default'
                            : localStorage.getItem('colormode') === 'dark'
                            ? 'neutral.black'
                            : 'neutral.black'
                        }
                        fontWeight='extrabold'
                        fontSize='xs'
                        variant='ghost'
                        mb='24px'
                      >
                        <Link to='/user/orders'>My orders</Link>
                      </Button>
                    )}{' '}
                    <Button
                      textDecoration='none'
                      mb={4}
                      bg={localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.lightest'}
                      variant={'link'}
                      size='xs'
                      py='8px'
                      px='8px'
                      color='primary.default'
                      onClick={() => {
                        const newColorMode = colorMode === 'light' ? 'dark' : 'light';
                        localStorage.setItem('colormode', newColorMode);
                        setColorMode(newColorMode);
                        playAudio();
                      }}
                    >
                      <audio ref={audioRef} />

                      {localStorage.getItem('colormode') === 'dark' ? (
                        <Box display='flex' alignItems='center'>
                          <Moon />{' '}
                          <Box textDecoration='none' ms={2} as='span'>
                            {' Light mode '}
                          </Box>
                        </Box>
                      ) : (
                        <Box display='flex' alignItems='center'>
                          <Sun />{' '}
                          <Box textDecoration='none' ms={2} as='span'>
                            {' Dark mode '}
                          </Box>
                        </Box>
                      )}
                    </Button>
                    <Box>
                      <form onSubmit={handleSearch}>
                        <Box my='8px' display='flex' justifyItems='center'>
                          <InputGroup size='sm' fontSize='md' w='60%' mx='auto'>
                            <InputRightElement>
                              <Button type='submit'>
                                <AiOutlineSearch color='#828282' size={14} />
                              </Button>
                            </InputRightElement>

                            <Input
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              background='neutral.grayLightest'
                              _placeholder={{ color: 'neutral.gray' }}
                              borderRadius={100}
                              fontSize='2xs'
                              type='text'
                              placeholder='Search...'
                            />
                          </InputGroup>
                        </Box>
                      </form>
                    </Box>
                  </Flex>
                  <Flex w='100%' justifyContent='space-between' px='16px'>
                    <Flex justifyContent='flex-end'></Flex>
                    <CloseButton
                      color={localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black'}
                      aria-label='Close menu'
                      onClick={mobileNav.onClose}
                    />
                  </Flex>
                </VStack>
              </Box>
            </HStack>
          </Flex>
        </chakra.header>
      </Container>
    </Box>
  );
}
