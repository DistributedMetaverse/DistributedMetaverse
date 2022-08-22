import React, { FC, FormEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { AuthState } from '../store/types';
import Api from '../services/api';
import LoginForm from '../components/LoginForm';

interface LoginDispatchProps {
	actions: ActionCreatorsMapObject;
}

const LoginPage: FC<LoginDispatchProps> = ({ actions }): JSX.Element => {
	const submitForm = (event: FormEvent<HTMLFormElement>) => {
		const data = new FormData(event.currentTarget);
		const userData = {
			username: data.get('email'),
			password: data.get('password'),
		};
		actions.login(userData);
		event.preventDefault(); // 새로고침 방지
	};
	return <LoginForm onSubmit={submitForm} />;
};

const mapStateToProps = (state: any) => ({
	token: (state.auth as AuthState).token,
	isAuthenticated: (state.auth as AuthState).isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.auth, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
