import React, { FC, FormEventHandler } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, ConfigProps } from 'redux-form';
import { validateEmail } from '../utils/validation';
import {
	Avatar,
	Button,
	CssBaseline,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright';
import renderField from './validate/TextField';

const theme = createTheme();

interface LoginProp {
	onSubmit: FormEventHandler<HTMLFormElement>;
	formState: any;
	submitting: boolean;
}

const LoginForm: FC<LoginProp> = ({
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
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
						<Field
							component={renderField}
							type="email"
							name="email"
							label="Email Address"
						/>
						<Field
							component={renderField}
							type="password"
							name="password"
							label="Password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
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
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/auth/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

// FormEvent<HTMLFormElement> → any 타입핑
const validateLogin = (values: any) => {
	const errors: any = {};

	const requiredFields = ['email', 'password'];

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

	if (
		Object.prototype.hasOwnProperty.call(values, 'password') &&
		(values.password.length < 8 || values.password.length > 100)
	) {
		errors.password = 'password field must be between 8 and 100 in size';
	}

	return errors;
};

const mapStateToProps = (state: ConfigProps, ownProps: any = {}) => ({
	formState: (state.form as any).LoginForm,
	ownProps: ownProps,
});

export default reduxForm({
	form: 'LoginForm',
	validate: validateLogin,
})(connect(mapStateToProps, null)(LoginForm));
