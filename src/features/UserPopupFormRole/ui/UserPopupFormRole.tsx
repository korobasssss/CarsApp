import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import styles from './styles.module.scss'
import { Button, Message, Select, } from 'ui-kit-cars/main';
import { FC, useMemo } from 'react';
import { validationRole } from '../utils/validation';
import { usersStore } from '@/app/store/mobxStore';
import { ERole } from '@/shared/enums';

interface IUserFormRole {
    role: ERole
}

interface IUserPopupFormComponent {
    role: ERole
    submit: (role: ERole) => void
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
            validateOnBlur={false}
        >
            {({ isValid, values, setFieldValue}) => (
                <Form>
                    <div className={styles.SUserPopupRole}>
                        <Field name='role'>
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Select
                                        {...field}
                                        options={usersStore.userRoles}
                                        onChange={(value) => setFieldValue('role', value)}
                                        placeholder="Выберите роль"
                                        error={error}
                                        errorTextShow={false}
                                    />
                                );
                            }}
                        </Field>
                        <ErrorMessage name="role">
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