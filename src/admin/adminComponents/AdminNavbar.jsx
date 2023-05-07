import React from 'react';

import {
    chakra,
    Text,
    Box,
    Flex,
    useColorModeValue,
    VisuallyHidden,
    HStack,
    Button,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
    Container,
    MenuItem,
    MenuList,
    Menu,
    MenuButton
} from '@chakra-ui/react';

import Logo from '../../assets/svg/logo';
import {Link} from 'react-router-dom';
import Notification from "../../assets/svg/Notification";
import RoyalSushiHouse from "../../assets/svg/RoyalSushiHouse";

export default function AdminNavbar() {
    const bg = useColorModeValue('white', 'gray.800');
    const mobileNav = useDisclosure();

    return (<>
            <Container maxW='full' borderBottom="1px solid #EDEEF2">

                <Container maxW='1110px'>
                    <chakra.header w='full' px={{base: 2, sm: 4}} py={3.5} position='relative'>
                        <Flex alignItems='center' justifyContent='space-between' mx='auto'>
                            <Flex alignItems='center'>
                                <chakra.a h={'52px'} href='/' title='Homepage' display='flex' alignItems='center'>
                                    <Link to='/'>
                                        {' '}
                                        <Logo/>
                                    </Link>
                                    <VisuallyHidden>Brio</VisuallyHidden>
                                </chakra.a>
                                <Link h={'52px'} to='/admin' display='flex' flexDirection='column'>
                                    <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                                        Brio
                                    </Text>
                                    <Text fontSize='3xs' fontWeight='extrabold' color='neutral.gray' ml='2'>
                                        for owners
                                    </Text>
                                </Link>

                            </Flex>
                            <HStack display='flex' alignItems='center' spacing={1}>
                                {/* Deckstop Navbar */}
                                <HStack spacing={5} mr={0} display={{base: 'none', md: 'inline-flex'}}>
                                    <Button p='8px' fontSize='fontSizes.2xs'>
                                        <Link to='/dashboard'>Dashboard</Link>
                                    </Button>
                                    <Button p='8px' fontSize='fontSizes.2xs'>
                                        <Link to='/orders'>Orders</Link>
                                    </Button>
                                    <Button p='8px' fontSize='fontSizes.2xs'>
                                        <Link to='/customers'>Customers</Link>
                                    </Button>
                                    <Button p='8px' fontSize='fontSizes.2xs'>
                                        <Link to='/menu'>Menu</Link>
                                    </Button>
                                    <Button p='8px' fontSize='fontSizes.2xs'>
                                        <Link to='/promotions'>Promotions</Link>
                                    </Button>

                                    <Box ml='13px' mr='12px' h='32px' w='1px' mx='4' bg='neutral.grayLightest'/>
                                    <HStack spacing={6} display={{base: 'none', md: 'inline-flex'}}>

                                        <Button ml='4px' bg="neutral.grayLightest" color='black' px={3} py={6}
                                                borderRadius='16px'
                                                position='relative'>
                                            <Box
                                                position='absolute'
                                                top='-2px'
                                                right='-4px'
                                                bg='primary.default'
                                                h='20px'
                                                w='20px'
                                                borderRadius='8px'
                                                display='flex'
                                                alignItems='center'
                                                justifyContent='center'
                                                fontSize='xs'
                                                fontWeight='semibold'
                                                color='white'
                                                textAlign='center'
                                                minWidth='20px'
                                            >
                                                0
                                            </Box>
                                            <Menu>
                                                <MenuButton as={Button} p='3px' rounded={'full'} variant={'link'}
                                                            cursor={'pointer'}
                                                            minW={0}>
                                                    <Notification/>
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem fontWeight='medium'>Event</MenuItem>
                                                    <MenuItem fontWeight='medium'>Event</MenuItem>
                                                    <MenuItem fontWeight='medium'>Event</MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Button>
                                        <Button py={6} px={1} borderRadius='16px' border='2px solid #EDEEF2' bg='white'>
                                            <Menu>
                                                <MenuButton as={Button} rounded={'full'} variant={'link'}
                                                            cursor={'pointer'} minW={0}>
                                                    <RoyalSushiHouse/>
                                                </MenuButton>
                                            </Menu>
                                        </Button>
                                    </HStack>
                                </HStack>
                                {/* Mobile navbar */}
                                <Box display={{base: 'inline-flex', md: 'none'}}>

                                    <HStack display='flex' alignItems='center' spacing={4}>

                                        <Button ml='4px' bg="neutral.grayLightest" color='black' px={3} py={6}
                                                borderRadius='16px'
                                                position='relative'>
                                            <Box
                                                position='absolute'
                                                top='-2px'
                                                right='-4px'
                                                bg='primary.default'
                                                h='20px'
                                                w='20px'
                                                borderRadius='8px'
                                                display='flex'
                                                alignItems='center'
                                                justifyContent='center'
                                                fontSize='xs'
                                                fontWeight='semibold'
                                                color='white'
                                                textAlign='center'
                                                minWidth='20px'
                                            >
                                                0
                                            </Box>
                                            <Menu>
                                                <MenuButton as={Button} p='3px' rounded={'full'} variant={'link'}
                                                            cursor={'pointer'}
                                                            minW={0}>
                                                    <Notification/>
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem fontWeight='medium'>Event</MenuItem>
                                                    <MenuItem fontWeight='medium'>Event</MenuItem>
                                                    <MenuItem fontWeight='medium'>Event</MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Button>
                                        <Button py={6} px={1} borderRadius='16px' border='2px solid #EDEEF2' bg='white'>
                                            <Menu>
                                                <MenuButton as={Button} rounded={'full'} variant={'link'}
                                                            cursor={'pointer'} minW={0}>
                                                    <RoyalSushiHouse/>
                                                </MenuButton>
                                            </Menu>
                                        </Button>


                                        <Box ml='13px' mr='12px' h='32px' w='1px' mx='4' bg='neutral.grayLightest'/>


                                        <IconButton
                                            display={{base: 'flex', md: 'none'}}
                                            aria-label='Open menu'
                                            fontSize='20px'
                                            color='neutral.gray'
                                            _dark={{color: 'inherit'}}
                                            variant='ghost'
                                            h='48px'
                                            w='48px'
                                            borderRadius='16px'
                                            bg='neutral.grayLightest'
                                            icon={<AiOutlineMenu/>}
                                            onClick={mobileNav.onOpen}
                                        />
                                    </HStack>
                                    <VStack
                                        transition='all 0.2s'
                                        flexDir='column-reverse'
                                        alignItems='start'
                                        pos='absolute'
                                        top={0}
                                        left={0}
                                        right={0}
                                        display={mobileNav.isOpen ? 'flex' : 'none'}
                                        flexDirection='column'
                                        p={2}
                                        pb={4}
                                        m={2}
                                        mt={2}
                                        bg={bg}
                                        spacing={4}
                                        borderRadius='15px'
                                        border='light.neutral.light'
                                        borderWidth={1}
                                        shadow='lg'
                                    >
                                        <Flex w='100%' direction='column' justifyContent='space-between'>
                                            <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                                                <Link to='#'>Orders</Link>
                                            </Button>
                                            <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                                                <Link to='#'>Customers </Link>
                                            </Button>
                                            <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                                                <Link to='#'>Menu</Link>
                                            </Button>
                                            <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                                                <Link to='#'>Promotions</Link>
                                            </Button>
                                            <Button fontWeight='extrabold' fontSize='xs' variant='ghost'>
                                                <Link to='/dashboard'>Dashboard</Link>
                                            </Button>
                                        </Flex>


                                        <Flex w='100%' justifyContent='space-between' px='16px'>
                                            <Flex justifyContent='flex-end'></Flex>
                                            <CloseButton aria-label='Close menu' onClick={mobileNav.onClose}/>
                                        </Flex>
                                    </VStack>
                                </Box>
                            </HStack>
                        </Flex>
                    </chakra.header>
                </Container>
            </Container>
        </>
    );
}
