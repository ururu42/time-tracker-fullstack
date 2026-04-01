const isToday = (entry) => {
	const today = new Date();
	const entryDate = new Date(entry.startTime);

	return (
		entryDate.getFullYear() === today.getFullYear() &&
		entryDate.getMonth() === today.getMonth() &&
		entryDate.getDate() === today.getDate()
	);
};

export const selectTodayTimeEntries = (state: any) =>
	state.timeEntries.entries.filter((entry) => isToday(entry));
