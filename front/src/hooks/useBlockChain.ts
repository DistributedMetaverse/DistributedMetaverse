import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { ChainData, BlockData, StatData } from '../services/types';

interface BlockChainProps {
	offchain: ActionCreatorsMapObject;
}

const useBlockChain = ({
	offchain,
}: BlockChainProps): [ChainData, BlockData, StatData] => {
	const [target, setTarget] = useState(0);
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
	const [stat, setStat] = useState<StatData>({
		lastBlockHash: '',
		lastBlocksCount: 0,
		lastTransactionId: 0,
	});

	const fetchAndSetData = useCallback(async () => {
		const data = await offchain.chain(10);
		const status = await offchain.stat();
		data.data.map((value: BlockData, index: number) => {
			if (value.transactions) {
				setTarget(index);
			}
		});
		if (data && data.data.length > 0) {
			setChain(data);
			setBlock(data.data[target]);
		}
		setStat(status);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [chain, block, stat];
};

export default useBlockChain;
