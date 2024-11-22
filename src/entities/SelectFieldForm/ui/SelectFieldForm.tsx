import { Field, FieldProps } from "formik";
import { ISelectOptions, Message, Select } from "ui-kit-cars/main";

interface ISelectFieldForm<T extends string | number> {
    name: string
    select_placeholder: string
    select_error?: string
    options?: ISelectOptions<T, string>[]
    setFieldValue: (name: string, value: any) => void
}

export const SelectFieldForm = <T extends string | number>(
    {
        name,
        select_placeholder,
        select_error,
        options,
        setFieldValue
    }: ISelectFieldForm<T>
): JSX.Element => {
    return (
        <>
            <Field name={name}>
                {({ field, form }: FieldProps) => {
                    const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';
                    return (
                        <div>
                            <Select
                                {...field}
                                options={options}
                                onChange={(value) => setFieldValue(name, value)}
                                placeholder={select_placeholder}
                                error={error}
                                errorTextShow={false}
                            />
                        </div>
                    );
                }}
            </Field>
            {select_error && (
                <Message message={select_error} type='error' />
            )}
        </>
    )
}