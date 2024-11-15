import { Field, FieldProps, Formik } from "formik"
import { FC, useMemo } from "react"
import { Form } from "react-router-dom"
import styles from './styles.module.scss'
import { Button, Input, Message } from "ui-kit-cars/main"
import { validationSignIn } from "../utils"

interface IUserFormData {
    email: string
    password: string
}

interface ISignInFormComponent {
    submit: (email: string, password: string) => void
    errorCommon: string
    buttonSubmitTitle: string
}

export const SignInFormComponent: FC<ISignInFormComponent> = (
    {
        submit,
        errorCommon,
        buttonSubmitTitle
    }
) => {
    const initialValues: IUserFormData = useMemo(() => {
        return {
            email: '',
            password: ''
        }
    }, [])

    const handleSubmit = (values: IUserFormData) => {
        submit(values.email, values.password)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSignIn}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize
        >
            {({ isValid, dirty}) => (
                <Form>
                    <div className={styles.SSignIn}>
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