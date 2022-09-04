import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { TextField } from '@mui/material';

interface RenderFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	type: string;
	label: string;
}

const RenderField: FC<RenderFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	type,
	label,
}) => {
	return (
		<TextField
			margin="normal"
			error={error ? true : false}
			required
			id={name}
			label={label}
			type={type}
			name={name}
			defaultValue={value}
			onChange={onChange}
			autoComplete={name}
			helperText={error?.message}
			style={{ width: '80%' }}
			inputProps={{ style: { fontSize: 13 } }} // font size of input text
			InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
		/>
	);
};

export default RenderField;
