import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAccessToken } from '../utils/jwttoken';

const AdminRoute: FC = (): JSX.Element => {
	if (!getAccessToken()) {
		return <Outlet />;
	}
	return <Navigate to={{ pathname: '/auth/login' }} replace />;
};

export default AdminRoute;
