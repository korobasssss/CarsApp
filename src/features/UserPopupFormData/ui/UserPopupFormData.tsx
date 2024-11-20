import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import styles from './styles.module.scss'
import { Button, Input, Message, } from 'ui-kit-cars/main';
import { FC, useMemo } from 'react';
import { formattedToForm, validationUser } from '../utils';
import { IUserFormData } from '@/shared/interfaces';

interface IUserPopupFormComponent {
    name: string
    surname: string
    patronymic: string
    birthDate: string
    submit: (name: string, surname: string, patronymic: string, birthDate: string) => void
    errorCommon: string
    buttonSubmitTitle: string
}

export const UserPopupFormData: FC<IUserPopupFormComponent> = (
    {
        name,
        surname,
        patronymic,
        birthDate,
        submit,
        errorCommon,
        buttonSubmitTitle
    }
) => {
    const initialValues: IUserFormData = useMemo(() => {
        return {
            name,
            surname,
            patronymic,
            birthDate: formattedToForm(birthDate)
        }
    }, [])

    const handleSubmit = async (values: IUserFormData) => {
        submit(values.name, values.surname, values.patronymic, values.birthDate)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationUser}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            enableReinitialize
        >
            {({ isValid, values }) => (
                <Form>
                    <div className={styles.SUserPopupData}>
                        <Field 
                            name="surname"
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Input
                                        {...field}
                                        error={error}
                                        placeholder="Введите фамилию"
                                        errorTextShow={false}
                                    />
                                );
                            }}
                        </Field>
                        <ErrorMessage name="surname">
                            {msg => <Message message={msg} type='error' />}
                        </ErrorMessage>
                        <Field
                            name='name'
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Input
                                        {...field}
                                        error={error}
                                        placeholder="Введите имя"
                                        errorTextShow={false}
                                    />
                                );
                            }}
                        </Field>
                        <ErrorMessage name="name">
                            {msg => <Message message={msg} type='error' />}
                        </ErrorMessage>
                        <Field
                            name='patronymic'
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';
                                
                                return (
                                    <Input
                                        {...field}
                                        error={error}
                                        placeholder="Введите отчество"
                                        errorTextShow={false}
                                    />
                                )
                            }}
                        </Field>
                        <ErrorMessage name="patronymic">
                            {msg => <Message message={msg} type='error' />}
                        </ErrorMessage>
                        <Field
                            name='birthDate'
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';
                                
                                return (
                                    <Input
                                        {...field}
                                        type='date'
                                        error={error}
                                        placeholder="Введите дату рождения"
                                        errorTextShow={false}
                                    />
                                )
                            }}
                        </Field>
                        <ErrorMessage name="birthDate">
                            {msg => <Message message={msg} type='error' />}
                        </ErrorMessage>
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
                                    disabled={!isValid || (!values.surname || !values.name || !values.patronymic || !values.birthDate)}
                                >
                                    {buttonSubmitTitle}
                                </Button>
                            )}
                        </footer>
                    </div>
                </Form>
            )}
        </Formik>
    )
}