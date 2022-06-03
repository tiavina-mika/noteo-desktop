import { TextField as MUITextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type ITextFieldProps = {
  name: string;
} & TextFieldProps;

const TextField: FC<ITextFieldProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller control={control} name={name} defaultValue="" render={({ field })=> (
        <MUITextField
          {...otherProps}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name].message : ''}
        />
      )}
    />
  );
};

export default TextField;