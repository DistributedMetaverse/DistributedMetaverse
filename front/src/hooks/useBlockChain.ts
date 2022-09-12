import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { BlockData } from '../services/types';

interface BlockChainProps {
	offchain: ActionCreatorsMapObject;
}

const useBlockChain = ({ offchain }: BlockChainProps): BlockData => {
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
		const data = await offchain.chain(1);
		if (data && data.blocks.length > 0) setBlock(data.blocks[0]);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return block;
};

export default useBlockChain;
