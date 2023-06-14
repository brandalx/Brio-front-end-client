import {
  Box,
  Center,
  Container,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Checkbox,
  Button,
  Flex,
  chakra,
  VisuallyHidden,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem,
  Skeleton,
  Divider
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/svg/Logo';
import { AiOutlineSearch } from 'react-icons/ai';
import SignUpOptionsArr from '../userComponents/SignUp/SignUpOptions';
import Page404 from '../userPages/Page404';
import SignUpMain from '../userComponents/SignUp/SignUpMain';
import PersonalDetails from '../userComponents/SignUp/PersonalDetails';
import AdditionalInfo from '../userComponents/SignUp/AdditionalInfo';
import Confirmation from '../userComponents/SignUp/Confirmation';
import OrderStatus from '../../assets/svg/OrderStatus';
import SignupStatus from '../../assets/svg/SignupStatus';
function RedirectHandler({ setRedirect }) {
  useEffect(() => {
    setRedirect(true);
  }, [setRedirect]);
  setRedirect(false);
  return null;
}
export default function SignUp() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const [option2, SetOption2] = useState(null);
  const [mainBody, setMainBody] = useState({
    type: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: ''
  });
  const [shouldRedirectTo404, setShouldRedirectTo404] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirectTo404) {
      navigate('/signup');
      SetOption2(null);
    }
  }, [shouldRedirectTo404, navigate]);
  const [isStatus, setIsStatus] = useState(1);

  useEffect(() => {
    if (currentUrl === '/signup') {
      setIsStatus(1);
    }
    if (currentUrl === '/signup/personal') {
      setIsStatus(2);
    }
    if (currentUrl === '/signup/personal/info') {
      setIsStatus(3);
    }
    if (currentUrl === '/signup/personal/info/confirmation') {
      setIsStatus(4);
    }
  }, [currentUrl]);

  useEffect(() => {}, [option2]);

  return (
    <>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 2fr' }} gap={0}>
        <GridItem className='css-selector1' display={{ base: 'none', md: 'inline-flex' }} h='100vh'>
          <Box mx='auto' py={6}>
            <Flex>
              <Box title='Homepage' display='flex' alignItems='center'>
                <Link to='/'>
                  {' '}
                  <Logo color='white' />
                </Link>
                <VisuallyHidden>Brio</VisuallyHidden>
              </Box>
              <Text fontSize='sm' fontWeight='extrabold' color='neutral.white' ml='2'>
                <Link to='/'> Brio</Link>
              </Text>
            </Flex>
          </Box>
        </GridItem>
        <GridItem w='100%' h='100vh'>
          <Flex h='100%' justifyContent={{ base: 'center', md: 'flex-start' }}>
            <Flex
              ms={{ base: '0px', md: '100px', lg: '250px' }}
              flexDir='column'
              justifyContent='space-between'
              h='100%'
              maxWidth='350px'
            >
              <Box minWidth={{ base: '300px', md: '400px', lg: '400px' }} py={6}>
                <Grid mt={5} templateColumns='0.2fr 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr' gap={2}>
                  <GridItem w='fit-content'>
                    <Box>
                      <SignupStatus color={isStatus >= 1 ? '#4e60ff' : undefined} />
                    </Box>
                  </GridItem>

                  <GridItem w='100%'>
                    <Box h='100%' display='flex' alignItems='center'>
                      <Divider borderWidth='1px' borderColor={isStatus > 1 ? '#1ABF70' : undefined} />
                    </Box>
                  </GridItem>
                  <GridItem w='100%'>
                    <Box>
                      <SignupStatus color={isStatus > 1 ? '#4e60ff' : undefined} />
                    </Box>
                  </GridItem>
                  <GridItem w='100%'>
                    <Box h='100%' display='flex' alignItems='center'>
                      <Divider borderWidth='1px' borderColor={isStatus > 2 ? '#1ABF70' : undefined} />
                    </Box>
                  </GridItem>
                  <GridItem w='100%'>
                    <Box>
                      <SignupStatus color={isStatus > 2 ? '#4e60ff' : undefined} />
                    </Box>
                  </GridItem>
                  <GridItem w='100%'>
                    <Box h='100%' display='flex' alignItems='center'>
                      <Divider borderWidth='1px' borderColor={isStatus > 3 ? '#1ABF70' : undefined} />
                    </Box>
                  </GridItem>
                  <GridItem w='100%'>
                    <Box>
                      <SignupStatus color={isStatus >= 4 ? '#4e60ff' : undefined} />
                    </Box>
                  </GridItem>
                </Grid>

                <Flex justifyContent='space-between' my={4}>
                  <Box>
                    <Skeleton h='20px' borderRadius='16px' isLoaded={true}>
                      <Box mt={4} textAlign='center'>
                        <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                          Account <br /> type
                        </Text>
                      </Box>
                    </Skeleton>
                  </Box>
                  <Box>
                    <Skeleton h='20px' borderRadius='16px' isLoaded={true}>
                      <Box mt={4} textAlign='center'>
                        <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                          Personal <br /> details
                        </Text>
                      </Box>
                    </Skeleton>
                  </Box>
                  <Box>
                    <Skeleton h='20px' borderRadius='16px' isLoaded={true}>
                      <Box mt={4} textAlign='center'>
                        <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                          Additional <br /> info
                        </Text>
                      </Box>
                    </Skeleton>
                  </Box>
                  <Box>
                    <Skeleton h='20px' borderRadius='16px' isLoaded={true}>
                      <Box mt={4}>
                        <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                          Confirmation
                        </Text>
                      </Box>
                    </Skeleton>
                  </Box>
                </Flex>
              </Box>

              <Routes>
                <Route path='/' element={<SignUpMain mainBody={setMainBody} SetOption2={SetOption2} />} />

                {option2 && (
                  <>
                    <Route
                      path='/personal'
                      element={<PersonalDetails setMainBody={setMainBody} mainBody={mainBody} type={option2} />}
                    />
                    <Route path='/personal/info' element={<AdditionalInfo mainBody={setMainBody} />} />
                    <Route path='/personal/info/confirmation' element={<Confirmation mainBody={setMainBody} />} />
                  </>
                )}
                <Route path='/*' element={<RedirectHandler setRedirect={setShouldRedirectTo404} />} />
              </Routes>

              <Box textAlign='center' py={6}>
                <Text w='100%'>
                  Already have an account?
                  <Link to='/login' w='100%'>
                    {' '}
                    <Text
                      fontSize='2xs'
                      fontWeight='bold'
                      as='span'
                      color='primary.default'
                      _hover={{ textDecor: 'underline' }}
                    >
                      Sign in
                    </Text>{' '}
                  </Link>
                </Text>
              </Box>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}
