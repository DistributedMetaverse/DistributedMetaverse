import { PreviewWidth, PreviewMarginLeft, PreviewDividerWidth } from './types';

// 1.1. 선택된 파일이 존재하지 X, width
const previewWidth: PreviewWidth = {
	header: 95, // ~ 520px
	headerMin520: 115,
	headerMin600: 150,
	headerMin710: 180,
	headerMin900: 200,
	headerMin1200: 200,
	headerGrid: 130,
	content: 220,
};

const previewWidthGrow: PreviewWidth = {
	header: 90, // ~ 520px
	headerMin520: 90,
	headerMin600: 110,
	headerMin710: 130,
	headerMin900: 180,
	headerMin1200: 230,
	headerGrid: 130,
	content: 350,
};

// 2.1. 선택된 파일이 존재하지 X, margin-left
const previewMarginLeft: PreviewMarginLeft = {
	header: 0, // ~ 520px
	headerMin520: 0,
	headerMin600: 0,
	headerMin710: 0,
	headerMin900: 0,
	headerMin1200: 0,
};

const previewMarginLeftGrow: PreviewMarginLeft = {
	header: -0.5, // ~ 520px
	headerMin520: -0.5,
	headerMin600: -1.5,
	headerMin710: -1,
	headerMin900: 0.5,
	headerMin1200: 0.5,
};

// 1.2. 선택된 파일이 존재 O, width
const previewWidthisFile: PreviewWidth = {
	header: 95, // ~ 520px
	headerMin520: 115,
	headerMin600: 140,
	headerMin710: 180,
	headerMin900: 200,
	headerMin1200: 200,
	headerGrid: 130,
	content: 220,
};

const previewWidthGrowisFile: PreviewWidth = {
	header: 90, // ~ 520px
	headerMin520: 90,
	headerMin600: 110,
	headerMin710: 120,
	headerMin900: 160,
	headerMin1200: 230,
	headerGrid: 130,
	content: 350,
};

// 2.2. 선택된 파일이 존재 O, width
const previewMarginLeftisFile: PreviewMarginLeft = {
	header: 1, // ~ 520px
	headerMin520: 0,
	headerMin600: -2.5,
	headerMin710: -5.5,
	headerMin900: -8,
	headerMin1200: -8,
};

const previewMarginLeftGrowisFile: PreviewMarginLeft = {
	header: 0, // ~ 520px
	headerMin520: 0,
	headerMin600: 0,
	headerMin710: -1,
	headerMin900: -4,
	headerMin1200: -10,
};

// 3. 선택된 파일이 존재 O, hr
const previewDividerWidth: PreviewDividerWidth = {
	header: '80%', // ~ 520px
	headerMin520: '90%',
	headerMin600: '110%',
	headerMin710: '140%',
	headerMin900: '160%',
	headerMin1200: '180%',
};

const previewDividerWidthGrow: PreviewDividerWidth = {
	header: '80%', // ~ 520px
	headerMin520: '80%',
	headerMin600: '90%',
	headerMin710: '95%',
	headerMin900: '130%',
	headerMin1200: '180%',
};

const previewWidthSetting = (path: string, exist: boolean): PreviewWidth => {
	if (path === '/') return exist ? previewWidthGrowisFile : previewWidthGrow;
	return exist ? previewWidthisFile : previewWidth;
};

const previewMarginLeftSetting = (
	path: string,
	exist: boolean
): PreviewMarginLeft => {
	if (path === '/')
		return exist ? previewMarginLeftGrowisFile : previewMarginLeftGrow;
	return exist ? previewMarginLeftisFile : previewMarginLeft;
};

const previewDividerWidthSetting = (path: string): PreviewDividerWidth => {
	if (path === '/') return previewDividerWidthGrow;
	return previewDividerWidth;
};

export {
	previewWidthSetting,
	previewMarginLeftSetting,
	previewDividerWidthSetting,
};
