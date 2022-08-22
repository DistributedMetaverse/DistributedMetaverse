import React, { FC, FormEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../services/api';
import SignupForm from '../components/SignupForm';

interface SignupDispatchProps {
	actions: ActionCreatorsMapObject;
}

const SignupPage: FC<SignupDispatchProps> = ({ actions }): JSX.Element => {
	const submitForm = (event: FormEvent<HTMLFormElement>) => {
		const data = new FormData(event.currentTarget);
		const userData = {
			email: data.get('email'),
			username: data.get('username'),
			password: data.get('password'),
		};
		actions.register(userData);
		event.preventDefault(); // 새로고침 방지
	};
	return <SignupForm onSubmit={submitForm} />;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.auth, dispatch),
});

export default connect(null, mapDispatchToProps)(SignupPage);
