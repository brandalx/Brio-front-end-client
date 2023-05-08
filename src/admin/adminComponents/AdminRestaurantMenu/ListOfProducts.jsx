import React from 'react';
import {Box, GridItem, Text, Image} from "@chakra-ui/react";
import theme from "../../../utils/theme";

import DragAndDrop from "../../../assets/svg/DragAndDrop";

export default function ListOfProducts() {
    const array = [{
        id: 1238,
        image: 'https://www.dropbox.com/s/bz1l55joxyk04u1/img.png?dl=0',
        tittle: 'Nigiri set',
        description: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        price: '$16.80',
        ingredients: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        NutritionalValue: 'Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)'
    }, {
        id: 1237,
        image: 'https://www.dropbox.com/s/ypbswarstp3x0j3/sushi.png?dl=0',
        tittle: 'Nigiri set',
        description: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        price: '$16.80',
        ingredients: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        NutritionalValue: 'Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)'
    }, {
        id: 1236,
        image:'https://www.dropbox.com/s/vj6abpgjcnxh6vl/img_2.png?dl=0',
        tittle: 'Nigiri set',
        description: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        price: '$16.80',
        ingredients: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        NutritionalValue: 'Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)'
    }, {
        id: 1235,
        image: 'https://www.dropbox.com/s/l0zr3wvqhffe5f1/img_1.png?dl=0',
        tittle: 'Nigiri set',
        description: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        price: '$16.80',
        ingredients: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        NutritionalValue: 'Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)'
    }]
    return (<GridItem colSpan={8}>
        <Text mb='16px' fontSize='sm' fontWeight={theme.fontWeights.semibold} color='neutral.black'></Text>
        {array.map(item => {
            return (<Box key={item.id}>
                <DragAndDrop/>
                <Box width="400px" height="300px">
                    <Image width='100px' height='100px' size='md' src={item.image}/>

                </Box>
            </Box>)
        })}
    </GridItem>);
}
