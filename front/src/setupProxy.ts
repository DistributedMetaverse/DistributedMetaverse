import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/api', {
			target: process.env.REACT_APP_API_URL,
			pathRewrite: {
				'^/api': '',
			},
		})
	);
};
