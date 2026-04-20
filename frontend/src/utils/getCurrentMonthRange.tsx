export const getCurrentMonthRange = () => {
	const today = new Date();

	const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

	const endOfToday = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate(),
		23,
		59,
		59,
		999,
	);

	return {
		startDate: firstDayThisMonth,
		endDate: endOfToday,
	};
};
