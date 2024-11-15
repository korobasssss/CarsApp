import * as Yup from 'yup'

export const validationUser = Yup.object().shape({
    name: Yup.string()
      .max(100)
      .required('Введите имя'),
    surname: Yup.string()
      .max(100)
      .required('Введите фамилию'),
    patronymic: Yup.string()
      .max(100)
      .required('Введите отчество'),
    birthDate: Yup.string()
      .max(100)
      .required('Введите дату рождения'),
});