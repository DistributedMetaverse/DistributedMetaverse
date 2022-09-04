import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app: Application) => {
	app.use(
		createProxyMiddleware('/api', {
			target: process.env.REACT_APP_API_URL,
			pathRewrite: {
				'^/api': '',
			},
		})
	);
};
