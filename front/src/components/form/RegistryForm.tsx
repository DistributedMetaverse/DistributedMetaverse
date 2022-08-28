import React, { FC, FormEventHandler } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, ConfigProps } from 'redux-form';
import {
	Avatar,
	Button,
	CssBaseline,
	Box,
	Paper,
	Typography,
	Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Copyright';
import renderField from '../validate/TextField';
import { defaultTheme } from '../../utils/theme';
import {
	validateEmail,
	validateUpperCase,
	validateLowerCase,
	validateDigit,
	validateSpecialChar,
} from '../../utils/validation';

const theme = createTheme(defaultTheme);

interface RegistryProp {
	onSubmit: FormEventHandler<HTMLFormElement>;
	formState: any;
	admin: boolean;
	submitting: boolean;
}

const RegistryForm: FC<RegistryProp> = ({
	onSubmit,
	formState,
	submitting,
}): JSX.Element => {
	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Paper
					sx={{
						mt: 10, // margin-top : 6 * 10 px
						display: 'flex',
						justifyContent: 'center',
						bgcolor: 'background.default',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center', // 가로 중앙
							bgcolor: 'background.paper',
							borderRadius: '16px',
							width: 350,
						}}
					>
						<Avatar sx={{ m: 1, mt: 3, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography variant="h6">Admin Registry</Typography>
						<Typography
							component="span"
							variant="h6"
							sx={{ pt: 2, fontSize: '0.7rem', color: '#626274' }}
						>
							※ 관리자 정보를 입력해주세요 ※ <br />
							관리자 정보가 있어야 페이지가 정상적으로 실행됩니다.
						</Typography>
						<Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 0 }}>
							<Field
								component={renderField}
								type="email"
								name="email"
								label="Email Address"
							/>
							<Field
								component={renderField}
								type="text"
								name="username"
								label="Username"
							/>
							<Field
								component={renderField}
								type="password"
								name="password"
								label="Password"
							/>
							<Field
								component={renderField}
								type="password"
								name="repeat_password"
								label="Repeat Password"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								disabled={
									!submitting &&
									Object.prototype.hasOwnProperty.call(formState, 'syncErrors')
								}
								sx={{ mt: 3, mb: 2 }}
							>
								Sign Up
							</Button>
						</Box>
					</Box>
				</Paper>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
};

// FormEvent<HTMLFormElement> → any 타입핑
const validateSignup = (values: any) => {
	const errors: any = {};

	const requiredFields = ['email', 'username', 'password', 'repeat_password'];

	if (!validateEmail(values.email)) {
		errors.email = 'Invalid email address.';
	}

	requiredFields.forEach((field: string) => {
		if ((values as any)[field] === '') {
			(errors as any)[field] = ['The', field, 'field is required.'].join(' ');
		}
	});

	if (
		Object.prototype.hasOwnProperty.call(values, 'email') &&
		(values.email.length < 3 || values.email.length > 50)
	) {
		errors.email = 'email field must be between 3 and 50 in size';
	}

	if (Object.prototype.hasOwnProperty.call(values, 'password')) {
		if (values.password.length < 8 || values.password.length > 100) {
			errors.password = 'password field must be between 8 and 100 in size';
		} else if (!validateUpperCase(values.password)) {
			errors.password = 'password does not contain uppercase letters';
		} else if (!validateLowerCase(values.password)) {
			errors.password = 'password does not contain lowercase letters';
		} else if (!validateDigit(values.password)) {
			errors.password = 'password does not contain numbers';
		} else if (!validateSpecialChar(values.password)) {
			errors.password = 'password does not contain special characters';
		}
	}

	if (
		Object.prototype.hasOwnProperty.call(values, 'password') &&
		Object.prototype.hasOwnProperty.call(values, 'repeat_password') &&
		values.password !== values.repeat_password
	) {
		errors.repeat_password = 'Passwords do not match';
	}

	return errors;
};

const mapStateToProps = (state: ConfigProps, ownProps: any = {}) => ({
	formState: (state.form as any).RegistryForm,
	ownProps: ownProps,
});

export default reduxForm({
	form: 'RegistryForm',
	validate: validateSignup,
})(connect(mapStateToProps, null)(RegistryForm));
