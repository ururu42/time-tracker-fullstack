export const getTodayRange = () => {
	const today = new Date();

	const startDate = new Date(today);
	startDate.setHours(0, 0, 0, 0);

	const endDate = new Date(today);
	endDate.setHours(23, 59, 59, 999);

	return { startDate, endDate };
};
