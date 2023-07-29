import React, { useEffect, useState } from 'react';
import { API_URL, handleApiGet } from '../../services/apiServices';
import { useParams } from 'react-router-dom';
import { Box, Container, Flex, Text, Avatar } from '@chakra-ui/react';
import BlogEditor from '../userComponents/Blog/BlogEditor';
import BlogReader from '../userComponents/Blog/BlogReader';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

export default function Blog() {
  const [arr, setArr] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const [loading, setLoading] = useState(true);
  let [userArr, setUsersArr] = useState([]);
  const [customStyleMap, setCustomStyleMap] = useState({});

  const params = useParams();
  const handleBlogApi = async () => {
    try {
      console.log(params['id']);
      const url = API_URL + '/blogs/' + params['id'];
      console.log(url);

      const data = await handleApiGet(url);
      await handleUsersPublicData(data);

      setArr(data);
      const rawContentFromDB = data.content;
      rawContentFromDB.entityMap = rawContentFromDB.entityMap || {};
      const customStyleMap = generateCustomStyleMap(rawContentFromDB);

      setCustomStyleMap(customStyleMap);

      if (rawContentFromDB) {
        const contentState = convertFromRaw(rawContentFromDB);
        setEditorState(EditorState.createWithContent(contentState));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  function generateCustomStyleMap(data) {
    const customStyleMap = {};

    data.blocks.forEach((block) => {
      block.inlineStyleRanges.forEach((range) => {
        const styleType = range.style.split('-')[0];
        const styleValue = range.style.split('-')[1];

        if (!customStyleMap[range.style]) {
          if (styleType === 'fontsize') {
            customStyleMap[range.style] = { fontSize: `${styleValue}px` };
          } else if (styleType === 'fontfamily') {
            customStyleMap[range.style] = { fontFamily: styleValue };
          }
        }
      });
    });

    return customStyleMap;
  }

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

  return (
    <Box>
      {!loading && (
        <Container maxW='1110px' py={30}>
          <Box
            cursor='pointer'
            py={5}
            borderRadius='16px'
            backgroundImage={`url(${arr._id && arr.coverImg})`}
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
              <Avatar data-aos='fade-up' size='sm' name={getUserName(arr.userRef)} src={getUserAvatar(arr.userRef)} />
              <Text
                backgroundColor='none'
                ms={2}
                data-aos='fade-up'
                textAlign='center'
                fontSize='xs'
                color='neutral.gray'
                fontWeight='bold'
              >
                By {getUserName(arr.userRef)}
              </Text>
            </Box>
          </Flex>
        </Container>
      )}
      <Container maxW='1110px'>
        <Box lineHeight='0.5'>
          <BlogEditor />
        </Box>
      </Container>

      <Box py={2} lineHeight='0.5'>
        <Editor editorState={editorState} customStyleMap={customStyleMap} readOnly={true} />
      </Box>
    </Box>
  );
}
