import { Menu, Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function PickersCategory({
  categories,
  SetCategories,
  setActiveCategory,
  activeCategory,
  picked,
  setIsPicked
}) {
  return (
    <div>
      <Box>
        {categories.length > 0 &&
          categories.map((item, index) => {
            return <Text key={index}>{item.categoryName}</Text>;
          })}
      </Box>
    </div>
  );
}
