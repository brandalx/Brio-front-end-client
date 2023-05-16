import React from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useMediaQuery
} from "@chakra-ui/react";

export default function ModalTextRedactor({ isOpen, onOpen, onClose, item }) {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [isLilMob] = useMediaQuery('(max-width: 350px)');

    return (
        <>
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
                        bg: 'rgba(0,0,0,0.2)',
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
                    <ModalHeader>Edit {item.title}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody overflow='auto' pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                placeholder="Title"
                            />
                            <FormLabel mt="15px">Description</FormLabel>
                            <Input
                                placeholder="Description"
                            />
                            <FormLabel mt="15px">Ingredients</FormLabel>
                            <Input placeholder="Ingredients"/>
                            <FormLabel mt="15px">Price</FormLabel>
                            <Input placeholder="Price"/>
                            <FormLabel mt="15px">Nutritional value</FormLabel>
                            <Input placeholder="Nutritional value"/>
                        </FormControl>
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
                            _hover={{
                                background: 'error.default',
                                color: 'neutral.white',
                                borderWidth: '1px',
                                borderColor: 'error.default'
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            _hover={{
                                background: 'primary.default',
                                color: 'neutral.white',
                                borderWidth: '1px',
                                borderColor: 'primary.default'
                            }}
                            color='primary.default'
                            p='20px'
                            border='1px'
                            borderColor='primary.default'
                            onClick={onClose}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
