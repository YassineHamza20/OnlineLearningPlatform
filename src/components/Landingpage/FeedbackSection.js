import React from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import FeedbackList from './FeedbackList'; // Ensure FeedbackList is correctly imported

const FeedbackSection = ({ feedbackData }) => (
  <ChakraProvider>
    <Container maxW="container.xl" textAlign="center" py={8}>
      <FeedbackList feedbacks={feedbackData} />
    </Container>
  </ChakraProvider>
);

export default FeedbackSection;
