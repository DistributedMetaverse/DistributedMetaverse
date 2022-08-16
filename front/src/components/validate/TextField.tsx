import React, { FC, InputHTMLAttributes } from 'react';
import { TextField } from '@mui/material';

interface RenderErrorProps {
	error: string;
}

interface RenderFieldProps {
	input: InputHTMLAttributes<HTMLInputElement>;
	label: string;
	type: string;
	meta: RenderErrorProps;
}

const RenderField: FC<RenderFieldProps> = ({
	input,
	label,
	type,
	meta: { error },
}) => {
	return (
		<TextField
			margin="normal"
			error={error ? true : false}
			required
			fullWidth
			id={input.name}
			label={label}
			type={type}
			name={input.name}
			defaultValue={input.value}
			onChange={input.onChange}
			autoComplete={input.name}
			helperText={error}
		/>
	);
};

export default RenderField;
