import { Field, FieldProps, Formik } from "formik"
import { FC, useMemo } from "react"
import { Form } from "react-router-dom"
import styles from './styles.module.scss'
import { Button, Input, Message } from "ui-kit-cars/main"
import { validationSignUp } from "../utils"

interface IUserFormData {
    email: string
    password: string
    name: string
    surname: string
    patronymic: string
    birthDate: string
}

interface ISignUpFormComponent {
    submit: (email: string, password: string) => void
    errorCommon: string
    buttonSubmitTitle: string
}

export const SignUpFormComponent: FC<ISignUpFormComponent> = (
    {
        submit,
        errorCommon,
        buttonSubmitTitle
    }
) => {
    const initialValues: IUserFormData = useMemo(() => {
        return {
            email: '',
            password: '',
            name: '',
            surname: '',
            patronymic: '',
            birthDate: '',
        }
    }, [])

    const handleSubmit = (values: IUserFormData) => {
        submit(values.email, values.password)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSignUp}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize
        >
            {({ isValid, dirty}) => (
                <Form>
                    <div className={styles.SSignUp}>
                        <Field
                            name='email'
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Input
                                        {...field}
                                        type='email'
                                        error={error}
                                        placeholder="Введите логин"
                                    />
                                );
                            }}
                        </Field>
                        <Field 
                            name="password"
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Input
                                        {...field}
                                        type='password'
                                        error={error}
                                        placeholder="Введите пароль"
                                    />
                                );
                            }}
                        </Field>
                        <Field 
                            name="name"
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Input
                                        {...field}
                                        error={error}
                                        placeholder="Введите имя"
                                    />
                                );
                            }}
                        </Field>
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
                                    />
                                );
                            }}
                        </Field>
                        <Field 
                            name="patronymic"
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Input
                                        {...field}
                                        error={error}
                                        placeholder="Введите отчество"
                                    />
                                );
                            }}
                        </Field>
                        <Field 
                            name="birthDate"
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Input
                                        {...field}
                                        error={error}
                                        type='date'
                                        placeholder="Введите дату рождения"
                                    />
                                );
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
                        </footer>
                    </div>
                </Form>
            )}
        </Formik>
    )
}