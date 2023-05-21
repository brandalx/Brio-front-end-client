import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    useMediaQuery,
    useDisclosure,
} from '@chakra-ui/react';
import AddPlus from '../../../assets/svg/AddPlus';
import { API_URL, handleApiPost, handleApiGet } from '../../../services/apiServices';
import axios from 'axios';

export default function ModalNewCategory({ fetchCategories, setCategories }) {
    const [isLilMob] = useMediaQuery('(max-width: 350px)');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [categoryName, setCategoryName] = useState('');

    const createNewCategory = async (name, items) => {
        const amount = 0;
        return await handleApiPost(API_URL + '/categories', {
            categoryName: name,
            items,
            amount,
        });
    };

    const handlePublishCategory = async () => {
        // Assuming you have an array of new items ID
        const newItemsId = [];

        try {
            const newCategory = await createNewCategory(categoryName, newItemsId);
            // Add the new category to the list of categories
            setCategories((prevCategories) => [
                ...prevCategories,
                { ...newCategory, amount: 0 }, // Add the amount field to the new category
            ]);
            // If successful, close the modal
            onClose();
        } catch (error) {
            console.error('An error occurred while publishing the category:', error);
        }
    };


    return (
        <>
            <Button onClick={onOpen} width="100%" display="flex" flexDirection="column" h="70px">
                <AddPlus />
                <Text mt="6px">New category</Text>
            </Button>

            <Modal size={isLilMob ? 'full' : 'xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} zIndex="9999999">
                <ModalOverlay />
                <ModalContent position="relative" boxSizing="content-box" width={['100%', '100%', '100%', '540px']} maxW="96%" maxH="568px">
                    <ModalCloseButton />
                    <ModalBody overflow="auto">
                        <Heading fontSize="sm" fontWeight="semibold" color="neutral.black">
                            Create new category
                        </Heading>
                        <Box gap="32px" display="flex" flexDirection="column">
                            <Box display="flex" flexDirection="row" gap={3}>
                                <InputGroup mt="20px" display="flex" flexDirection="column">
                                    <Text fontSize="3xs" fontWeight="semibold" color="neutral.black">
                                        Category name
                                    </Text>
                                    <Input
                                        color="neutral.gray"
                                        fontSize="2xs"
                                        type="text"
                                        placeholder="Enter category name"
                                        name="categoryName"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                    />
                                </InputGroup>
                            </Box>
                        </Box>
                    </ModalBody>
                    <ModalFooter display="flex" justifyContent={isLilMob ? 'center' : 'end'}>
                        <Button
                            p="20px"
                            h="20px"
                            border="1px"
                            borderColor="neutral.gray"
                            color="neutral.gray"
                            colorScheme="blue"
                            mr={3}
                            onClick={() => onClose()}
                            _hover={{
                                background: 'error.default',
                                color: 'neutral.white',
                                borderWidth: '1px',
                                borderColor: 'error.default',
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            _hover={{
                                background: 'primary.default',
                                color: 'neutral.white',
                                borderWidth: '1px',
                                borderColor: 'primary.default',
                            }}
                            color="primary.default"
                            p="20px"
                            border="1px"
                            borderColor="primary.default"
                            onClick={handlePublishCategory}
                        >
                            Publish new category
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}


