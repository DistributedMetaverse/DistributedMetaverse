import React, { FC, BaseSyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	Avatar,
	Button,
	IconButton,
	CssBaseline,
	Grid,
	Box,
	Paper,
	Typography,
	Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Copyright from '../Copyright';
import RenderField from '../validate/TextField';
import { LoginFormValues } from './types';
import { defaultTheme } from '../../utils/theme';
import { validateEmail } from '../../utils/validation';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme(defaultTheme);

const schema = yup
	.object({
		email: yup
			.string()
			.required('이메일을 입력해주세요')
			.matches(validateEmail, '유효하지 않은 이메일 주소입니다')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		password: yup
			.string()
			.required('비밀번호를 입력해주세요')
			.min(8, '8자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
	})
	.required();

interface LoginProp {
	onSubmit: (
		data: LoginFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const LoginForm: FC<LoginProp> = ({ onSubmit }): JSX.Element => {
	const { control, handleSubmit, formState } = useForm<LoginFormValues>({
		resolver: yupResolver(schema),
	});
	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<ToastContainer
					theme="light" // light <-> dark <-> colored
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					closeOnClick
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<Paper
					sx={{
						mt: 12, // margin-top : 6 * 12 px
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
						<Typography variant="h6">Log In</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit(onSubmit)}
							noValidate
							sx={{ mt: 1 }}
						>
							<Controller
								name="email"
								control={control}
								render={({ field, fieldState, formState }) => (
									<RenderField
										type="email"
										label="Email Address"
										field={field}
										fieldState={fieldState}
										formState={formState}
									/>
								)}
							/>
							<Controller
								name="password"
								control={control}
								render={({ field, fieldState, formState }) => (
									<RenderField
										type="password"
										label="password"
										field={field}
										fieldState={fieldState}
										formState={formState}
									/>
								)}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								disabled={formState.isSubmitted && !formState.isValid}
								sx={{ mt: 3, mb: 2 }}
							>
								Sign In
							</Button>
							<Grid container justifyContent="center" sx={{ pb: 2 }}>
								<Grid item xs={8}>
									<Typography variant="subtitle2" sx={{ mt: 0.2 }}>
										{"Don't have an account? Sign Up"}
									</Typography>
								</Grid>
								<Grid item>
									<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
										<ArrowCircleRightIcon color="primary" />
									</IconButton>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Paper>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

export default LoginForm;
