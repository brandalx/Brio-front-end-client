import React, { useEffect, useState } from 'react';
import { API_URL, handleApiGet } from '../../services/apiServices';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

export default function Blog() {
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const handleBlogApi = async () => {
    try {
      console.log(params['id']);
      const url = API_URL + '/blogs/' + params['id'];
      console.log(url);

      const data = await handleApiGet(url);

      setArr([data]);
      console.log(arr);
      setLoading(false);
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
      {!loading &&
        arr.map((item, index) => {
          return <Box key={index}>{item.title}d</Box>;
        })}
    </Box>
  );
}
