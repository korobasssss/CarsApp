import { Formik, Form } from "formik"
import { FC, useMemo } from "react"
import styles from './styles.module.scss'
import { Button, Message } from "ui-kit-cars/main"
import { validationSignIn } from "../utils"
import { ISignInForm } from "@/shared/interfaces"
import { InputFieldForm } from "@/entities/InputFieldForm"

interface ISignInFormComponent {
    submit: (values: ISignInForm) => void
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

    const handleSubmit = async (values: ISignInForm) => {
        submit(values)
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
                        <InputFieldForm
                            name='email'
                            input_placeholder='Введите логин'
                            input_type='email'
                        />
                        <InputFieldForm
                            name='password'
                            input_placeholder='Введите пароль'
                            input_type='password'
                        />
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
                                    disabled={!isValid || !Object.values(values).every(one => one)}
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