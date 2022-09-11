import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app: Application) => {
	app.use(
		createProxyMiddleware('/api', {
			target: process.env.REACT_APP_API_URL,
			changeOrigin: true,
			pathRewrite: {
				'^/api': '',
			},
		})
	);
	app.use(
		createProxyMiddleware('/ipfs', {
			target: process.env.REACT_APP_IPFS_URL,
			changeOrigin: true,
			pathRewrite: {
				'^/ipfs': '/api/v0',
			},
		})
	);
};
