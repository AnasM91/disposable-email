import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Box,
    VStack,
    HStack,
    Text,
    IconButton,
    List,
    ListItem,
    useToast,
    Badge,
    Heading
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { formatDistanceToNow } from 'date-fns';

function Inbox({ emailPrefix }) {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();

    // Function to fetch emails - wrapped in useCallback
    const fetchEmails = useCallback(async () => {
        if (!emailPrefix) return;
        
        setLoading(true);
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/emails/${emailPrefix}`;
            console.log('Fetching from:', apiUrl);
            const response = await axios.get(apiUrl);
            console.log('Fetched emails:', response.data);
            setEmails(response.data || []);
            setError(null);
        } catch (error) {
            console.error('Error fetching emails:', error);
            toast({
                title: 'Error fetching emails',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    }, [emailPrefix, toast]);

    // Set up polling
    useEffect(() => {
        if (!emailPrefix) return;

        // Initial fetch
        fetchEmails();

        // Set up polling interval
        const intervalId = setInterval(fetchEmails, 10000);

        // Cleanup
        return () => clearInterval(intervalId);
    }, [emailPrefix, fetchEmails]);

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
    };

    const formatTimeAgo = (date) => {
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Unknown time';
        }
    };

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg">
            <VStack spacing={4} align="stretch">
                <Box>
                    <Heading size="md" mb={2}>Inbox for: {emailPrefix}</Heading>
                    <Text fontSize="sm" color="gray.500">
                        Refreshes automatically every 10 seconds
                    </Text>
                </Box>

                {emails.length === 0 ? (
                    <Text color="gray.500">No emails yet. Waiting for new messages...</Text>
                ) : (
                    <List spacing={3}>
                        {emails.map((email) => (
                            <ListItem 
                                key={email.id}
                                p={3}
                                borderWidth="1px"
                                borderRadius="md"
                                cursor="pointer"
                                onClick={() => handleEmailClick(email)}
                                bg={selectedEmail?.id === email.id ? "gray.50" : "white"}
                                _hover={{ bg: "gray.50" }}
                            >
                                <VStack align="stretch" spacing={2}>
                                    <HStack justify="space-between">
                                        <Text fontWeight="bold" color="blue.600">
                                            From: {email.fromAddress}
                                        </Text>
                                        <Badge colorScheme="green">
                                            {formatTimeAgo(email.receivedAt)}
                                        </Badge>
                                    </HStack>
                                    <Text fontWeight="medium">{email.subject}</Text>
                                    {selectedEmail?.id === email.id && (
                                        <Box 
                                            mt={2} 
                                            p={3} 
                                            borderWidth="1px" 
                                            borderRadius="md"
                                            dangerouslySetInnerHTML={{ __html: email.body }}
                                        />
                                    )}
                                </VStack>
                            </ListItem>
                        ))}
                    </List>
                )}
            </VStack>
        </Box>
    );
}

export default Inbox;
