import { Field, FieldProps, Formik, Form, FormikHelpers } from "formik"
import React, { FC, SetStateAction, useEffect, useMemo, useState } from "react"
import styles from './styles.module.scss'
import { Button, Input, Message } from "ui-kit-cars/main"
import { validationSignIn } from "../utils"
import { ISignInForm } from "@/shared/interfaces"

interface ISignInFormComponent {
    submit: (email: string, password: string, setErrorCommon: React.Dispatch<SetStateAction<string>>) => void
    buttonSubmitTitle: string
}

export const SignInFormComponent: FC<ISignInFormComponent> = (
    {
        submit,
        buttonSubmitTitle
    }
) => {
    const [errorCommon, setErrorCommon] = useState('')

    const initialValues: ISignInForm = useMemo(() => {
        return {
            email: '',
            password: ''
        }
    }, [])

    const handleSubmit = async (values: ISignInForm, { setErrors, setStatus }: FormikHelpers<ISignInForm>) => {
        setErrorCommon('')
        setErrors({})
        setStatus(undefined)

        submit(values.email, values.password, setErrorCommon)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSignIn}
            onSubmit={handleSubmit}
            enableReinitialize
            validateOnBlur={false}
        >
            {({ isValid, values}) => (
                <Form>
                    <div className={styles.SSignIn}>
                        <Field
                            name='email'
                        >
                            {({ field, form }: FieldProps) => {
                                setErrorCommon('')
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
                                setErrorCommon('')
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