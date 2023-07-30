import React, { useState } from 'react';
import { ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
export default function BlogEditor() {
  // const _contentState = ContentState.createFromText('Blog editor of brio!');
  // const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(''); // ContentState JSON
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    console.log(JSON.stringify(contentState, null, 2));
  };

  return (
    <Box p={4} mb={10} border='1px' borderColor='neutral.gray' borderRadius='16px'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Editor
          placeholder='Start typing and create amazing content in Brio!'
          editorStyle={{
            border: '1px solid gray',
            borderRadius: '16px',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '5px',
            paddingBottom: '15px'
          }}
          defaultContentState={contentState}
          onContentStateChange={setContentState}
          wrapperClassName='wrapper-class'
          editorClassName='editor-class grayPlaceholder'
          toolbarClassName='toolbar-class'
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'fontFamily',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'embedded',
              'emoji'
            ],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough']
            }
          }}
        />
        <Button my={2} color='white' bg='primary.default' borderRadius='16px' type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  );
}
