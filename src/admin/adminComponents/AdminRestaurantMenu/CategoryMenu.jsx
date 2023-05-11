import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Divider,
    GridItem,
    Heading,
    Text,
    useMediaQuery,
    Modal,
    ModalOverlay,
    InputGroup,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Image,
    InputLeftAddon,
    Input,
    useDisclosure
} from '@chakra-ui/react';
import '../../../css/global.css';
import AddPlus from '../../../assets/svg/AddPlus';
import theme from '../../../utils/theme';

export default function CategoryMenu({selectedCategory}) {
    const arr = [
        {id: 1, title: 'Breakfast menu', amount: 17},
        {id: 2, title: 'Lunch menu', amount: 27},
        {
            id: 3,
            title: 'Dinner menu',
            amount: 12
        },
        {id: 4, title: 'Drinks menu', amount: 15}
    ];



    const [isTablet] = useMediaQuery('(max-width: 992px)');
    const [isMobile] = useMediaQuery('(max-width: 576px)');
    const [isLilMob] = useMediaQuery('(max-width: 350px)');

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <GridItem width='100%' overflow='hidden' colSpan={4}>
            <Text mb='16px' fontSize='sm' fontWeight={theme.fontWeights.semibold} color='neutral.black'>
                Category menu
            </Text>
            <Box display='flex' flexWrap='wrap'>
                {arr.map((element) => {
                    return (
                        <Box
                            ml={isMobile ? 0 : isTablet ? '8px' : 0}
                            mr={isMobile ? 0 : isTablet ? '8px' : 0}
                            key={element.id}
                            width={isMobile ? '100%' : isTablet ? '46%' : '100%'}
                            mb='12px'
                            p='10px'
                            border='1px solid #EDEEF2'
                            borderRadius='16px'
                        >
                            <Heading fontSize='2xs' fontWeight={theme.fontWeights.bold}
                                     color={theme.colors.neutral.black}>
                                {element.title}
                            </Heading>
                            <Text fontSize='13px' mt='6px' fontWeight='extrabold' color='neutral.grayDark'>
                                {element.amount}
                            </Text>
                        </Box>
                    );
                })}
            </Box>
            <Divider mt='21px'/>
            <Box width='100%' gap='4' mt='20px' display='flex' justifyContent='space-between'>
                <Box width='100%' px='5px' border='1px solid #EDEEF2' borderRadius='16px' display='flex'
                     flexDirection='column'>
                    <Button width='100%' display='flex' flexDirection='column' h='70px'>
                        <AddPlus/>
                        <Text mt='6px'>New category</Text>
                    </Button>
                </Box>
                <Box width='100%' border='1px solid #EDEEF2' borderRadius='16px'>
                    <Button onClick={onOpen} width='100%' display='flex' flexDirection='column' h='70px'>
                        <AddPlus/>
                        <Text mt='6px'>New meal item</Text>
                    </Button>
                </Box>
            </Box>
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
                    <ModalHeader fontSize='sm'>{selectedCategory?.title}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody overflow='auto'>
                        <Heading fontSize='sm' fontWeight='semibold' color='neutral.black'>
                            Create meal item
                        </Heading>
                        <Box display='flex' gap={6}>
                            <Box display='flex' flexDirection='column'>
                                <Text mb='6px' fontSize='3xs' color='neutral.grayDark'>Meal image</Text>
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
                                <Button w='84px' h='44px' border='1px' borderColor='primary.default'
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
                                    <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>Name</Text>
                                    <Input color='neutral.gray' fontSize='2xs' type='text' placeholder='Enter meal name'
                                           name='name'/>
                                </InputGroup>
                                <InputGroup mt='20px' display='flex' flexDirection='column'>
                                    <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>Price</Text>
                                    <Input color='neutral.gray' fontSize='2xs' placeholder='Enter meal price'
                                           type='number' name='price'/>
                                </InputGroup>
                            </Box>
                            <Box display='flex' flexDirection='row' gap={3}>
                                <InputGroup mt='20px' display='flex' flexDirection='column'>
                                    <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>Description</Text>
                                    <Input color='neutral.gray' fontSize='2xs' type='text'
                                           placeholder='Enter meal description' name='name'/>
                                </InputGroup>
                            </Box>
                            <Box display='flex' flexDirection='row' gap={3}>
                                <InputGroup display='flex' flexDirection='column'>
                                    <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>Ingredients</Text>
                                    <Input color='neutral.gray' fontSize='2xs' placeholder='Enter meal ingredients'
                                           type='text' name='name'/>
                                </InputGroup>
                                <InputGroup display='flex' flexDirection='column'>
                                    <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>Nutritional
                                        value</Text>
                                    <Input color='neutral.gray' fontSize='2xs'
                                           placeholder='Enter meal nutritional value' type='number' name='price'/>
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
                        >
                            Cancel
                        </Button>
                        <Button p='20px' border='1px' borderColor='primary.default' color='primary.default'>
                            Publish meal item
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </GridItem>
    );
}
