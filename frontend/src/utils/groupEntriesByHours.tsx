export const groupEntriesByHours = (entries) => {
	const hoursEndTime = {};

	for (let i = 0; i <= 23; i++) {
		if (i < 10) {
			hoursEndTime['0' + i + ':00'] = 0;
		} else {
			hoursEndTime[i + ':00'] = 0;
		}
	}

	entries.forEach((entry) => {
		const hour = new Date(entry.startTime).getHours();

		const key = hour < 10 ? '0' + hour + ':00' : hour + ':00';

		hoursEndTime[key] = (hoursEndTime[key] || 0) + (entry.duration || 0);
	});

	return Object.keys(hoursEndTime).map((date) => ({
		name: date,
		hours: hoursEndTime[date] / 3600000,
		durationMs: hoursEndTime[date],
	}));
};
