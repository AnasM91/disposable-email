import React from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react';
import EmailGenerator from './components/EmailGenerator';
import Inbox from './components/Inbox';
import { useState } from 'react';

function App() {
  const [currentEmail, setCurrentEmail] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Extract email prefix from the full email address
  const getEmailPrefix = (email) => {
    return email.split('@')[0] || '';
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg={bgColor} py={5}>
        <Container maxW="container.xl">
          {/* Header Section */}
          <VStack spacing={2} mb={8} textAlign="center">
            <Heading size="xl" color="blue.500">
              Disposable Email
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Get instant access to temporary email addresses
            </Text>
          </VStack>

          {/* Main Content Grid */}
          <Grid
            templateColumns={{ base: "1fr", md: "300px 1fr" }}
            gap={6}
          >
            {/* Left Sidebar */}
            <GridItem>
              <Box
                bg="white"
                p={6}
                rounded="lg"
                shadow="md"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <VStack spacing={4} align="stretch">
                  <Heading size="md" mb={2}>
                    Email Generator
                  </Heading>
                  <EmailGenerator
                    onEmailChange={setCurrentEmail}
                    currentEmail={currentEmail}
                  />
                  {/* Instructions */}
                  <Box mt={4}>
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
                      How it works:
                    </Text>
                    <VStack spacing={2} align="stretch" mt={2} fontSize="sm" color="gray.600">
                      <Text>1. Enter any prefix for your email</Text>
                      <Text>2. Your address will be prefix@disposable.mail</Text>
                      <Text>3. Emails arrive instantly in your inbox below</Text>
                    </VStack>
                  </Box>
                </VStack>
              </Box>
            </GridItem>

            {/* Main Content Area */}
            <GridItem>
              <Box
                bg="white"
                p={6}
                rounded="lg"
                shadow="md"
                borderWidth="1px"
                borderColor={borderColor}
                minH="600px"
              >
                <Inbox emailPrefix={getEmailPrefix(currentEmail)} />
              </Box>
            </GridItem>
          </Grid>

          {/* Footer */}
          <Box mt={10} pt={6} borderTop="1px" borderColor={borderColor}>
            <Text textAlign="center" color="gray.600" fontSize="sm">
              2023 Disposable Email. All rights reserved.
            </Text>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
