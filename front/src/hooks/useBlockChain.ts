import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { ChainData, BlockData } from '../services/types';

interface BlockChainProps {
	offchain: ActionCreatorsMapObject;
}

const useBlockChain = ({
	offchain,
}: BlockChainProps): [ChainData, BlockData] => {
	const [chain, setChain] = useState<ChainData>({ data: [] });
	// const [transaction, setTransaction] = useState<TransactionResponseData>({
	// 	data: {
	// 		id: 0,
	// 		data: '',
	// 		datetime: '',
	// 	},
	// 	success: false,
	// 	status: '',
	// });
	const [block, setBlock] = useState<BlockData>({
		previousHash: '',
		transactions: [],
		hash: '',
		datetime: '',
		proof: 0,
		lastTransactionId: 0,
	});

	const fetchAndSetData = useCallback(async () => {
		const data = await offchain.chain(10);
		if (data && data.data.length > 0) {
			setChain(data);
			setBlock(data.data[0]);
		}
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [chain, block];
};

export default useBlockChain;
