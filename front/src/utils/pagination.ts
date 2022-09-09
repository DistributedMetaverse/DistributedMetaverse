const pagingCount = (take: number, total: number): number => {
	return Math.ceil(total / take);
};

export { pagingCount };
