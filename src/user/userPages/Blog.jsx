import React, { useEffect, useState } from 'react';
import { API_URL, TOKEN_KEY, handleApiGet } from '../../services/apiServices';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Flex, Text, Avatar, GridItem, Skeleton } from '@chakra-ui/react';
import BlogEditor from '../userComponents/Blog/BlogEditor';
import { Button } from '@chakra-ui/react';
import Logo from '../../assets/svg/Logo';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Icon } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';
import noimage from '../../assets/images/noimageblog.jpg';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
export default function Blog() {
  const [arr, setArr] = useState([]);
  const [editorState, setEditorState] = useState();
  const [showOops, setShowOops] = useState(false);
  const [loading, setLoading] = useState(true);
  let [userArr, setUsersArr] = useState([]);
  const [customStyleMap, setCustomStyleMap] = useState({});
  const [hovered, setHovered] = useState(false);
  const [definedImage, setDefinedImage] = useState('');
  const params = useParams();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleBlogApi = async () => {
    try {
      console.log(params['id']);
      const url = API_URL + '/blogs/' + params['id'];
      console.log(url);

      const data = await handleApiGet(url);

      await handleUsersPublicData(data);

      if (!data || !data._id) {
        setShowOops(true);
      } else {
        console.log(data);
        setArr(data);
        await defineCoverImage(data);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setShowOops(true);
      console.log(error);
    }
  };

  useEffect(() => {
    handleBlogApi();
  }, []);

  let getUserName = (userid) => {
    try {
      if (Array.isArray(userArr)) {
        const user = userArr.find((item) => item._id === userid);
        if (user) {
          return user.firstname + ' ' + user.lastname;
        }
      }
      return '';
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  let getUserAvatar = (userid) => {
    try {
      const user = userArr.find((item) => item._id === userid);
      if (user) {
        // check if user exists
        if (user.avatar) {
          // check if avatar exists
          let stringAvatar = API_URL + (API_URL.endsWith('/') ? '' : '/') + user.avatar;
          return stringAvatar;
        } else {
          console.log(`No avatar found for user ${userid}`);
        }
      } else {
        console.log(`No user found for ID ${userid}`);
      }
      return '';
    } catch (error) {
      console.log('Error in getUserAvatar: ', error);
      return '';
    }
  };

  let handleUsersPublicData = async (_data) => {
    try {
      if (_data.userRef) {
        let allUsers = [];
        const response = await handleApiGet(`${API_URL}/users/info/public/user/${_data.userRef.toString()}`);
        allUsers = [...allUsers, response];
        setUsersArr(allUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const QuillModules = {
    toolbar: false
  };

  const QuillFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'align'
  ];

  const convertDeltaToHtml = (delta) => {
    const quill = new ReactQuill.Quill(document.createElement('div'));
    quill.setContents(delta);
    return quill.root.innerHTML;
  };
  const formatTime = (timepass) => {
    const isoString = timepass;
    const date = new Date(isoString);
    const usTime = date.toLocaleTimeString('en-US');
    return usTime;
  };
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formattedDate;
  };

  async function checkValidURL(url, data) {
    try {
      let stringCover = API_URL + (API_URL.endsWith('/') ? '' : '/') + data.cover;
      const response = await axios.get(stringCover);
      return true;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false;
      } else {
        throw error;
      }
    }
  }

  let getBlogImage = async (blogid, data) => {
    console.log(data);
    console.log(blogid);
    console.log(await checkValidURL(data.cover, data));
    try {
      const blog = data._id;
      if (blog) {
        // check if blog exists
        if (data.cover && (await checkValidURL(data.cover, data)) === true) {
          // check if cover exists
          let stringCover = API_URL + (API_URL.endsWith('/') ? '' : '/') + data.cover;
          return stringCover;
        } else {
          console.log(`No cover found for blog ${blogid}`);
          return false;
        }
      } else {
        console.log(`No cover found for ID ${blogid}`);
        return false;
      }
    } catch (error) {
      console.log('Error in getCoverImage: ', error);
      return false;
    }
  };

  const defineCoverImage = async (data) => {
    console.log(data);

    if (data && data._id && data.cover && data.cover.startsWith('images/')) {
      if ((await getBlogImage(data._id, data)) === false) {
        console.log('here 1');
        let finaldes = noimage;
        setDefinedImage(finaldes);
        return;
      } else if ((await getBlogImage(data._id, data)) != false) {
        console.log('here 2');
        let finaldes = await getBlogImage(data._id, data);
        setDefinedImage(finaldes);
        return;
      }
    } else if (data && data.cover) {
      let finaldes = data.cover;
      setDefinedImage(finaldes);
      console.log('here 3');
      return;
    } else {
      let finaldes = noimage;
      setDefinedImage(finaldes);
      console.log('here 4');
      return;
    }
  };
  return (
    <Box mb='150px'>
      <Helmet>
        <title>Blog - {(arr._id && arr.title) || ''}</title>
      </Helmet>
      {loading && (
        <>
          <Container maxW='1110px' data-aos='fade-up'>
            <Skeleton borderRadius='16px' isLoaded={!loading} minH='600px' my={2}></Skeleton>
          </Container>
        </>
      )}
      {loading && (
        <>
          <Container maxW='1110px' data-aos='fade-up'>
            <GridItem>
              <Skeleton borderRadius='16px' isLoaded={!loading} minH='300px' my={2}></Skeleton>
            </GridItem>
            <GridItem>
              <Skeleton borderRadius='16px' isLoaded={!loading} minH='300px' my={2}></Skeleton>
            </GridItem>
            <GridItem>
              <Skeleton borderRadius='16px' isLoaded={!loading} minH='300px' my={2}></Skeleton>
            </GridItem>
            <GridItem>
              <Skeleton borderRadius='16px' isLoaded={!loading} minH='300px' my={2}></Skeleton>
            </GridItem>
          </Container>
        </>
      )}

      {!showOops && !loading && arr._id && (
        <Box>
          {!loading && (
            <Container maxW='1110px' py={30}>
              {!loading && (
                <Button my={4} _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
                  <Flex alignItems='center'>
                    <Icon
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                      as={FaChevronLeft}
                      mr={1}
                      boxSize={4}
                    />
                    <Text onClick={() => handleGoBack()} color='neutral.black' fontSize='xs'>
                      Back
                    </Text>
                  </Flex>
                </Button>
              )}
              {!loading && localStorage[TOKEN_KEY] && (
                <Box my={5} px={3}>
                  <Link to='/blog/create/new'>
                    <Box
                      style={{ transition: 'all 0.3s' }}
                      cursor='pointer'
                      borderRadius='16px'
                      py={5}
                      borderColor='white'
                      borderWidth='1px'
                      bg='primary.light'
                      _hover={{
                        bg: 'white',
                        borderWidth: '1px',
                        borderColor: 'primary.default',
                        transition: 'all 0.3s'
                      }}
                    >
                      <Flex justifyContent='space-between' alignItems={{ base: 'none', md: 'center' }}>
                        <Text
                          ms={5}
                          textAlign={{ base: 'center', md: 'start' }}
                          fontSize={{ base: 'sm', md: 'dm' }}
                          color={hovered ? '#4e60ff' : '#4e60ff'}
                          fontWeight='black'
                        >
                          Write your own blog
                        </Text>
                        <Box me={5}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='icon icon-tabler icon-tabler-arrow-big-right-filled'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            strokeWidth='2'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                            <path
                              d='M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z'
                              strokeWidth='0'
                              fill={hovered ? '#4e60ff' : '#4e60ff'}
                            ></path>
                          </svg>
                        </Box>
                      </Flex>
                    </Box>
                  </Link>
                </Box>
              )}
              <Box
                cursor='pointer'
                py={5}
                borderRadius='16px'
                backgroundImage={`url(${arr._id && definedImage})`}
                backgroundRepeat='no-repeat'
                backgroundSize='cover'
                backgroundPosition='center'
                data-aos='fade-left'
                maxW='1245px'
                h='700px'
                position='relative'
              ></Box>
              <Flex direction='column' justifyContent='flex-end' h='100%' p={4}>
                <Text
                  backgroundColor='none'
                  mt={5}
                  ms={5}
                  data-aos='fade-up'
                  textAlign='center'
                  fontSize={{ base: 'xl', md: '2xl' }}
                  lineHeight={{ base: '40px', md: '50px' }}
                  color='neutral.black'
                  fontWeight='black'
                >
                  {arr._id && arr.title}
                </Text>
                <Text
                  backgroundColor='none'
                  mt={3}
                  ms={5}
                  data-aos='fade-up'
                  textAlign='center'
                  fontSize='xs'
                  color='neutral.grayLight'
                  fontWeight='bold'
                >
                  {arr.tags.map((item, index) => {
                    return (
                      <Box as='span' key={index}>
                        {' '}
                        #{item}
                      </Box>
                    );
                  })}
                </Text>

                <Text
                  backgroundColor='none'
                  mt={3}
                  ms={5}
                  data-aos='fade-up'
                  textAlign='center'
                  fontSize='xs'
                  color='neutral.gray'
                  fontWeight='bold'
                >
                  {arr._id && arr.desc}
                </Text>

                <Box mt={2} mx='auto' display='flex' alignItems='center'>
                  <Text
                    backgroundColor='none'
                    me={2}
                    data-aos='fade-up'
                    textAlign='center'
                    fontSize='xs'
                    color='neutral.gray'
                    fontWeight='bold'
                  >
                    By {getUserName(arr.userRef)}
                  </Text>
                  <Avatar
                    data-aos='fade-up'
                    size='sm'
                    name={getUserName(arr.userRef)}
                    src={getUserAvatar(arr.userRef)}
                  />
                </Box>
                {/* prettier-ignore */}
                <Text
                  backgroundColor='none'
                  me={2}
                  data-aos='fade-up'
                  textAlign='center'
                  fontSize='xs'
                  color='neutral.gray'
                  fontWeight='normal'
                >
                  {arr.creationDate ? formatDate(arr.creationDate) : ''} {" "}
                  at{" "}{arr.creationDate ? formatTime(arr.creationDate) : ''}
                </Text>
              </Flex>
            </Container>
          )}

          {arr._id && arr.content ? (
            <Container maxW='1110px'>
              <ReactQuill
                style={{ border: 'none' }}
                readOnly={true}
                theme='snow'
                value={convertDeltaToHtml(arr.content)}
                modules={QuillModules}
                formats={QuillFormats}
              />
            </Container>
          ) : (
            <Box>
              <Text
                backgroundColor='none'
                me={2}
                textAlign='center'
                fontSize='xs'
                color='primary.default'
                fontWeight='bold'
              >
                Sorry, there is no content :(
              </Text>
            </Box>
          )}
        </Box>
      )}

      {showOops && !loading && (
        <Box>
          <Container mt='15%' maxW='1110px' data-aos='fade-up'>
            <Box>
              <Box minH='300px' py={5} my={5} textAlign='center'>
                <Flex flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
                  <Box>
                    <Box>
                      <Flex alignItems='center' justifyContent='center'>
                        <Logo />
                        <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='1'>
                          Brio
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                  <Box mt={4}>
                    <Text fontSize='2xl' fontWeight='extrabold' color='primary.default'>
                      Ooops
                    </Text>
                    <Text fontSize='sm' fontWeight='bold' color='neutral.grayDark'>
                      Sorry! This Blog does not exist...
                    </Text>
                    <Link to='/'>
                      <Button
                        mt={5}
                        px={5}
                        borderRadius={100}
                        background='primary.default'
                        fontWeight='bold'
                        variant='solid'
                        color='neutral.white'
                        borderWidth='1px'
                        borderColor='neutral.white'
                        _hover={{
                          background: 'neutral.white',
                          color: 'primary.default',
                          borderWidth: '1px',
                          borderColor: 'primary.default'
                        }}
                        py={5}
                      >
                        Back to home
                      </Button>
                    </Link>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
}
