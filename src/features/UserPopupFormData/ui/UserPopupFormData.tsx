import { Form, Formik } from 'formik';
import styles from './styles.module.scss'
import { Button, Message, } from 'ui-kit-cars/main';
import { FC, useMemo } from 'react';
import { formattedToForm, validationUser } from '../utils';
import { IUserFormData } from '@/shared/interfaces';
import { observer } from 'mobx-react-lite';
import { InputFieldForm } from '@/entities/InputFieldForm';

interface IUserPopupFormComponent {
    name: string
    surname: string
    patronymic: string
    birthDate: string
    submit: (values: IUserFormData) => void
    errorCommon: string
    buttonSubmitTitle: string
    isLoading: boolean
}

export const UserPopupFormData: FC<IUserPopupFormComponent> = observer((
    {
        name,
        surname,
        patronymic,
        birthDate,
        submit,
        errorCommon,
        buttonSubmitTitle,
        isLoading
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
        submit(values)
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
                        <InputFieldForm
                            name='surname'
                            input_placeholder='Введите фамилию'
                        />
                        <InputFieldForm
                            name='name'
                            input_placeholder='Введите имя'
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
                                    disabled={!isValid || !Object.values(values).every(one => one) || isLoading}
                                    isLoading={isLoading}
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
})