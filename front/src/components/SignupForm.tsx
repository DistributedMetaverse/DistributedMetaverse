import React, { FC, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm, ConfigProps } from 'redux-form';
import {
	validateEmail,
	validateUpperCase,
	validateLowerCase,
	validateDigit,
	validateSpecialChar,
} from '../utils/validation';
import {
	Avatar,
	Button,
	IconButton,
	CssBaseline,
	Grid,
	Box,
	Typography,
	Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Copyright from './Copyright';
import renderField from './validate/TextField';

const theme = createTheme({
	palette: {
		text: {
			primary: '#fff', // Main Text
			secondary: '#fff', // Validation Text
		},
		action: {
			disabled: '#fff', // Button Disabled Text
			disabledBackground: '#34343B', // Button Disabled Background Color
		},
		background: {
			default: '#1D1B22',
			paper: '#26262E',
		},
		secondary: {
			main: '#86868A', // LockOut Icon Background Color
		},
	},
	spacing: 6, // Spacing(간격) - Default : 8px
});

interface SignupProp {
	onSubmit: FormEventHandler<HTMLFormElement>;
	formState: any;
	submitting: boolean;
}

const SignupForm: FC<SignupProp> = ({
	onSubmit,
	formState,
	submitting,
}): JSX.Element => {
	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						mt: 10, // margin-top : 6 * 10 px
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center', // 가로 중앙
						bgcolor: 'background.paper',
						borderRadius: '16px',
					}}
				>
					<Avatar sx={{ m: 1, mt: 3, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
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
						<Grid container justifyContent="center" sx={{ pb: 2 }}>
							<Grid item>
								<IconButton component={Link} to="/auth/login" sx={{ p: 0 }}>
									<ArrowCircleLeftIcon color="primary" />
								</IconButton>
							</Grid>
							<Grid item xs={8}>
								Already have an account? Sign in
							</Grid>
						</Grid>
					</Box>
				</Box>
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
		if ((values as any).field === '') {
			(errors as any).field = ['The', field, 'field is required.'].join(' ');
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
	formState: (state.form as any).SignupForm,
	ownProps: ownProps,
});

export default reduxForm({
	form: 'SignupForm',
	validate: validateSignup,
})(connect(mapStateToProps, null)(SignupForm));
