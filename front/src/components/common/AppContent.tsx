import React, { FC, ReactElement } from 'react';
import { Outlet } from 'react-router';
import AppHeader from './AppHeader';
import AppMenu from './AppMenu';
import AppFooter from './AppFooter';

export interface LayoutDefaultProps {
	children?: ReactElement;
}

const AppContent: FC<LayoutDefaultProps> = ({ children }): JSX.Element => {
	return (
		<>
			<AppHeader />
			<AppMenu />
			{children || <Outlet />}
			<AppFooter />
		</>
	);
};

export default AppContent;
