import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { API_URL, handleApiMethod } from '../../../services/apiServices';
import { kMaxLength } from 'buffer';
import cardValidator from 'card-validator';
export default function NewPaymentMethod({
  switcher,
  updateCreditCard,
  onSubForm2,
  handleApi,
  setIsEditTrue,
  isEditTrue,
  clearValues
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    handleUserCardPost(_bodyData);
  };

  const toast = useToast();
  const handleUserCardPost = async (_bodyData) => {
    try {
      const validation = cardValidator.number(_bodyData.cardNumber);
      let bodytype = _bodyData.cardType.toLowerCase();

      if (validation.card.type.toLowerCase() !== bodytype) {
        validation.isValid = false;
      }

      if (!validation.isValid) {
        // console.log('Credit card is invalid!');
        toast({
          title: 'Credit card is not valid',
          description: 'Error when adding new payment method',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        // console.log('All fields are valid!');

        const url = API_URL + '/users/postusercard';
        const data = await handleApiMethod(url, 'POST', _bodyData);

        if (data.msg === true) {
          toast({
            title: 'New payment method added.',
            description: "We've added your new payment method.",
            status: 'success',
            duration: 9000,
            isClosable: true
          });
          updateCreditCard(_bodyData);
          handleApi();
        }
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data && error.response.data.err === 'Such payment method already exists') {
        toast({
          title: 'Duplicated payment methods',
          description: `Error when adding new payment method - such payment method already exists.`,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when adding new payment method',
          description: 'Error when adding new payment method',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
  };

  return (
    <>
      <Box ms={2} mb={4} mt={10} data-aos='fade-up'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          New payment method
        </Text>
        <FormLabel pb={2} fontWeight='semibold' fontSize='3xs' color='neutral.grayLight'>
          We currently accept only "Visa" and "MasterCard"
        </FormLabel>

        <Box mt={4}>
          <form onSubmit={handleSubmit(onSubForm)}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 1fr ' }} gap={6}>
              <GridItem w='100%'>
                <FormControl id='number' isInvalid={errors.cardNumber}>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Card number
                  </FormLabel>

                  <Input
                    {...register('cardNumber', {
                      required: { value: true, message: 'This field is required' },
                      minLength: { value: 6, message: 'Minimum length should be 6' },
                      maxLength: { value: 20, message: 'Maximum length should be 20' }
                    })}
                    isDisabled={switcher}
                    pattern='[0-9]*'
                    inputMode='numeric'
                    type='password'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='XXXX - XXXX - XXXX - XXXX'
                  />
                  <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                    {errors.cardNumber && errors.cardNumber.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem w='100%'>
                <FormControl isInvalid={errors.expirationDate} id='exp'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Expiration
                  </FormLabel>
                  <Input
                    {...register('expirationDate', {
                      required: { value: true, message: 'This field is required' },
                      minLength: { value: 4, message: 'Minimum length should be 4' },
                      maxLength: { value: 4, message: 'Maximum length should be 4' }
                    })}
                    isDisabled={switcher}
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='MM / YYYY'
                  />{' '}
                  <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                    {errors.expirationDate && errors.expirationDate.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem w='100%'>
                <FormControl isInvalid={errors.securityCode} id='cvc'>
                  <FormLabel
                    fontWeight='semibold'
                    placeholder='+1(217) 555-0113'
                    fontSize='3xs'
                    color='neutral.grayDark'
                  >
                    CVC
                  </FormLabel>

                  <Input
                    {...register('securityCode', {
                      required: { value: true, message: 'This field is required' },
                      minLength: { value: 3, message: 'Minimum length should be 3' },
                      maxLength: { value: 6, message: 'Maximum length should be 6' }
                    })}
                    isDisabled={switcher}
                    type='password'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='XXX'
                  />
                  <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                    {errors.securityCode && errors.securityCode.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>

            <Box pt={5} mb={2}>
              <Grid templateColumns='repeat(1, 1fr)' gap={4}>
                <GridItem w='100%'>
                  <FormControl isInvalid={errors.cardholder} id='cardholder'>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Cardholder
                    </FormLabel>

                    <Input
                      {...register('cardholder', {
                        required: { value: true, message: 'This field is required' },
                        minLength: { value: 4, message: 'Minimum length should be 4' }
                      })}
                      isDisabled={switcher}
                      type='text'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Enter name on card'
                    />
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                      {errors.cardholder && errors.cardholder.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem w='100%'>
                  <FormControl isInvalid={errors.cardType}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Card type
                    </FormLabel>
                    <Select
                      {...register('cardType', {
                        required: { value: true, message: 'This field is required' },
                        minLength: { value: 4, message: 'Choose card type' }
                      })}
                      isDisabled={switcher}
                      required
                      fontSize='2xs'
                      id='cardtype'
                      defaultValue={'visa'}
                    >
                      <option value={'visa'}>Visa</option>
                      <option value={'mastercard'}>Master Card</option>
                    </Select>
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                      {errors.cardType && errors.cardType.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>
            <Box pt={5} display='flex' justifyContent='flex-end' w='100%'>
              <Flex
                w='100%'
                justifyContent='space-between'
                alignItems={{ base: 'initial', md: 'center' }}
                flexDirection={{ base: 'column', md: 'row' }}
              >
                {/* <Stack
                  h='100%'
                  mt={4}
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Flex alignItems='center'>
                    <Checkbox isDisabled={switcher} iconColor='neutral.white' mr='2'>
                      <Text color='neutral.black' fontSize='2xs'>
                        Save this payment method
                      </Text>
                    </Checkbox>
                  </Flex>
                </Stack> */}
                <Button
                  isLoading={isSubmitting}
                  type='submit'
                  isDisabled={switcher}
                  mt={{ base: '20px', md: '0px' }}
                  w={{ base: '100%', md: 'initial' }}
                  background='neutral.white'
                  fontSize='2xs'
                  fontWeight='bold'
                  variant='solid'
                  color='primary.default'
                  borderWidth='1px'
                  borderColor='primary.default'
                  _hover={{
                    background: 'primary.default',
                    color: 'neutral.white',
                    borderWidth: '1px',
                    borderColor: 'primary.default'
                  }}
                  py={5}
                  me='20px'
                >
                  Add new payment method
                </Button>
              </Flex>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
