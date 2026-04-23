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
		chartData = groupEntriesByHours(filteredByDate);
	} else if (selectedProject) {
		const currentProjectByDate = filteredByDate.filter((entry) => {
			return entry.projectId.toString() === selectedProject;
		});

		chartData = groupEntriesByDay(currentProjectByDate, startDate, endDate);
	} else {
		const { stats } = calculateProjectStats(filteredByDate);

		chartData = stats.map((item) => ({
			name: item.projectTitle,
			hours: (item.totalDuration / 3600000).toFixed(1),
		}));
	}

	return chartData;
};
