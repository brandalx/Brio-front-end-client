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
  useMediaQuery,
  useToast
} from '@chakra-ui/react';

export default function ModalNoteRedactor({ isOpen, onClose, user, fetchUser, userId, note }) {
  const [isLilMob] = useMediaQuery('(max-width: 350px)');
  const { control, handleSubmit } = useForm();
  const toast = useToast();

  const handleNoteSubmit = async (data) => {
    console.log(data);

    if (user && userId) {
      try {
        await handleApiPost(API_URL + '/users/' + userId + '/notes', { notes: data.notes });
        fetchUser();
        onClose();

        // Show a success toast notification
        toast({
          title: 'Note updated',
          description: 'The note was successfully updated.',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      } catch (error) {
        console.error('Error updating note:', error);

        // Show an error toast notification
        toast({
          title: 'Error updating note',
          description: 'An error occurred while updating the note.',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
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
          color={() => (localStorage.getItem('colormode') === 'dark' ? 'black' : 'grayLight')}
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
                fontSize='s'
                defaultValue={note}
                render={({ field }) => <Input fontSize='s' {...field} placeholder='Title' />}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter display='flex' justifyContent={isLilMob ? 'center' : 'end'}>
            <Button
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
