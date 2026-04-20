export const getThisWeekRange = () => {
	const today = new Date();

	const dayOfWeek = today.getDay();

	const diffForMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
	const mondayDay = today.getDate() + diffForMonday;

	const monday = new Date(today.getFullYear(), today.getMonth(), mondayDay, 0, 0, 0);

	const sundayDay = monday.getDate() + 6;
	const sunday = new Date(
		monday.getFullYear(),
		monday.getMonth(),
		sundayDay,
		23,
		59,
		59,
	);

	return {
		startDate: monday,
		endDate: sunday,
	};
};
