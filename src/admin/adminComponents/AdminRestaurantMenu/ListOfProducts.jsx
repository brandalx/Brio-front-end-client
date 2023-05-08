import React from 'react';
import {Box, GridItem, Text, Image} from "@chakra-ui/react";
import theme from "../../../utils/theme";

import DragAndDrop from "../../../assets/svg/DragAndDrop";

export default function ListOfProducts() {
    const array = [{
        id: 1238,
        image: 'https://previews.dropbox.com/p/thumb/AB5YXxpVx6JyuXxkLhLBqTmwHUG6Fq1z3cSkQOSG2ZgMapF0NDjTL9vwZThsjVdy3am-IBHC6WFNaVVjqwEJStjgHVzGsnXiazwzSjwRu2nt5ZhWm_r1iPfBfoIOlZyYvb6U7MgTCDSXLH8985JDu0BA-wedROEg9BuUd0F8dQR84Q4Kh68aSg_IYpE_R5EC0E0LQRe1GVK0EgnWIW4EWX9jYZtbFvOIQ5UJvia_tRQsccHZP7SZ18hY0_N6MD2JXy4HpgxE2dU20Wdb1Wvoz4LxJWFUOScLJbKhod_Kul2j98iHAtCO1WsYLuOX2ZpFo_MTb809pstxdvd1gMRJk_Owcq54KtI61h4b_27ba64xyPOXozarRYE7dZEW6xVXrnQ/p.png',
        tittle: 'Nigiri set',
        description: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        price: '$16.80',
        ingredients: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        NutritionalValue: 'Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)'
    }, {
        id: 1237,
        image: 'https://previews.dropbox.com/p/thumb/AB4-wFwiztniyCZehlEbOOD5nJDkF0AcNue6i094GXF7nsrIodmORU7AL2RvzUq3j7PeL4OmZnIfzULQZybNv9wKwR2DFBxtMyo5SbNUgAmhZTwe95gjddFl7OelHxk2Y6xgQYBRwnZlHAWoyRyhqADfgBcuW22BX_CV8-PVLFX_XE_HKdvVqSbzIjxadIS40tYcByTmORdUfZTHPWBXZT_Lh0dqZsauCyPWi1KTxKv7PvFRCc8n_G7Ccfc1fsgV1E8lNN5NEAaZU5Gx-o6tJtlYwxRUONsgpDppc3tRQdQEJZi3gSybtwjtzz2f72O0WlIm8KVAQ86FoANHH1Gb6ONbgFWGA5VARwTn7teX5dLXPY7bVzR2zIepH4_JwUYQ5bE/p.png',
        tittle: 'Nigiri set',
        description: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        price: '$16.80',
        ingredients: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
        NutritionalValue: 'Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)'
    }, {
        id: 1236,
        image: 'https://previews.dropbox.com/p/thumb/AB7oM6aZinhjLaWzmN8qi_Qy-YnOahWs3GZjjTrGWFRXdFFaaHxKCFMHd6YX863MnjVVPcC71bxkMfKHz9pJyeQluDQy56xwqn1A2W-UQOxM9BOWZIlMFVBBH-K50y6dTyvecsc-Y7BhWS4sVWGl9tRjPJZ4W6YlngJHTVKusTu-30VUXbL2rrzY_i5FDNZ-OgA8_cK0kfSbtNClVrdvdHOKazSkyWsko23_HytVKj0gJFQAPXE-6YINxl-85inwRnpX0h4su7JAlsNVUgFyBcPS0ISGb_Mmx4dunuMW2Dag6b7Qz-viIAmnN1MacTMiNvyy4U8aAPQw6zyZBeaupGJimmqaxEi7PRUwujRRjhwpCPqh81nqv7NSh4CKWb86j58/p.png',
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
    }, {
        id: 1234,
        image: 'https://www.dropbox.com/s/bz1l55joxyk04u1/img.png?dl=0',
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
