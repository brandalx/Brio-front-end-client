import {
    Box,
    GridItem,
    Text,
    Image,
    Heading,
    Divider,
    Button,
    useBreakpointValue,
    useMediaQuery
} from '@chakra-ui/react';
import theme from '../../../utils/theme';
import {arrayProducts} from '../../adminJSON/adminListOfProducts';
import DragAndDrop from '../../../assets/svg/DragAndDrop';
import Pen from '../../../assets/svg/Pen';
import Copy from '../../../assets/svg/Copy';
import TrashBox from '../../../assets/svg/TrashBox';
import {useState} from "react";

export default function ListOfProducts() {
    const gridColumns = useBreakpointValue({base: '1fr', md: '1fr 4fr'});
    const [isMobile] = useMediaQuery('(max-width: 576px)');
    const [isTablet] = useMediaQuery('(max-width: 767px)');
    const [isDek] = useMediaQuery('(min-width: 768px)');



    return (
        <GridItem colSpan={8}>
            <Text mb='16px' fontSize='sm' fontWeight={theme.fontWeights.semibold} color='neutral.black'></Text>
            {arrayProducts.map((item) => {
                return (
                    <Box
                        key={item.id}
                        display='flex'
                        flexDirection={isTablet ? 'column' : 'row'}
                        mt='30px'
                        flexWrap='wrap'
                        borderRadius='16px'
                        p={isTablet ? '8px' : '16px 16px 16px 12px'}
                        border='1px'
                        borderColor='neutral.grayLightest'
                        gap='12px'
                        gridTemplateColumns={gridColumns}
                    >
                        <Box
                            gap={3}
                            display='flex'
                            flexDirection={isTablet ? 'row' : 'row'}
                            alignItems='center'
                            mb={['16px', '16px', 0]}
                        >
                            {/*<Box>*/}
                            {/*    <DragAndDrop/>*/}
                            {/*</Box>*/}
                            <Box
                                flexWrap='wrap'
                                position='relative'
                                width={isMobile ? '200px' : '100px'}
                                height='72px'
                                maxW='72px'
                                maxH='72px'
                            >
                                <Image
                                    width='100%'
                                    height='100%'
                                    borderRadius='20px'
                                    src={item.image}
                                    objectFit='cover'
                                    objectPosition='center'
                                />
                            </Box>
                            <Box flexDirection={isMobile ? 'column' : 'row'} display='flex' ml={[3, 3, 0]}
                                 alignItems='center'>
                                <Box display='flex' alignItems='start' flexDirection='column'>
                                    <Heading fontSize='2xs' lineHeight='24px' fontWeight='bold' color='neutral.black'>
                                        {item.title}
                                    </Heading>
                                    <Box fontSize='2xs'>{item.description}</Box>
                                </Box>
                                {isDek && (
                                    <Box alignItems='center' justifyContent='center' display='flex' gap={3}>
                                        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                                            {item.price}
                                        </Text>
                                        <Box ml='13px' mr='12px' h='20px' w='1px' mx='4' bg='neutral.grayLightest'/>
                                        <Button>
                                            <Pen/>
                                        </Button>
                                        <Copy/>
                                        <TrashBox/>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        {isTablet && (
                            <Box alignItems='center' justifyContent='center' display='flex' gap={3}>
                                <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                                    {item.price}
                                </Text>
                                <Box ml='13px' mr='12px' h='20px' w='1px' mx='4' bg='neutral.grayLightest'/>
                                <Button>
                                    <Pen/>
                                </Button>
                                <Copy/>
                                <TrashBox/>
                            </Box>
                        )}

                        <Box display={isMobile ? 'flex' : 'block'} flexDirection='column'>
                            <Box
                                display='flex'
                                flexDirection={isMobile ? 'column' : isTablet ? 'row' : 'column'}
                                alignItems='center'
                                justifyContent='space-around'
                                gap={4}
                                flexWrap='wrap'
                            ></Box>
                            <Divider mt='20px' mb='16px'/>

                            <Box
                                display='flex'
                                flexDirection={isMobile ? 'row' : isTablet ? 'row' : 'row'}
                                justifyContent='space-between'
                            >
                                <Box mb={['16px', '16px', 0]}>
                                    <Heading fontSize='2xs' lineHeight='24px' fontWeight='bold' color='neutral.black'>
                                        Ingredients
                                    </Heading>
                                    <Text fontSize='13px' color='neutral.grayDark'>
                                        {item.ingredients}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading fontSize='' lineHeight='24px' fontWeight='bold'>
                                        Nutritional value
                                    </Heading>
                                    <Text fontSize='13px' color='neutral.grayDark'>
                                        {item.nutritionalValue}
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                );
            })}
        </GridItem>
    );
}