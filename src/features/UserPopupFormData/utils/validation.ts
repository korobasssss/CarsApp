import * as Yup from 'yup'

export const validationUser = Yup.object().shape({
    name: Yup.string()
      .required('Введите имя')
      .max(100),
    surname: Yup.string()
      .required('Введите фамилию')
      .max(100),
    patronymic: Yup.string()
      .required('Введите отчество')
      .max(100),
    birthDate: Yup.string()
      .required('Введите дату рождения')
      .max(100),
});