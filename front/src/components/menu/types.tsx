interface DataProps {
	id: number;
	dataId: number;
	filename: string;
	fileSize: number;
	dataType: string;
}

interface DataListProps {
	datas?: Array<DataProps>;
}

export type { DataProps, DataListProps };
