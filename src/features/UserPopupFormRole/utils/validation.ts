import * as Yup from 'yup'

export const validationRole = Yup.object().shape({
  role: Yup.string()
    .required('Выберите роль')
});