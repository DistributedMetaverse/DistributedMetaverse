import React, { FC, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../services/api';
import { Box, Paper, Alert } from '@mui/material';
import Setting from '../components/Setting';
import SettingModal from '../components/modal/SettingModal';

interface SettingPageProps {
	actions: ActionCreatorsMapObject;
}

const SettingPage: FC<SettingPageProps> = ({ actions }): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [serverId, setServerId] = useState(0);
	return (
		<Box>
			<Paper sx={{ mb: 2, pt: 2, pb: 1 }}>
				<Alert severity="info">
					현재 Web Server에서 가용 중인 DB 세팅 정보들을 보여줍니다.
				</Alert>
			</Paper>
			<Setting actions={actions} setOpen={setOpen} setServerId={setServerId} />
			<SettingModal
				open={open}
				actions={actions}
				serverId={serverId}
				setOpen={setOpen}
			/>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(Api.setting, dispatch),
});

export default connect(null, mapDispatchToProps)(SettingPage);
