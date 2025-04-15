import { Box, Spinner, Center, Heading, ScrollView } from 'native-base';
import React from 'react';

/**
 * @function Loading - Used to display a loading message
 * @param {Object} props - The object representing React's props
 * @param {string} props.message - The message string object passed from the parent
 * @returns {Object} - React component object
 */
export default function Loading({ message }: { message: string }) {
  return (
    <ScrollView>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Center alignItems="center" justifyContent={'center'}>
          <Spinner size="lg" />
          <Heading textAlign="center" mt="10" size="lg">
            {message}
          </Heading>
        </Center>
      </Box>
    </ScrollView>
  );
}
