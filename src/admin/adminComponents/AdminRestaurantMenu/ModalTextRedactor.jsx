import React from 'react';
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
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { API_URL } from '../../../services/apiServices';
import axios from 'axios';

export default function ModalTextRedactor({ isOpen, onOpen, onClose, item }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isLilMob] = useMediaQuery('(max-width: 350px)');

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Объединение данных формы с константными данными и отправка PATCH-запроса
    const combinedData = {
      ...data,
      _id: item._id, // use the item's _id
      restaurantRef: item.restaurantRef, // use the item's restaurantRef
      categoryName: item.categoryName, // use the item's categoryName
      image: item.image // use the item's images
    };

    axios
      .patch(`http://localhost:3001/admin/products/${item._id}`, combinedData)
      .then((response) => {
        console.log(response);
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error(error);
      });
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
          <ModalHeader>Edit {item.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow='auto' pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Controller
                control={control}
                name='title'
                defaultValue={item.title}
                render={({ field }) => <Input {...field} placeholder='Title' />}
              />
              <FormLabel mt='15px'>Description</FormLabel>
              <Controller
                control={control}
                name='description'
                defaultValue={item.description}
                render={({ field }) => <Input {...field} placeholder='Description' />}
              />
              <FormLabel mt='15px'>Ingredients</FormLabel>
              <Controller
                control={control}
                name='ingredients'
                defaultValue={item.ingredients}
                render={({ field }) => <Input {...field} placeholder='Ingredients' />}
              />
              <FormLabel mt='15px'>Price</FormLabel>
              <Controller
                control={control}
                name='price'
                defaultValue={item.price}
                render={({ field }) => <Input {...field} placeholder='Price' type='number' />}
              />

              <FormLabel mt='15px'>Nutritional value</FormLabel>
              <Controller
                control={control}
                name='nutritionalValue'
                defaultValue={item.nutritionalValue}
                render={({ field }) => <Input {...field} placeholder='Nutritional value' />}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter display='flex' justifyContent={isLilMob ? 'center' : 'end'}>
            <Button
              p='20px'
              h='20px'
              border='1px'
              borderColor='neutral.gray'
              color='neutral.gray'
              colorScheme='blue'
              mr={3}
              onClick={onClose}
              _hover={{
                background: 'error.default',
                color: 'neutral.white',
                borderWidth: '1px',
                borderColor: 'error.default'
              }}
            >
              Cancel
            </Button>
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
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
