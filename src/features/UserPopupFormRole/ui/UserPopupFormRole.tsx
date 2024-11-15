import { Field, FieldProps, Formik } from 'formik';
import styles from './styles.module.scss'
import { Form } from 'react-router-dom';
import { Button, Message, Select, } from 'ui-kit-cars/main';
import { FC, useMemo } from 'react';
import { validationRole } from '../utils/validation';

interface IUserFormRole {
    role: string
}

interface IUserPopupFormComponent {
    role: string
    submit: (role: string) => void
    errorCommon: string
    buttonSubmitTitle: string
}

export const UserPopupFormRole: FC<IUserPopupFormComponent> = (
    {
        role,
        submit,
        errorCommon,
        buttonSubmitTitle
    }
) => {
    const initialValues: IUserFormRole = useMemo(() => {
        return {
            role
        }
    }, [])

    const handleSubmit = (values: IUserFormRole) => {
        submit(values.role)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationRole}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize
        >
            {({ isValid, dirty}) => (
                <Form>
                    <div className={styles.SUserPopupRole}>
                        <Field
                            name='role'
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Select
                                        {...field}
                                        placeholder="Выберите роль"
                                        error={error}
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