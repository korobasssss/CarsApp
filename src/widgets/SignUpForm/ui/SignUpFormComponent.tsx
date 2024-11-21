import { Form, Formik } from "formik"
import { FC, useMemo } from "react"
import styles from './styles.module.scss'
import { Button, Message } from "ui-kit-cars/main"
import { validationSignUp } from "../utils"
import { ISignUpForm } from "@/shared/interfaces"
import { InputFieldForm } from "@/entities/InputFieldForm"

interface ISignUpFormComponent {
    submit: (values: ISignUpForm) => void
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
    const initialValues: ISignUpForm = useMemo(() => {
        return {
            email: '',
            password: '',
            name: '',
            surname: '',
            patronymic: '',
            birthDate: '',
        }
    }, [])

    const handleSubmit = async (values: ISignUpForm) => {

        submit(values)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSignUp}
            onSubmit={handleSubmit}
            enableReinitialize
            validateOnBlur={false}
        >
            {({ isValid, values }) => (
                <Form>
                    <div className={styles.SSignUp}>
                        <InputFieldForm
                            name='email'
                            input_placeholder='Введите почту'
                            input_type='email'
                        />
                        <InputFieldForm
                            name='password'
                            input_placeholder='Введите пароль'
                            input_type='password'
                        />
                        <InputFieldForm
                            name='name'
                            input_placeholder='Введите имя'
                        />
                        <InputFieldForm
                            name='surname'
                            input_placeholder='Введите фамилию'
                        />
                        <InputFieldForm
                            name='patronymic'
                            input_placeholder='Введите отчество'
                        />
                        <InputFieldForm
                            name='birthDate'
                            input_placeholder='Введите дату рождения'
                            input_type='date'
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
                                    disabled={
                                        !isValid || !Object.values(values).every(one => one)}
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