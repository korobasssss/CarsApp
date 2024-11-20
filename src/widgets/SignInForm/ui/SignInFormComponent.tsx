import { Field, FieldProps, Formik, Form, FormikHelpers, ErrorMessage } from "formik"
import { FC, useMemo } from "react"
import styles from './styles.module.scss'
import { Button, Input, Message } from "ui-kit-cars/main"
import { validationSignIn } from "../utils"
import { ISignInForm } from "@/shared/interfaces"

interface ISignInFormComponent {
    submit: (email: string, password: string) => void
    buttonSubmitTitle: string
    errorCommon: string
}

export const SignInFormComponent: FC<ISignInFormComponent> = (
    {
        submit,
        buttonSubmitTitle,
        errorCommon

    }
) => {

    const initialValues: ISignInForm = useMemo(() => {
        return {
            email: '',
            password: ''
        }
    }, [])

    const handleSubmit = async (values: ISignInForm, { setErrors, setStatus }: FormikHelpers<ISignInForm>) => {
        setErrors({})
        setStatus(undefined)

        submit(values.email, values.password)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSignIn}
            onSubmit={handleSubmit}
            validateOnBlur={false}
        >
            {({ isValid, values}) => (
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
                                        errorTextShow={false}
                                    />
                                );
                            }}
                        </Field>
                        <ErrorMessage name="email">
                            {msg => <Message message={msg} type='error' />}
                        </ErrorMessage>
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
                                        errorTextShow={false}
                                    />
                                );
                            }}
                        </Field>
                        <ErrorMessage name="password">
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
                                    disabled={!isValid || (!values.email || !values.password)}
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