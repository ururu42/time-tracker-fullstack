export const groupEntriesByDay = (entries, startDate, endDate) => {
	const daysEndHours = {};

	const currentDate = new Date(startDate);
	const lastDate = new Date(endDate);

	while (currentDate <= lastDate) {
		const dateStr = currentDate.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
		});

		daysEndHours[dateStr] = 0;
		currentDate.setDate(currentDate.getDate() + 1);
	}

	entries.map((entry) => {
		const date = new Date(entry.startTime);

		const dateStr = date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
		});

		daysEndHours[dateStr] = (daysEndHours[dateStr] || 0) + (entry.duration || 0);
	});

	return Object.keys(daysEndHours).map((date) => ({
		name: date,
		hours: daysEndHours[date] / 3600000,
		durationMs: daysEndHours[date],
	}));
};
