import * as Yup from 'yup'

export const validationSignIn = Yup.object().shape({
    email: Yup.string()
      .required('Введите логин')
      .trim(),
    password: Yup.string()
      .required('Введите пароль')
      .min(6)
      .max(100)
      .trim(),
});