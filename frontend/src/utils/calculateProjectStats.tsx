export const calculateProjectStats = (timeEntries = []) => {
	const grouped = timeEntries.reduce((acc, entry) => {
		const { projectId, projectTitle, duration } = entry;

		if (!acc[projectId]) {
			acc[projectId] = { projectId, projectTitle, totalDuration: 0 };
		}

		acc[projectId].totalDuration += duration;
		return acc;
	}, {});

	const statsArray = Object.values(grouped);

	const totalDuration = statsArray.reduce((sum, item) => sum + item.totalDuration, 0);

	const statsWithPercent = statsArray.map((item) => ({
		...item,
		percent: Math.round((item.totalDuration / totalDuration) * 100),
	}));

	return {
		stats: statsWithPercent,
		totalDuration,
	};
};
