import React from 'react';
import { Box, Flex, Avatar, Heading, Text } from '@chakra-ui/react';

const FeedbackCard = ({ feedback }) => {
  return (
    <Box
      flex="none"
      width="sm" // Set a fixed width
      height="sm" // Set a fixed height
      p={6}
      bg="orange.50"
      shadow="lg"
      rounded="lg"
      m={4}
      style={{ boxShadow: '0 20px 15px -3px rgba(255, 165, 0, 0.3), 0 4px 6px -2px rgba(255, 165, 0, 0.2)' }} // Thicker orange shadow
  
    >
      <Flex alignItems="center" mb={4}>
        <Avatar name={`${feedback.firstname} ${feedback.lastname}`} size="lg" bg="orange.200" />
        <Box ml={4}>
          <Heading as="h3" size="md" color="gray.900">{feedback.firstname} {feedback.lastname}</Heading>
        </Box>
      </Flex>
      <Box height="calc(100% - 56px)"> {/* Adjust the height to fit the text within the card */}
        <Text color="gray.700" lineHeight="tall" noOfLines={10}>{feedback.feedback_text}</Text> {/* Limit number of lines */}
      </Box>
    </Box>
  );
};

export default FeedbackCard;
