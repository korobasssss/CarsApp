import * as Yup from 'yup'

export const validationSignIn = Yup.object().shape({
  email: Yup.string()
  .trim()
  .min(1, 'Это поле не может быть пустым')
  .email('Неверный email')
  .required('Введите email'),
password: Yup.string()
  .trim()
  .min(6, 'Пароль должен содержать как минимум 6 символов')
  .max(100, 'Пароль не должен превышать 100 символов')
  .required('Введите пароль'),
});