import { useContext, useEffect, useRef } from "react";
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
import { useHistory, useLocation } from "react-router-dom";

import { resetPasswordResolver } from "../../utils/validator/resetResolver";
import { auth } from "../../utils/firebase";
import { AuthContext } from "../../components/Authentication/AuthProvider";

const ResetPassword = ({ location }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ resolver: resetPasswordResolver });

  const history = useHistory();

  const oobCode = useRef(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    oobCode.current = queryParams.get("oobCode");

    if (!oobCode.current) {
      history.push("/login");
    }
  }, []);

  const onSubmit = ({ password }) => {
    clearErrors("API_ERROR");
    auth
      .confirmPasswordReset(oobCode.current, password)
      .then(() => {
        history.push("/");
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

export default ResetPassword;
