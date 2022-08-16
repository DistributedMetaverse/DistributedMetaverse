import React, { FC } from 'react';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './store';
import RootRoutes from './routes/index';
import './App.css';

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});

const App: FC = (): JSX.Element => {
	return (
		<div className="App">
			<Provider store={store}>
				<RootRoutes />
			</Provider>
		</div>
	);
};

export default App;
