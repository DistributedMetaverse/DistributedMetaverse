import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { AuthState } from '../store/types';
import Api from '../services/api';
import useCSRFToken from '../hooks/useCSRFToken';
import LoginForm from '../components/form/LoginForm';
import { LoginFormValues } from '../components/form/types';

interface LoginDispatchProps {
	auth: ActionCreatorsMapObject;
}

const LoginPage: FC<LoginDispatchProps> = ({ auth }): JSX.Element => {
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });
	const submitForm = (
		data: LoginFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		fetchCSRFTokenData();
		const userData = {
			username: data.email,
			password: data.password,
		};
		auth.login(userData, csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};
	return <LoginForm onSubmit={submitForm} />;
};

const mapStateToProps = (state: any) => ({
	isAuthenticated: (state.auth as AuthState).isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	auth: bindActionCreators(Api.auth, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
