import { Field, FieldProps, Form, Formik } from 'formik';
import styles from './styles.module.scss'
import { Button, Message, Select, } from 'ui-kit-cars/main';
import { FC, useMemo } from 'react';
import { validationRole } from '../utils/validation';
import { usersStore } from '@/app/store/mobxStore';

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
            {({ isValid, values, setFieldValue}) => (
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
                                        options={usersStore.getUserRoles}
                                        onChange={(value) => setFieldValue('role', value)}
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
                                    disabled={!isValid || !values.role}
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