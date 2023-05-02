import React from 'react';
import {
  Image,
  Text,
  CardFooter,
  Button,
  CardHeader,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  useColorMode
} from '@chakra-ui/react';
import img1 from '../assets/images/salad.jpg';
export default function Home() {
  // Detecting current color mode and used to set all propely! Should be used evrywhere;
  ///
  const dc = useColorMode().colorMode;
  //example of usage for any props with concat
  // bg={`${dc}.bg`} //
  return (
    <>
      <SimpleGrid bg={`${dc}.bg`} spacing={5} templateColumns='repeat(3, 1fr)' gap={6}>
        <Card>
          <CardHeader>
            <Heading color={`${dc}.primary.default`}>Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Image src={img1} objectFit='contain' />
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
            <Image src={img1} objectFit='contain' />
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
            <Image src={img1} objectFit='contain' />
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </>
  );
}
