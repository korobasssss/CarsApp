import { Field, FieldProps, Formik } from 'formik';
import styles from './styles.module.scss'
import { Form } from 'react-router-dom';
import { Button, ButtonIcon, FileLoader, Input, Message, Select } from 'ui-kit-cars/main';
import { validationCar } from '../utils';
import { FC, useMemo, useState } from 'react';
import { DeleteIcon } from '@/shared/assets';

interface ICarForm {
    model: number
    color: string
    image: File | null
}

interface ICarPopupFormComponent {
    brandId: number
    color: string
    image: string | null
    submit: (brandId: number, color?: string, image?: File) => void
    errorCommon: string
    buttonSubmitTitle: string
    handleDelete?: () => void
}

export const CarPopupFormComponent: FC<ICarPopupFormComponent> = (
    {
        brandId,
        color,
        image,
        submit,
        errorCommon,
        buttonSubmitTitle,
        handleDelete
    }
) => {
    const [canShowImage, setCanShoeImage] = useState(true)

    const initialValues: ICarForm = useMemo(() => {
        return {
            model: brandId,
            color,
            image: null
        }
    }, [])

    const handleSubmit = (values: ICarForm) => {
        if (values.image) {
            submit(values.model, values.color, values.image)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationCar}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize
        >
            {({ values, isValid, dirty, setFieldValue }) => (
                <Form>
                    <div className={styles.SCarPopup}>
                        <Field
                            name='model'
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Select
                                        {...field}
                                        placeholder="Выберите модель"
                                        error={error}
                                    />
                                );
                            }}
                        </Field>
                        <Field 
                            name="color"
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Input
                                        {...field}
                                        error={error}
                                        placeholder="Введите цвет"
                                    />
                                );
                            }}
                        </Field>
                        <Field
                            name='image'
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';
                                
                                if (image && !values.image && canShowImage) {
                                    return (
                                        <div className={styles.SUserImageWrapper}>
                                            <img src={image}/>
                                            <ButtonIcon
                                                alt='delete icon'
                                                onClick={() => setCanShoeImage(false)}
                                            >
                                                <DeleteIcon/>
                                            </ButtonIcon>
                                        </div>
                                    )
                                } 
                                
                                return (
                                    <FileLoader
                                        {...field}
                                        handleChange={(value) => setFieldValue('image', value)}
                                        error={error}
                                    />
                                )
                            }}
                        </Field>
                        {errorCommon && (
                            <Message
                                message={errorCommon}
                                type='error'
                            />
                        )}
                        <footer className={styles.SPFooter}>
                            {buttonSubmitTitle && (
                                <Button
                                    theme='primary'
                                    type='submit'
                                    disabled={!isValid || !dirty}
                                >
                                    {buttonSubmitTitle}
                                </Button>
                            )}
                            {handleDelete && (
                                <Button
                                    type="button"
                                    theme='danger'
                                    onClick={handleDelete}
                                >
                                    Удалить
                                </Button>
                            )}
                        </footer>
                    </div>
                </Form>
            )}
        </Formik>
    )
}