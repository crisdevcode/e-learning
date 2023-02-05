import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { register } from "../redux/actions/userActions";

const RegistrationScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = '/products';
  const toast = useToast();
  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({ description: 'Account created. Welcome aboard.', status: 'success', isClosable: true });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('An name is required.'),
        email: Yup.string().email('Invalid email.').required('An email address is required.'),
        password: Yup.string()
          .min(1, 'Password is too short - must contain at least 1 character.')
          .required('Password is required.'),
        confirmPassword: Yup.string()
          .min(1, 'Password is too short - must contain at least 1 character.')
          .required('Password is required.')
          .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password));
      }}>
      {(formik) => (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
          <Stack spacing='8'>
            <Stack spacing='6'>
              <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                <Heading size={headingBR}>Crear una cuenta.</Heading>
                <HStack spacing='1' justify='center'>
                  <Text color='muted'>¿Ya tienes cuenta? </Text>
                  <Button as={ReactLink} to='/login' variant='link' colorScheme='orange'>
                    Iniciar Sesión
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', md: '8' }}
              px={{ base: '4', md: '10' }}
              bg={{ boxBR }}
              boxShadow={{ base: 'none', md: 'xl' }}>
              <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status='error'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'>
                    <AlertIcon />
                    <AlertTitle>¡Lo sentimos!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing='5'>
                  <FormControl>
                    <TextField type='text' name='name' placeholder='Tu nombre y apellido.' label='Nombre completo' />
                    <TextField type='text' name='email' placeholder='tuemail@gmail.com' label='Correo electrónico' />
                    <PasswordTextField type='password' name='password' placeholder='Tu contraseña' label='Contraseña' />
                    <PasswordTextField
                      type='password'
                      name='confirmPassword'
                      placeholder='Tu contraseña'
                      label='Confirmar contraseña'
                    />  
                  </FormControl>
                </Stack>
                <Stack spacing='6'>
                  <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
                    Registrarse
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default RegistrationScreen;