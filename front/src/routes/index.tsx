import React, { FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppContent from '../components/common/AppContent';
import {
	Home,
	Login,
	AdminSignup,
	UserSignup,
	File,
	Video,
	Photo,
	Recent,
	Setting,
	NotFound,
} from '../pages/index';
import PrivateRoute from './auth';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './route.css';

const AuthRoutes: FC = (): JSX.Element => {
	const location = useLocation();
	const path = location.pathname.replace('/auth', '');
	const slide = path === '/login' ? 'left' : 'right';
	return (
		<TransitionGroup>
			<CSSTransition key={location.pathname} classNames={slide} timeout={300}>
				<Routes location={location}>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<UserSignup />} />
					<Route path="/admin" element={<AdminSignup />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
};

const MainRoutes: FC = (): JSX.Element => {
	const location = useLocation();
	return (
		<TransitionGroup>
			<CSSTransition
				key={location.pathname}
				in={true}
				classNames="fade"
				timeout={300}
				unmountOnExit
			>
				<Routes location={location}>
					<Route path="/" element={<Home />} />
					<Route path="/file" element={<File />} />
					<Route path="/video" element={<Video />} />
					<Route path="/photo" element={<Photo />} />
					<Route path="/recent" element={<Recent />} />
					<Route path="/setting" element={<Setting />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
};

const RootRoutes: FC = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/auth/*" element={<AuthRoutes />} />
			<Route element={<PrivateRoute />}>
				<Route element={<AppContent />}>
					<Route path="/*" element={<MainRoutes />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default RootRoutes;
