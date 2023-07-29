import React, { useEffect, useState } from 'react';
import { API_URL, handleApiGet } from '../../services/apiServices';
import { useParams } from 'react-router-dom';
import { Box, Container, Flex, Text, Avatar } from '@chakra-ui/react';

export default function Blog() {
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(true);
  let [userArr, setUsersArr] = useState([]);
  const params = useParams();
  const handleBlogApi = async () => {
    try {
      console.log(params['id']);
      const url = API_URL + '/blogs/' + params['id'];
      console.log(url);

      const data = await handleApiGet(url);
      await handleUsersPublicData(data);

      setArr(data);
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
            _before={{
              borderRadius: '16px',
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage:
                'linear-gradient(180deg,rgba(0,0,0,0) 7%,rgba(0,0,0,0.08) 12%,rgba(0,0,0,0.16) 17%,rgba(0,0,0,0.22) 21%,rgba(0,0,0,0.32) 26%,rgba(0,0,0,0.42) 32%,rgba(0,0,0,0.52) 38%,rgba(0,0,0,0.62) 47%,rgba(0,0,0,0.72) 57%,rgba(0,0,0,0.82) 65%)'
            }}
          >
            <Flex direction='column' justifyContent='flex-end' h='100%' p={4}>
              <Text
                backgroundColor='none'
                mt={5}
                ms={5}
                data-aos='fade-up'
                textAlign='center'
                fontSize={{ base: 'xl', md: '2xl' }}
                lineHeight={{ base: '40px', md: '50px' }}
                color='white'
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
                color='neutral.gray'
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
                color='white'
                fontWeight='bold'
              >
                {arr._id && arr.desc}
              </Text>

              <Box mt={2} mx='auto' display='flex' alignItems='center'>
                <Avatar size='sm' name={getUserName(arr.userRef)} src={getUserAvatar(arr.userRef)} />
                <Text
                  backgroundColor='none'
                  ms={2}
                  data-aos='fade-up'
                  textAlign='center'
                  fontSize='xs'
                  color='white'
                  fontWeight='bold'
                >
                  By {getUserName(arr.userRef)}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Container>
      )}
    </Box>
  );
}
