import { ErrorMessage, Field, FieldProps } from "formik";
import { FC } from "react";
import { Input, Message } from "ui-kit-cars/main";

interface IFieldUserData {
    name: string
    input_placeholder: string
    input_type?: 'text' | 'date' | 'password' | 'email'
    isError?: boolean
}

export const InputFieldForm: FC<IFieldUserData> = (
    {
        name,
        input_placeholder,
        input_type = 'text',
        isError = true
    }
) => {
    return (
        <>
            <Field name={name}>
                {({ field, form }: FieldProps) => {
                    const error = form.errors[field.name] ? form.errors[field.name]?.toString() : '';

                    return (
                        <Input
                            {...field}
                            error={error}
                            placeholder={input_placeholder}
                            errorTextShow={false}
                            type={input_type}
                        />
                    );
                }}
            </Field>
            {isError && (
                <ErrorMessage name={name}>
                    {msg => <Message message={msg} type='error' />}
                </ErrorMessage>
            )}
        </>
    )
}