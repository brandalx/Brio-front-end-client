import React, {useState} from 'react';
import {
    Box,
    Button,
    Divider,
    GridItem,
    Heading,
    Text,
    useMediaQuery,
    useDisclosure
} from '@chakra-ui/react';
import '../../../css/global.css';
import AddPlus from '../../../assets/svg/AddPlus';
import theme from '../../../utils/theme';
import ModalRestaurantMenu from './ModalRestaurantMenu';

export default function CategoryMenu({selectedCategory, onCategoryChange}) {
    const arr = [
        {id: 1, title: 'Breakfast menu', amount: 17},
        {id: 2, title: 'Lunch menu', amount: 27},
        {id: 3, title: 'Dinner menu', amount: 12},
        {id: 4, title: 'Drinks menu', amount: 15}
    ];
    const [isTablet] = useMediaQuery('(max-width: 992px)');
    const [isMobile] = useMediaQuery('(max-width: 576px)');
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [activeButton, setActiveButton] = useState(0);

    const handleCategoryClick = (category) => {
        onCategoryChange(category.title);
        setActiveButton((prevButton) => (prevButton === category.id ? 0 : category.id));
    };

    return (
        <GridItem width="100%" overflow="hidden" colSpan={4}>
            <Text
                mb="16px"
                fontSize="sm"
                fontWeight="semibold"
                color="
neutral.black"
            >
                Category menu
            </Text>
            <Box display="flex" flexWrap="wrap" style={{backfaceVisibility: 'initial'}}>
                {arr.map((element) => {
                    return (
                        <Box
                            display='flex'  flexDirection='column' justifyContent='center'
                            alignItems='start'
                            key={element.id}
                            ml={isMobile ? 0 : isTablet ? '8px' : 0}
                            mr={isMobile ? 0 : isTablet ? '8px' : 0}
                            width={isMobile ? '100%' : isTablet ? '46%' : '100%'}
                            mb="12px"
                            p="10px"
                            border="2px"
                            borderRadius="16px"
                            cursor="pointer"
                            bg={activeButton === element.id ? 'primary.light' : 'white'}
                            borderColor={activeButton === element.id ? theme.colors.primary.default : theme.colors.neutral.grayLightest}
                            _hover={{
                                borderColor: theme.colors.primary.default,
                                transition: '450ms'
                            }}
                            onClick={() => handleCategoryClick(element)}
                            minH="72px"
                        >

                            <Heading fontSize="2xs" fontWeight="bold" color="neutral.black">
                                {element.title}
                            </Heading>
                            <Text fontSize="13px" mt="6px" fontWeight="regular" color="neutral.grayDark">
                                {element.amount}
                            </Text>

                        </Box>

                    );
                })}
            </Box>
            <Divider mt="21px"/>
            <Box width="100%" gap="4" mt="20px" display="flex" justifyContent="space-between">
                <Box
                    width="100%"
                    px="5px"
                    border="1px solid #EDEEF2"
                    borderRadius="16px"
                    display="flex"
                    flexDirection="column"
                >
                    <Button width="100%" display="flex" flexDirection="column" h="70px">
                        <AddPlus/>
                        <Text mt="6px">New category</Text>
                    </Button>
                </Box>
                <Box width="100%" border="1px solid #EDEEF2" borderRadius="16px">
                    <Button onClick={onOpen} width="100%" display="flex" flexDirection="column" h="70px">
                        <AddPlus/>
                        <Text mt="6px">New meal item</Text>
                    </Button>
                </Box>
            </Box>
            <ModalRestaurantMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </GridItem>
    );
}