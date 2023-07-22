import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, Image, Text, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { API_URL, handleApiGet, handleApiPost } from '../../../services/apiServices';
import Phone from '../../../assets/svg/Phone';
import Email from '../../../assets/svg/Email';
import ModalNoteRedactor from './ModalNoteRedactor';

export default function CustomerProfile() {
  const [user, setUser] = useState(null);
  const [note, setNote] = useState('');
  const { userId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [role, setRole] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await handleApiGet(API_URL + '/users/' + userId);
      setUser(response);
      setRole(response.role);

      setNote(response.notes);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <Box>
      <Container maxW='1132px' pb='50px' paddingLeft={0}>
        <Box paddingBottom='16px'>
          <Text color='neutral.black' fontWeight='semibold' fontSize='sm'>
            Customer profile
          </Text>
        </Box>
        {user && (
          <Box border='1px' borderRadius='6px' borderColor='neutral.grayLightest'>
            <Box display='flex' padding='16px 16px 20px 16px'>
              <Box display='flex' alignItems='flex-end'>
                <Avatar
                  width='88px'
                  height='88px'
                  borderRadius='16px'
                  name={user.firstname + ' ' + user.lastname}
                  src={API_URL + '/' + user.avatar || ''}
                  objectFit='cover'
                  objectPosition='center'
                />
              </Box>
              <Box marginLeft='16px'>
                <Box marginBottom='16px'>
                  <Text color='neutral.black' fontWeight='bold' fontSize='xs'>
                    {user.firstname + ' ' + user.lastname}
                  </Text>
                </Box>
                <Box display='flex' alignItems='center'>
                  <Phone />
                  <Text marginLeft='8px' color='neutral.gray' fontSize='3xs' fontWeight='semibold'>
                    {user.phone}
                  </Text>
                </Box>
                <Box display='flex' alignItems='center' marginTop='4px'>
                  <Email />
                  <Text marginLeft='8px' color='neutral.gray' fontSize='3xs' fontWeight='semibold'>
                    {user.email}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box padding='0px 16px 20px 16px' borderBottom='1px' borderColor='neutral.grayLightest'></Box>
            <Box padding='16px 16px 20px 16px'>
              <Text color='neutral.black' fontWeight='bold' fontSize='xs'>
                Notes
              </Text>
              <Box>
                <Text color='neutral.grayDark' fontWeight='normal' fontSize='2xs'>
                  {user.notes}
                </Text>
              </Box>

              <Button
                onClick={onOpen}
                _hover={{
                  background: 'primary.default',
                  color: 'neutral.white',
                  borderWidth: '1px',
                  borderColor: 'primary.default'
                }}
                color='primary.default'
                p='20px'
                border='1px'
                borderColor='primary.default'
                w='100%'
                marginTop='16px'
              >
                Edit note
              </Button>

              <ModalNoteRedactor
                isOpen={isOpen}
                onClose={onClose}
                user={user}
                fetchUser={fetchUser}
                userId={userId}
                note={note}
              />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
