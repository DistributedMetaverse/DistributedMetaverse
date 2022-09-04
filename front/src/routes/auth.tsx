import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAccessToken, isAuthenticated } from '../utils/jwttoken';

const PrivateRoute: FC = (): JSX.Element => {
	if (getAccessToken() && isAuthenticated()) {
		return <Outlet />;
	}
	return <Navigate to={{ pathname: '/auth/login' }} replace />;
};

export default PrivateRoute;
