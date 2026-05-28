import { groupEntriesByHours } from './groupEntriesByHours';
import { groupEntriesByDay } from './groupEntriesByDay';
import { calculateProjectStats } from './calculateProjectStats';

export const getChartData = (
	filteredByDate,
	selectedProject,
	selectedPeriod,
	startDate,
	endDate,
) => {
	let chartData = [];

	if (selectedProject && selectedPeriod === 'today') {
		const currentProjectByDate = filteredByDate.filter((entry) => {
			return entry.projectId && entry.projectId.toString() === selectedProject;
		});
		chartData = groupEntriesByHours(currentProjectByDate);
	} else if (selectedProject) {
		const currentProjectByDate = filteredByDate.filter((entry) => {
			return entry.projectId && entry.projectId.toString() === selectedProject;
		});

		chartData = groupEntriesByDay(currentProjectByDate, startDate, endDate);
	} else {
		const { stats } = calculateProjectStats(filteredByDate);

		chartData = stats.map((item) => ({
			name: item.projectTitle,
			hours: (item.totalDuration / 3600000),
			durationMs: item.totalDuration,
		}));
	}

	return chartData;
};
