import * as Yup from 'yup'

export const validationCarEdit = Yup.object().shape({
    model: Yup.number()
      .required('Выберите модель'),
    color: Yup.string()
      .trim(),
    image: Yup.mixed()
        .required('Выберите фото')
        .test('fileSize', 'Файл слишком большой', value => {
        if (value && value instanceof File) {
            return value.size <= 2000000;
        }
        return false;
        })
        .test('fileType', 'Неподдерживаемый формат файла', value => {
        if (value && value instanceof File) {
            return ['image/jpeg', 'image/png'].includes(value.type);
        }
        return false;
        }),
});

export const validationCarCreate = Yup.object().shape({
    model: Yup.number()
      .required('Выберите модель'),
    color: Yup.string()
      .trim(),
    image: Yup.mixed()
        .required('Выберите файл')
        .test('fileSize', 'Файл слишком большой', value => {
        if (value && value instanceof File) {
            return value.size <= 2000000;
        }
        return false;
        })
        .test('fileType', 'Неподдерживаемый формат файла', value => {
        if (value && value instanceof File) {
            return ['image/jpeg', 'image/png'].includes(value.type);
        }
        return false;
        }),
});