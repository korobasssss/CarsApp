import * as Yup from 'yup'

export const validationUser = Yup.object().shape({
    name: Yup.string()
      .max(100),
    surname: Yup.string()
      .max(100),
    patronymic: Yup.string()
      .max(100),
    birthDate: Yup.string()
      .max(100),
});