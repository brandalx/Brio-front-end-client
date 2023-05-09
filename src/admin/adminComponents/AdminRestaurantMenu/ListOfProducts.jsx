import React, {useState} from 'react';
import {
    Box,
    GridItem,
    Text,
    Image,
    Heading,
    Divider,
    Button,
    Editable,
    EditablePreview,
    EditableInput
} from "@chakra-ui/react";
import theme from "../../../utils/theme";

import DragAndDrop from "../../../assets/svg/DragAndDrop";
import Pen from "../../../assets/svg/Pen";
import Copy from "../../../assets/svg/Copy";
import TrashBox from "../../../assets/svg/TrashBox";

export default function ListOfProducts() {
    const [description, setDescription] = useState(item.description);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        setIsEditing(false);
        // save the updated description to the server or to the item object
    };
    const array = [{
        id: 1238,
        image: 'https://cdn.pixabay.com/photo/2023/04/26/16/57/flower-7952897_960_720.jpg',
        title: 'Nigiri set',
        description: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        price: '$16.80',
        ingredients: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        nutritionalValue: 'Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)'
    }, {
        id: 1237,
        image: 'https://cdn.pixabay.com/photo/2023/04/26/16/57/flower-7952897_960_720.jpg',
        title: 'Nigiri set',
        description: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        price: '$16.80',
        ingredients: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        nutritionalValue: 'Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)'
    }, {
        id: 1236,
        image: 'https://cdn.pixabay.com/photo/2023/04/26/16/57/flower-7952897_960_720.jpg',
        title: 'Nigiri set',
        description: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        price: '$16.80',
        ingredients: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        nutritionalValue: 'Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)'
    }, {
        id: 1235,
        image: 'https://cdn.pixabay.com/photo/2023/04/26/16/57/flower-7952897_960_720.jpg',
        title: 'Nigiri set',
        description: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        price: '$16.80',
        ingredients: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        nutritionalValue: 'Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)'
    }]
    const [value, setValue] = useState("Initial value");

    return (<GridItem colSpan={8}>
        <Text mb='16px' fontSize='sm' fontWeight={theme.fontWeights.semibold} color='neutral.black'></Text>
        {array.map(item => {
            return (<Box key={item.id} display='flex' mt='30px' borderRadius='16px' p='16px 16px 16px 12px' border='1px'
                         borderColor='neutral.grayLightest' gap='12px'>
                <Box display='flex' alignItems='center'>
                    <Box>
                        <DragAndDrop/>
                    </Box>
                    <Box position="relative" width="100px" height="100px">
                        <Image
                            width="100%"
                            height="100%"
                            borderRadius="20px"
                            src={item.image}
                            objectFit="cover"
                            objectPosition="center"
                        />
                    </Box>
                </Box>

                <Box>
                    <Box display='flex' alignItems='center' gap={4}>
                        <Box alignItems='center'>
                            <Heading fontSize='2xs' lineHeight='24px' fontWeight='bold' color='neutral.black'>
                                {item.title}
                            </Heading>
                            {isEditing ? (
                                <Editable value={description} fontSize='2xs' onChange={setDescription}>
                                    <Box>{description}</Box>
                                </Editable>
                            ) : (
                                <Box fontSize='2xs'>{description}</Box>
                            )}
                        </Box>

                        <Box display='flex' alignItems='center' lineHeight='30px' gap={3}>
                            <Text fontSize='xs' fontWeight='bold' color='neutral.black'>{item.price}</Text>
                            <Box ml='13px' mr='12px' h='20px' w='1px' mx='4' bg='neutral.grayLightest'/>
                            <Button onClick={() => setIsEditing(true)}>
                                <Pen/>
                            </Button>
                            <Copy/>
                            <TrashBox/>
                        </Box>
                    </Box>
                    <Divider mt='20px' mb='16px'/>
                    <Box display='flex' justifyContent='space-between'>
                        <Box>
                            <Heading fontSize='2xs' lineHeight='24px'
                                     fontWeight='bold' color='neutral.black'>Ingredients</Heading>
                            <Text fontSize='13px' color='neutral.grayDark'>{item.ingredients}</Text>
                        </Box>
                        <Box>
                            <Heading fontSize='2xs' lineHeight='24px'
                                     fontWeight='bold'>Nutritional value</Heading>
                            <Text fontSize='13px' color='neutral.grayDark'>{item.nutritionalValue}</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>)
        })}
    </GridItem>);
}
