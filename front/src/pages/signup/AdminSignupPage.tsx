import React, { FC, FormEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../services/api';
import RegistryForm from '../../components/form/RegistryForm';

interface SignupDispatchProps {
	auth: ActionCreatorsMapObject;
}

const AdminSignupPage: FC<SignupDispatchProps> = ({ auth }): JSX.Element => {
	const submitForm = (event: FormEvent<HTMLFormElement>) => {
		const data = new FormData(event.currentTarget);
		const userData = {
			email: data.get('email'),
			username: data.get('username'),
			password: data.get('password'),
		};
		auth.register(userData);
		event.preventDefault(); // 새로고침 방지
	};
	return <RegistryForm onSubmit={submitForm} />;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	auth: bindActionCreators(Api.auth, dispatch),
});

export default connect(null, mapDispatchToProps)(AdminSignupPage);
