import { Menu, Box, Text, GridItem, Grid } from '@chakra-ui/react';

import React, { useCallback, useEffect, useState } from 'react';

export default function PickersCategory({
  categories,
  SetCategories,
  setActiveCategory,
  activeCategory,
  picked,
  setIsPicked
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (activeCategory.length === 0 || activeCategory[0] === null) {
      setIsPicked(false);
    }
    if (activeCategory.length > 0) {
      setIsPicked(true);
    }
    console.log(picked);
  }, [activeCategory]);
  const handleClick = useCallback(
    (categoryIndex) => {
      setIsPressed(!isPressed);
      // udspdate the picked state for the clicked category
      const updatedCategories = categories.map((category, index) => {
        if (index === categoryIndex) {
          const updatedCategory = {
            ...category,
            picked: !category.picked
          };
          if (!updatedCategory.picked) {
            // remove the unpicked category from activeCategory array
            setActiveCategory(activeCategory.filter((cat) => cat !== category));
          } else {
            setActiveCategory([...activeCategory, updatedCategory]);
          }
          return updatedCategory;
        }
        return category;
      });
      SetCategories(updatedCategories);
    },
    [isPressed, categories, SetCategories, setActiveCategory, activeCategory]
  );
  return (
    <div>
      <Box>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 1fr ' }} gap={2}>
          {categories &&
            categories.map((item, index) => {
              const bgColor = item.picked ? 'primary.light' : isHovered ? 'primary.lightest' : 'neutral.white';
              const borderColor = item.picked
                ? 'primary.default'
                : isHovered
                ? 'neutral.white'
                : 'neutral.grayLightest';
              const borderWidth = '2px';
              const textColor = item.picked
                ? 'primary.default'
                : !isHovered && localStorage.getItem('colormode') !== 'dark'
                ? 'neutral.black'
                : isHovered && localStorage.getItem('colormode') !== 'dark'
                ? 'neutral.black'
                : isHovered && localStorage.getItem('colormode') === 'light'
                ? 'neutral.white'
                : !isHovered
                ? 'neutral.black'
                : 'neutral.white';

              return (
                <GridItem
                  key={index}
                  fontWeight='bold'
                  cursor='pointer'
                  w='100%'
                  h='auto'
                  borderRadius={16}
                  bg={bgColor}
                  borderColor={borderColor}
                  borderWidth={borderWidth}
                  p={2}
                  background='neutral.white'
                  transition='all 0.3s'
                  _hover={{ cursor: 'pointer', background: 'primary.lightest', transition: 'all 0.3s' }}
                  onClick={() => handleClick(index)} // Pass the category index to handleClick
                >
                  <Box textAlign='center'>
                    <Text color={textColor}>{item.categoryName}</Text>
                  </Box>
                </GridItem>
              );
            })}
        </Grid>
      </Box>
    </div>
  );
}
