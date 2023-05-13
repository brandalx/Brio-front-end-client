import {
    Box,
    Button,
    Heading,
    Image,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useMediaQuery
} from '@chakra-ui/react';

import '../../../css/global.css'
export default function ModalRestaurantMenu({isOpen, onOpen, onClose}) {
    const [isLilMob] = useMediaQuery('(max-width: 350px)');

    return (
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
                    bg: 'rgba(0,0,0,0.6)',
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
                <ModalCloseButton/>
                <ModalBody overflow='auto'>
                    <Heading fontSize='sm' fontWeight='semibold' color='neutral.black'>
                        Create meal item
                    </Heading>
                    <Box display='flex' gap={6}>
                        <Box display='flex' flexDirection='column'>
                            <Text mb='6px' fontSize='3xs' color='neutral.grayDark'>
                                Meal image
                            </Text>
                            <Box
                                flexWrap='wrap'
                                position='relative'
                                height='88px'
                                width={isLilMob ? '65px' : '88px'}
                                maxW='88px'
                                maxH='88px'
                            >
                                <Image
                                    width='100%'
                                    height='100%'
                                    borderRadius='20px'
                                    src='https://cdn.pixabay.com/photo/2023/04/26/16/57/flower-7952897_960_720.jpg'
                                    objectFit='cover'
                                    objectPosition='center'
                                />
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            flexDirection={isLilMob ? 'column-reverse' : ''}
                            justifyContent={isLilMob ? 'center' : ''}
                            alignItems='center'
                            gap={6}
                        >
                            <Button
                                _hover={{
                                    background: 'primary.default',
                                    color: 'neutral.white',
                                    borderWidth: '1px',
                                    borderColor: 'primary.default'
                                }}
                                w='84px' h='44px' border='1px' borderColor='primary.default'
                                    color='primary.default'>
                                Change
                            </Button>
                            <Text color='neutral.gray' fontWeight='bold'>
                                Remove
                            </Text>
                        </Box>
                    </Box>
                    <Box gap='32px' display='flex' flexDirection='column'>
                        <Box display='flex' flexDirection='row' gap={3}>
                            <InputGroup mt='20px' display='flex' flexDirection='column'>
                                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                                    Name
                                </Text>
                                <Input color='neutral.gray' fontSize='2xs' type='text' placeholder='Enter meal name'
                                       name='name'/>
                            </InputGroup>
                            <InputGroup mt='20px' display='flex' flexDirection='column'>
                                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                                    Price
                                </Text>
                                <Input color='neutral.gray' fontSize='2xs' placeholder='Enter meal price' type='number'
                                       name='price'/>
                            </InputGroup>
                        </Box>
                        <Box display='flex' flexDirection='row' gap={3}>
                            <InputGroup mt='20px' display='flex' flexDirection='column'>
                                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                                    Description
                                </Text>
                                <Input
                                    color='neutral.gray'
                                    fontSize='2xs'
                                    type='text'
                                    placeholder='Enter meal description'
                                    name='name'
                                />
                            </InputGroup>
                        </Box>
                        <Box display='flex' flexDirection='row' gap={3}>
                            <InputGroup display='flex' flexDirection='column'>
                                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                                    Ingredients
                                </Text>
                                <Input
                                    color='neutral.gray'
                                    fontSize='2xs'
                                    placeholder='Enter meal ingredients'
                                    type='text'
                                    name='name'
                                />
                            </InputGroup>
                            <InputGroup display='flex' flexDirection='column'>
                                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                                    Nutritional value
                                </Text>
                                <Input
                                    color='neutral.gray'
                                    fontSize='2xs'
                                    placeholder='Enter meal nutritional value'
                                    type='number'
                                    name='price'
                                />
                            </InputGroup>
                        </Box>
                    </Box>
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
                        color='primary.default' p='20px' border='1px' borderColor='primary.default'
                        >
                        Publish meal item
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
