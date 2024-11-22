import { Form, Formik } from 'formik';
import styles from './styles.module.scss'
import { Button, Message } from 'ui-kit-cars/main';
import { FC, useMemo } from 'react';
import { validationRole } from '../utils/validation';
import { usersStore } from '@/app/store/mobxStore';
import { ERole } from '@/shared/enums';
import { observer } from 'mobx-react-lite';
import { SelectFieldForm } from '@/entities/SelectFieldForm';

interface IUserFormRole {
    role: ERole
}

interface IUserPopupFormComponent {
    role: ERole
    submit: (role: ERole) => void
    errorCommon: string
    buttonSubmitTitle: string
    isLoading: boolean
}

export const UserPopupFormRole: FC<IUserPopupFormComponent> = observer((
    {
        role,
        submit,
        errorCommon,
        buttonSubmitTitle,
        isLoading
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
            {({ isValid, values, setFieldValue, errors}) => (
                <Form>
                    <div className={styles.SUserPopupRole}>
                        <SelectFieldForm
                            name='role'
                            select_placeholder="Выберите роль"
                            select_error={errors.role}
                            options={usersStore.userRoles}
                            setFieldValue={setFieldValue}
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
                                    disabled={!isValid || !values.role || isLoading}
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