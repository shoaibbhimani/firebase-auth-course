import { Box } from "@chakra-ui/layout";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom"


const Signup = () => {
  return (
    <Box
      width="100%"
      minH="100vh"
      background="gray.200"
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="30%" shadow="lg" background="white" p={12} rounded={6}>
        <form onSubmit={() => {}}>
          <FormControl isInvalid={false}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" name="email" placeholder="Enter your email" />
            <FormErrorMessage> Please Enter email correctly </FormErrorMessage>
          </FormControl>

          <FormControl marginTop="2" isInvalid={false}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter your Password"
            />
            <FormErrorMessage>
              {" "}
              Please Enter password correctly{" "}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt="2" isInvalid={false}>
            <FormLabel htmlFor="repeat_password">Repeat Password</FormLabel>
            <Input
              type="password"
              name="repeat_password"
              placeholder="Enter your password"
            />
            <FormErrorMessage>
              {" "}
              Please Enter Password correctly{" "}
            </FormErrorMessage>
          </FormControl>

          <Button mt={4} colorScheme="messenger" type="submit" w="100%">
            Sign up
          </Button>

          <Text textAlign="center" p="2" size="xs">
            <Link as={ReactRouterLink} color="gray.500" to="/login">
              Already registered?
            </Link>
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
