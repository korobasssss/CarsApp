import * as Yup from 'yup'

export const validationSignUp = Yup.object().shape({
    email: Yup.string()
      .required('Введите логин')
      .trim(),
    password: Yup.string()
      .required('Введите пароль')
      .min(6, 'Минимум 6 символов')
      .max(100, 'Максимум 100 символов')
      .matches(/[a-zA-Z]/, 'Должен содержать минимум 1 букву')
      .matches(/[0-9]/, 'Должен содержать минимум 1 цифру')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Должен содержать минимум 1 специальный символ')
      .matches(/[A-Z]/, 'Должен содержать минимум 1 заглавную букву')
      .trim(),
    name: Yup.string()
      .required('Введите имя')
      .max(100)
      .trim(),
    surname: Yup.string()
      .required('Введите фамилию')
      .max(100)
      .trim(),
    patronymic: Yup.string()
      .required('Введите отчество')
      .max(100)
      .trim(),
    birthDate: Yup.string()
      .required('Введите дату рождения')
      .trim(),
});