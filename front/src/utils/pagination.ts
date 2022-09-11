const takeMax = 10;

const pagingCount = (page: number, take: number, total: number): number => {
	return Math.ceil(total / takeMax);
};

export { pagingCount };
