import React, { useEffect, useState } from 'react';
import { API_URL, handleApiGet } from '../../services/apiServices';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

export default function Blog() {
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState([]);

  const params = useParams();
  const handleBlogApi = async () => {
    const url = API_URL + '/blogs/blog/single/' + params['id'];
    try {
      const data = await handleApiGet(url);

      setArr(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleBlogApi();
  }, []);
  return (
    <Box>
      <Box>blog info</Box>
    </Box>
  );
}
