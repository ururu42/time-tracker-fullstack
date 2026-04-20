export const getLastMonthRange = () => {
	const today = new Date();

	const firstDayLastMonth = new Date(
		today.getFullYear(),
		today.getMonth() - 1,
		1,
		0,
		0,
		0,
	);

	const lastDayLastMonth = new Date(
		today.getFullYear(),
		today.getMonth(),
		0,
		23,
		59,
		59,
		999,
	);

	return {
		startDate: firstDayLastMonth,
		endDate: lastDayLastMonth,
	};
};
