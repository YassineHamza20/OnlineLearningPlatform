import React, { useRef, useEffect } from 'react';
import { Box, Heading, Flex, Text, HStack } from '@chakra-ui/react';
import FeedbackCard from './FeedbackCard'; // Ensure FeedbackCard is correctly imported

const FeedbackList = ({ feedbacks }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollAmount = 2; // Adjust this value to control the scrolling speed
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0; // Reset scroll to the beginning
        } else {
          scrollContainer.scrollBy({ left: scrollAmount });
        }
      }, 20); // Adjust this value to control the scrolling frequency
    };

    startScrolling();

    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <Box mt={12} position="relative">
     <div className="text-center text-button text-4xl lg:text-5xl mt-24" style={{ fontFamily: 'Holtwood One SC' }}>
       Website Reviews
      </div>
      <Flex overflowX="hidden" pb={10} ref={scrollContainerRef} className="hide-scroll-bar">
        <HStack spacing={4}>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <FeedbackCard key={index} feedback={feedback} />
            ))
          ) : (
            <Text textAlign="center" color="gray.600" w="full">No Reviews found.</Text>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default FeedbackList;
