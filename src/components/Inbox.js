import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  List,
  ListItem,
  useToast,
  Divider
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const socket = io(process.env.REACT_APP_WS_URL || 'http://localhost:5001', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket', 'polling']
});

function Inbox({ emailPrefix }) {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const toast = useToast();

    useEffect(() => {
        // Socket connection status
        socket.on('connect', () => {
            setIsConnected(true);
            toast({
                title: "Connected to server",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setIsConnected(false);
            toast({
                title: "Connection error",
                description: "Unable to connect to the server. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
        };
    }, [toast]);

    useEffect(() => {
        if (!emailPrefix) return;

        console.log('Loading emails for prefix:', emailPrefix);

        // Fetch initial emails
        const fetchEmails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/emails/${emailPrefix}`);
                console.log('Fetched emails:', response.data);
                setEmails(response.data);
            } catch (error) {
                console.error('Error fetching emails:', error);
                toast({
                    title: "Error fetching emails",
                    description: error.response?.status === 511 ? "Network authentication required. Please try again later." : "Failed to fetch emails",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };
        fetchEmails();

        // Subscribe to email prefix
        socket.emit('subscribe', emailPrefix);

        // Handle new emails
        socket.on('newEmail', (newEmail) => {
            console.log('Received new email:', newEmail);
            setEmails(prevEmails => [newEmail, ...prevEmails]);
            toast({
                title: "New email received",
                status: "info",
                duration: 3000,
                isClosable: true,
            });
        });

        return () => {
            socket.emit('unsubscribe', emailPrefix);
            socket.off('newEmail');
        };
    }, [emailPrefix, toast]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/emails/${id}`);
            setEmails(prevEmails => prevEmails.filter(email => email.id !== id));
            if (selectedEmail && selectedEmail.id === id) {
                setSelectedEmail(null);
            }
            toast({
                title: "Email deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting email:', error);
            toast({
                title: "Error deleting email",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <HStack align="stretch" spacing={4} h="100%">
            {/* Email List */}
            <Box w="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <List spacing={0}>
                    {emails.map((email) => (
                        <ListItem
                            key={email.id}
                            p={3}
                            cursor="pointer"
                            bg={selectedEmail?.id === email.id ? "gray.100" : "white"}
                            _hover={{ bg: "gray.50" }}
                            onClick={() => setSelectedEmail(email)}
                        >
                            <HStack justify="space-between">
                                <VStack align="start" flex={1}>
                                    <Text fontWeight="bold" noOfLines={1}>
                                        {email.fromAddress}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" noOfLines={1}>
                                        {email.subject || '(No subject)'}
                                    </Text>
                                </VStack>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    size="sm"
                                    variant="ghost"
                                    colorScheme="red"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(email.id);
                                    }}
                                />
                            </HStack>
                        </ListItem>
                    ))}
                    {emails.length === 0 && (
                        <ListItem p={4}>
                            <Text color="gray.500" textAlign="center">
                                No emails yet
                            </Text>
                        </ListItem>
                    )}
                </List>
            </Box>

            {/* Email Content */}
            <Box flex={1} borderWidth="1px" borderRadius="lg" p={4}>
                {selectedEmail ? (
                    <VStack spacing={4} align="stretch" width="100%">
                        {/* Email Header */}
                        <Box 
                            p={4} 
                            bg="white" 
                            borderRadius="md" 
                            boxShadow="sm"
                        >
                            <Text fontSize="sm" color="gray.500" mb={1}>
                                From: {selectedEmail.fromAddress}
                            </Text>
                            <Text fontSize="xl" fontWeight="bold" mb={2}>
                                {selectedEmail.subject}
                            </Text>
                        </Box>

                        {/* Email Content */}
                        <Box 
                            p={6} 
                            bg="white" 
                            borderRadius="md" 
                            boxShadow="sm"
                            className="email-content"
                        >
                            <Box 
                                dangerouslySetInnerHTML={{ __html: selectedEmail.body }} 
                                sx={{
                                    'img, svg': {
                                        display: 'inline-block',
                                        maxWidth: '100%',
                                        height: 'auto',
                                        border: '1px solid #eee',
                                        borderRadius: '4px',
                                        padding: '4px',
                                        margin: '8px 0',
                                        backgroundColor: 'white'
                                    },
                                    'h1, h2, h3, h4, h5, h6': {
                                        lineHeight: '1.2',
                                        margin: '1em 0 0.5em'
                                    },
                                    'p': { margin: '0.5em 0' },
                                    'ul, ol': { margin: '0.5em 0 0.5em 1.5em' },
                                    'a': {
                                        color: 'blue.500',
                                        textDecoration: 'underline'
                                    }
                                }}
                            />
                        </Box>
                    </VStack>
                ) : (
                    <Text color="gray.500">Select an email to view its contents</Text>
                )}
            </Box>
        </HStack>
    );
}

export default Inbox;
