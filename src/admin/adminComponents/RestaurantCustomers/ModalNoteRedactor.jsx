import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { API_URL, handleApiGet, handleApiPost } from '../../../services/apiServices';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useMediaQuery
} from '@chakra-ui/react';

export default function ModalNoteRedactor({ isOpen, onClose, user, fetchUser, userId, note }) {
  const [isLilMob] = useMediaQuery('(max-width: 350px)');
  const { control, handleSubmit } = useForm();

  const handleNoteSubmit = async (data) => {
    console.log(data);

    if (user && userId) {
      try {
        console.log(data);

        await handleApiPost(API_URL + '/users/' + userId + '/notes', { notes: data.notes });
        fetchUser();
        console.log(data);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    } else {
      console.error('User or user.id is undefined');
    }
  };

  return (
    <>
      <Modal
        size={isLilMob ? 'full' : 'xl'}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        zIndex='9999999'
      >
        <ModalOverlay
          width='100%'
          sx={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '10',
            bg: 'rgba(0,0,0,0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
        <ModalContent
          position='relative'
          boxSizing='content-box'
          width={['100%', '100%', '100%', '540px']}
          maxW='96%'
          MaxH='568px'
        >
          <ModalHeader>Edit note</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow='auto' pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Controller
                control={control}
                name='notes'
                defaultValue={note}
                render={({ field }) => <Input {...field} placeholder='Title' />}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter display='flex' justifyContent={isLilMob ? 'center' : 'end'}>
            <Button
              p='20px'
              h='40px'
              m='0 5px'
              fontWeight='500'
              fontSize='16px'
              lineHeight='22px'
              sx={{
                background: '#44BB6E',
                borderRadius: '6px',
                color: 'white',
                boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.1)'
              }}
              onClick={handleSubmit(handleNoteSubmit)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
