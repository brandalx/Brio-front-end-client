import React, { useState } from 'react';
import { ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
export default function BlogEditor() {
  const _contentState = ContentState.createFromText('Blog editor of brio!');
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw); // ContentState JSON
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    console.log(JSON.stringify(contentState, null, 2));
  };

  return (
    <Box py='300px' height='100px'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Editor
          defaultContentState={contentState}
          onContentStateChange={setContentState}
          wrapperClassName='wrapper-class'
          editorClassName='editor-class'
          toolbarClassName='toolbar-class'
        />
        <Button color='white' bg='primary.default' borderRadius='16px' type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  );
}
