import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import styles from './styles.module.scss'
import { Button, ButtonIcon, FileLoader, Input, ISelectOptions, Message, Select } from 'ui-kit-cars/main';
import { validationCarCreate, validationCarEdit } from '../utils';
import { FC, useCallback, useMemo, useState } from 'react';
import { DeleteIcon } from '@/shared/assets';
import cx from 'classnames'
import { observer } from 'mobx-react-lite';
import { carStore } from '@/app/store/mobxStore';
import { ICarForm } from '@/shared/interfaces';

interface ICarPopupFormComponent {
    brandId: number | undefined
    color: string
    image: string | null
    submit: (brandId: number, color?: string, image?: File) => void
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
    const [canShowImage, setCanShoeImage] = useState(true)

    const carCategoriesOptions: ISelectOptions<number, string>[] | undefined = useMemo(() => {
        if (!carStore.getCarCategories) return undefined
        return carStore.getCarCategories.map(oneCategory => {
            return {
                value: oneCategory.carModelId,
                label: `${oneCategory.brand} ${oneCategory.model}`
            }
        })
    }, [carStore.carCategories])

    const initialValues: ICarForm = useMemo(() => {
        return {
            model: brandId,
            color,
            image: undefined
        }
    }, [])

    const handleSubmit = async (values: ICarForm, { setErrors, setStatus }: FormikHelpers<ICarForm>) => {
        console.log((!values.model || !values.image))
        setErrors({})
        setStatus(undefined)
        if (handleDelete) {
            if (values.model) {
                submit(values.model, values.color, values.image)
            }
        } else {
            if (values.image && values.model) {
                submit(values.model, values.color, values.image)
            }
        }
    }

    const stylesFooter = useMemo(() => {
        return cx(
            {
                [styles['SPFooter1Action']]: !handleDelete,
                [styles['SPFooter2Actions']]: handleDelete

            }
        )
    }, [handleDelete])

    const isValues = useCallback((values: ICarForm) => {
        if (handleDelete) {
            return !values.model
        } else {
            return !values.model || !values.image
        }
    }, [handleDelete])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={handleDelete ? validationCarEdit : validationCarCreate}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            enableReinitialize
        >
            {({ values, isValid, setFieldValue }) => (
                
                <Form>
                    <div className={styles.SCarPopup}>
                        <Field
                            name='model'
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Select
                                        {...field}
                                        options={carCategoriesOptions}
                                        onChange={(value) => setFieldValue('model', value)}
                                        placeholder="Выберите модель"
                                        error={error}
                                    />
                                );
                            }}
                        </Field>
                        <Field 
                            name="color"
                        >
                            {({ field, form }: FieldProps) => {
                                const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                                return (
                                    <Input
                                        {...field}
                                        error={error}
                                        placeholder="Введите цвет"
                                    />
                                );
                            }}
                        </Field>
                        <Field
                            name='image'
                        >
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
                                                onClick={() => setCanShoeImage(false)}
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
                                    />
                                )
                            }}
                        </Field>
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