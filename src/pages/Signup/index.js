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

import { Link as ReactRouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import { signupResolver } from "../../utils/validator/signupResolver"

const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: signupResolver });

  const onSubmit = ({ email, password }) => {
      console.log(email, password)
      // firebase 
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl marginTop="2" isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter your Password"
              {...register("password")}
            />
            <FormErrorMessage>
            {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt="2" isInvalid={errors.repeat_password}>
            <FormLabel htmlFor="repeat_password">Repeat Password</FormLabel>
            <Input
              type="password"
              name="repeat_password"
              placeholder="Enter your password"
              {...register("repeat_password")}
            />
            <FormErrorMessage>
            {errors.repeat_password && errors.repeat_password.message}
            </FormErrorMessage>
          </FormControl>

          <Button isLoading={isSubmitting} mt={4} colorScheme="messenger" type="submit" w="100%">
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
