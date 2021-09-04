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
  useToast,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { forgotPasswordResolver } from "../../utils/validator/forgotPasswordResolver";
import { auth } from "../../utils/firebase";
import { AuthContext } from "../../components/Authentication/AuthProvider";

const ForgotPasword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ resolver: forgotPasswordResolver });

  const history = useHistory();
  const toast = useToast();

  const { user } = useContext(AuthContext);

  const onSubmit = ({ email }) => {
    clearErrors("API_ERROR");
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        toast({
          title: "Email sent successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        setTimeout(() => {
          history.push("/login");
        }, 4000);
      })
      .catch((err) => {
        setError("API_ERROR", {
          message: err.message,
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
      <Box
        width={{ base: "90%", md: "40%", lg: "30%" }}
        shadow="lg"
        background="white"
        p={12}
        rounded={6}
      >
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
            Reset Password
          </Button>

          <Text textAlign="center" p="2" size="xs">
            <Link as={ReactRouterLink} color="gray.500" to="/login">
              login?
            </Link>
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPasword;
