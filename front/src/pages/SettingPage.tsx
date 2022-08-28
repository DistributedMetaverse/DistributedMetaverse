import React, { FC, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../services/api';
import { Box, Paper, Alert } from '@mui/material';
import Setting from '../components/Setting';
import SettingModal from '../components/modal/SettingModal';

interface SettingPageProps {
	setting: ActionCreatorsMapObject;
}

const SettingPage: FC<SettingPageProps> = ({ setting }): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [serverId, setServerId] = useState(0);
	return (
		<Box sx={{ mt: -2 }}>
			<Paper sx={{ mb: 2, pt: 2, pb: 1 }}>
				<Alert severity="info">
					현재 Web Server에서 가용 중인 DB 세팅 정보들을 보여줍니다.
				</Alert>
			</Paper>
			<Setting setting={setting} setOpen={setOpen} setServerId={setServerId} />
			<SettingModal
				open={open}
				setting={setting}
				serverId={serverId}
				setOpen={setOpen}
			/>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setting: bindActionCreators(Api.setting, dispatch),
});

export default connect(null, mapDispatchToProps)(SettingPage);
