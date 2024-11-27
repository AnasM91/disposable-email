import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  Text,
  useClipboard,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react';

const DOMAIN = 'disposable.mail';

const EmailGenerator = ({ onEmailChange, currentEmail }) => {
  const [prefix, setPrefix] = useState('');
  const toast = useToast();
  const fullEmail = prefix ? `${prefix}@${DOMAIN}` : '';
  const { hasCopied, onCopy } = useClipboard(fullEmail);

  const handlePrefixChange = (e) => {
    const input = e.target.value;
    // Extract prefix whether user enters full email or just prefix
    const newPrefix = input.includes('@') ? input.split('@')[0] : input;
    setPrefix(newPrefix);
    onEmailChange(newPrefix ? `${newPrefix}@${DOMAIN}` : '');
  };

  const handleCopy = () => {
    onCopy();
    toast({
      title: 'Email copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <InputGroup size="lg">
        <InputLeftAddon children="@" bg="blue.50" />
        <Input
          placeholder="Enter email prefix"
          value={prefix}
          onChange={handlePrefixChange}
          _focus={{
            borderColor: 'blue.400',
            boxShadow: '0 0 0 1px blue.400',
          }}
        />
      </InputGroup>

      {prefix && (
        <VStack spacing={2} align="stretch">
          <Text fontSize="sm" color="gray.600">
            Your temporary email:
          </Text>
          <HStack>
            <Input
              value={fullEmail}
              isReadOnly
              bg="gray.50"
              fontSize="sm"
            />
            <Button
              onClick={handleCopy}
              colorScheme="blue"
              size="md"
              w="100px"
            >
              {hasCopied ? 'Copied!' : 'Copy'}
            </Button>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};

export default EmailGenerator;
