import React, { FC } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PreviewState } from '../../store/types';
import Api from '../../services/api';
import useDataInfoDetails from '../../hooks/useDataInfoDetails';
import { Box, Slide, Typography } from '@mui/material';

interface UseFileProps {
	actions: ActionCreatorsMapObject;
	dataId: string;
}

interface AppPreviewProps {
	preview: PreviewState;
	actions: ActionCreatorsMapObject;
}

const UseFile: FC<UseFileProps> = ({ actions, dataId }): JSX.Element => {
	const data = useDataInfoDetails({ actions, dataId });
	return (
		<Typography
			component="span"
			variant="h6"
			sx={{
				ml: 1,
				mr: 1,
				width: '100%',
				alignItems: 'center',
				fontSize: '0.7rem',
			}}
		>
			{data.filename}
		</Typography>
	);
};

const NoFile: FC = (): JSX.Element => {
	return (
		<Typography
			component="span"
			variant="h6"
			sx={{
				ml: 1,
				mr: 1,
				width: '100%',
				alignItems: 'center',
				fontSize: '0.7rem',
			}}
		>
			파일을 선택해 주세요
		</Typography>
	);
};

const AppPreview: FC<AppPreviewProps> = ({ preview, actions }): JSX.Element => {
	const { dataId, isActive } = preview;
	return (
		<Slide
			direction="left"
			in={isActive}
			appear={isActive}
			timeout={isActive ? 300 : 10}
			mountOnEnter
			unmountOnExit
		>
			<Box
				sx={{
					width: 200,
					display: 'flex',
					alignItems: 'center',
					bgcolor: 'background.paper',
					zIndex: 1201,
				}}
			>
				{isActive ? <UseFile actions={actions} dataId={dataId} /> : <NoFile />}
			</Box>
		</Slide>
	);
};

const mapStateToProps = (state: any) => ({
	preview: state.preview as PreviewState,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	actions: bindActionCreators(Api.data, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppPreview);
