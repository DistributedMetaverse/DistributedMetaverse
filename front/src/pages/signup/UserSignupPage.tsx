import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../services/api';
import useCSRFToken from '../../hooks/useCSRFToken';
import SignupForm from '../../components/form/SignupForm';
import { SignupFormValues } from '../../components/form/types';

interface SignupDispatchProps {
	auth: ActionCreatorsMapObject;
}

const UserSignupPage: FC<SignupDispatchProps> = ({ auth }): JSX.Element => {
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });
	const submitForm = (
		data: SignupFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		fetchCSRFTokenData();
		const userData = {
			email: data.email,
			username: data.username,
			password: data.password,
		};
		auth.register(userData, csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};
	return <SignupForm onSubmit={submitForm} />;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	auth: bindActionCreators(Api.auth, dispatch),
});

export default connect(null, mapDispatchToProps)(UserSignupPage);
