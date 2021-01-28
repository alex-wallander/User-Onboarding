import * as yup from 'yup';

export default yup.object().shape({
    username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be 4 characters long'),
    email: yup
    .string()
    .email('must be a valid email')
    .required('email is required'),
    password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
    terms: yup
    .boolean()
    .oneOf([true], 'Please accept the Terms of Service')

})