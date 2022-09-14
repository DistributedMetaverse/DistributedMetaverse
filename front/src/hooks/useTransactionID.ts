import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { TransactionResponseData } from '../services/types';

interface TransactionIDProps {
	block: ActionCreatorsMapObject;
	transactionId: number;
}

const useTransactionID = ({
	block,
	transactionId,
}: TransactionIDProps): TransactionResponseData => {
	const [transaction, setTransaction] = useState<TransactionResponseData>({
		data: {
			id: 0,
			data: '',
			datetime: '',
		},
		success: false,
		status: '',
	});

	const fetchAndSetData = useCallback(
		async (transactionId: number) => {
			const data = await block.transaction(transactionId);
			setTransaction(data);
		},
		[transactionId]
	);

	useEffect(() => {
		fetchAndSetData(transactionId);
	}, [fetchAndSetData]);

	return transaction;
};

export default useTransactionID;
