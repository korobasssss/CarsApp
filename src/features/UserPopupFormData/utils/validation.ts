import * as Yup from 'yup'

export const validationUser = Yup.object().shape({
    name: Yup.string()
      .required('Введите имя')
      .max(100, 'Максимальное значение 100 символов'),
    surname: Yup.string()
      .required('Введите фамилию')
      .max(100, 'Максимальное значение 100 символов'),
    patronymic: Yup.string()
      .required('Введите отчество')
      .max(100, 'Максимальное значение 100 символов'),
    birthDate: Yup.string()
      .required('Введите дату рождения')
      .max(100, 'Максимальное значение 100 символов'),
});