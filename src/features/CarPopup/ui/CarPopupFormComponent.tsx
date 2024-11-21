import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import styles from './styles.module.scss'
import { Button, ButtonIcon, FileLoader, Input, ISelectOptions, Message, Select } from 'ui-kit-cars/main';
import { validationCarCreate, validationCarEdit } from '../utils';
import { FC, useMemo, useState } from 'react';
import { DeleteIcon } from '@/shared/assets';
import cx from 'classnames'
import { observer } from 'mobx-react-lite';
import { carStore } from '@/app/store/mobxStore';
import { ICarForm } from '@/shared/interfaces';

interface ICarPopupFormComponent {
    brandId?: number
    color: string
    image: string | null
    submit: (values: ICarForm) => void
    errorCommon: string
    buttonSubmitTitle: string
    handleDelete?: () => void
}

export const CarPopupFormComponent: FC<ICarPopupFormComponent> = observer((
    {
        brandId,
        color,
        image,
        submit,
        errorCommon,
        buttonSubmitTitle,
        handleDelete
    }
) => {
    const [canShowImage, setCanShowImage] = useState(true)

    const carCategoriesOptions: ISelectOptions<number, string>[] | undefined = useMemo(() => {
        if (!carStore.carCategories) return undefined
        return carStore.carCategories.map(oneCategory => {
            return {
                value: oneCategory.carModelId,
                label: `${oneCategory.brand} ${oneCategory.model}`
            }
        })
    }, [carStore.carCategories])

    const initialValues: ICarForm = useMemo(() => {
        return {
            model: brandId,
            color: color || '',
            image: undefined
        }
    }, [])

    const handleSubmit = async (values: ICarForm) => {
        if (!values.model) return

        if (handleDelete || values.image) {
            submit(values)
        }
    }

    const stylesFooter = useMemo(() => {
        return cx(
            styles.SPFooter,
            {[styles['SPFooter_action']]: handleDelete}
        )
    }, [handleDelete])

    const isValues = (values: ICarForm) => {
        return (!values.model || !values.image && (handleDelete ? (!canShowImage) : true))
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={handleDelete ? validationCarEdit : validationCarCreate}
            onSubmit={handleSubmit}
            validateOnBlur={false}
        >
            {({ values, isValid, setFieldValue, errors }) => (
                
                <Form>
                    <div className={styles.SCarPopup}>
                        <Field name="model">
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';
                                return (
                                    <div>
                                        <Select
                                            {...field}
                                            options={carCategoriesOptions}
                                            onChange={(value) => setFieldValue('model', value)}
                                            placeholder="Выберите модель"
                                            error={error}
                                            errorTextShow={false}
                                        />
                                    </div>
                                );
                            }}
                        </Field>
                        {errors.model && (
                            <Message message={errors.model} type='error' />
                        )}
                        <Field name="color">
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Input
                                        {...field}
                                        error={error}
                                        placeholder="Введите цвет"
                                        errorTextShow={false}
                                    />
                                );
                            }}
                        </Field>
                        <ErrorMessage name="color">
                            {msg => <Message message={msg} type='error' />}
                        </ErrorMessage>
                        <Field name='image'>
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';
                                if (image && !values.image && canShowImage) {
                                    return (
                                        <div className={styles.SUserImageWrapper}>
                                            <img 
                                                src={image}
                                                className={styles.SUserImage}
                                            />
                                            <ButtonIcon
                                                type='button'
                                                alt='delete icon'
                                                onClick={() => setCanShowImage(false)}
                                            >
                                                <DeleteIcon/>
                                            </ButtonIcon>
                                        </div>
                                    )
                                } 
                                
                                return (
                                    <FileLoader
                                        {...field}
                                        handleChange={(value) => setFieldValue('image', value)}
                                        error={error}
                                        errorTextShow={false}
                                    />
                                )
                            }}
                        </Field>
                        {errors.image && (
                            <Message message={errors.image} type='error' />
                        )}
                        {errorCommon && (
                            <Message
                                message={errorCommon}
                                type='error'
                            />
                        )}
                        <footer className={stylesFooter}>
                            {buttonSubmitTitle && (
                                <Button
                                    theme='primary'
                                    type='submit'
                                    disabled={!isValid || (isValues(values))}
                                >
                                    {buttonSubmitTitle}
                                </Button>
                            )}
                            {handleDelete && (
                                <Button
                                    type="button"
                                    theme='danger'
                                    onClick={handleDelete}
                                >
                                    Удалить
                                </Button>
                            )}
                        </footer>
                    </div>
                </Form>
            )}
        </Formik>
    )
})