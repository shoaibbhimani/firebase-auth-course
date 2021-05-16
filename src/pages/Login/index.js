import { useContext, useEffect } from "react";
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
import { useHistory } from "react-router-dom";

import { loginResolver } from "../../utils/validator/loginResolver";
import { auth } from "../../utils/firebase";
import { AuthContext } from "../../components/Authentication/AuthProvider";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ resolver: loginResolver });

  const history = useHistory();

  const { user } = useContext(AuthContext);

  const onSubmit = ({ email, password }) => {
    clearErrors("API_ERROR");
    auth
        .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setError("API_ERROR", {
          message: "Email or Password would be Invalid",
        });
      });
  };

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <Box
      width="100%"
      minH="100vh"
      background="gray.200"
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width={{ base: "90%", md: "40%", lg: "30%" }} shadow="lg" background="white" p={12} rounded={6}>
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

         

          <Box mt="5" color="red.500">
            {errors.API_ERROR && errors.API_ERROR.message}
          </Box>

          <Button
            isLoading={isSubmitting}
            mt={4}
            colorScheme="messenger"
            type="submit"
            w="100%"
          >
            Login
          </Button>

          <Text textAlign="center" p="2" size="xs">
            <Link as={ReactRouterLink} color="gray.500" to="/signup">
              Create account?
            </Link>
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
