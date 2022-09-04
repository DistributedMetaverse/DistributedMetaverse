import React, { FC, BaseSyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
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
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Copyright from '../Copyright';
import RenderField from '../validate/TextField';
import { SignupFormValues } from './types';
import { defaultTheme } from '../../utils/theme';
import { validateEmail, validatePassword } from '../../utils/validation';

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
			.matches(validatePassword, '특수문자 숫자와 대소문자가 필요합니다')
			.min(8, '8자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		repeat_password: yup
			.string()
			.required('비밀번호를 입력해주세요')
			.oneOf([yup.ref('password')], '패스워드가 일치하지 않습니다'),
	})
	.required();

interface SignupProp {
	onSubmit: (
		data: SignupFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const SignupForm: FC<SignupProp> = ({ onSubmit }): JSX.Element => {
	const { control, handleSubmit, formState } = useForm<SignupFormValues>({
		resolver: yupResolver(schema),
	});
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
						<Typography variant="h6">Sign Up</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit(onSubmit)}
							noValidate
							sx={{ mt: 0 }}
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
								name="username"
								control={control}
								render={({ field, fieldState, formState }) => (
									<RenderField
										type="text"
										label="username"
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
							<Controller
								name="repeat_password"
								control={control}
								render={({ field, fieldState, formState }) => (
									<RenderField
										type="password"
										label="repeat_password"
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
								Sign Up
							</Button>
							<Grid container justifyContent="center" sx={{ pb: 2 }}>
								<Grid item>
									<IconButton component={Link} to="/auth/login" sx={{ p: 0 }}>
										<ArrowCircleLeftIcon color="primary" />
									</IconButton>
								</Grid>
								<Grid item xs={8}>
									<Typography variant="subtitle2" sx={{ mt: 0.2 }}>
										Already have an account? Sign in
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Paper>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
};

export default SignupForm;
