import React, { FC } from 'react';
import { UploadInfo } from './types';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { timeFormat, fileSizeFormat } from '../../../utils/format';

interface UploadDetailProps {
	data: UploadInfo;
}

const UploadDetail: FC<UploadDetailProps> = ({ data }): JSX.Element => {
	const font: SxProps<Theme> = {
		fontSize: '0.7rem',
		fontWeight: 'bold',
	};
	return (
		<Paper>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell size="small" sx={font}>
							파일 이름
						</TableCell>
						<TableCell
							size="small"
							align="center"
							sx={{ width: '90px', ...font }}
						>
							파일 크기
						</TableCell>
						<TableCell size="small" sx={font}>
							파일 형식
						</TableCell>
						<TableCell
							size="small"
							align="center"
							sx={{ width: '90px', ...font }}
						>
							수정 날짜
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell size="small" sx={font}>
							{data.name}
						</TableCell>
						<TableCell size="small" align="center" sx={font}>
							{fileSizeFormat(data.size)}
						</TableCell>
						<TableCell size="small" sx={font}>
							{data.type}
						</TableCell>
						<TableCell size="small" align="center" sx={font}>
							{timeFormat(data.lastModified)}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Paper>
	);
};

export default UploadDetail;
