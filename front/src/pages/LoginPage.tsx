import React, { FC, FormEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { AuthState } from '../store/types';
import Api from '../services/api';
import useCSRFToken from '../hooks/useCSRFToken';
import LoginForm from '../components/form/LoginForm';

interface LoginDispatchProps {
	auth: ActionCreatorsMapObject;
}

const LoginPage: FC<LoginDispatchProps> = ({ auth }): JSX.Element => {
	const csrfData = useCSRFToken({ auth });
	const submitForm = (event: FormEvent<HTMLFormElement>) => {
		const data = new FormData(event.currentTarget);
		const userData = {
			username: data.get('email'),
			password: data.get('password'),
		};
		auth.login(userData, csrfData);
		event.preventDefault(); // 새로고침 방지
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
