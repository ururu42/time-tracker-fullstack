import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Main, HeaderAllPage } from '../../components';
import {
	HeaderAnalytics,
	ProjectDistribution,
	DymanicBarChart,
	TimeEntriesList,
} from './components';
import { selectProjects, selectTimeEntries } from '../../selectors';
import { fetchTimeEntriesAsync } from '../../action';
import { getDateRange, getChartData } from '../../utils';

export const AnalyticsPage = () => {
	const [selectedPeriod, setSelectedPeriod] = useState('current-month');
	const [selectedProject, setSelectedProject] = useState(null);
	const [customDateRange, setCustomDateRange] = useState({});
	const timeEntries = useSelector(selectTimeEntries);
	const [chartData, setChartData] = useState([]);
	const [filteredEntriesList, setFilteredEntriesList] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTimeEntriesAsync);
	}, [dispatch]);

	const projects = useSelector(selectProjects);
	const projectOption = projects.map((project) => ({
		value: project.id.toString(),
		label: project.title,
	}));

	const handlePeriodChange = (newPeriod) => {
		setSelectedPeriod(newPeriod);

		if (newPeriod !== 'custom') {
			setCustomDateRange(null);
		}
	};

	useEffect(() => {
		const { startDate, endDate } = getDateRange(selectedPeriod, customDateRange);

		const start = new Date(startDate).getTime();
		const end = new Date(endDate).getTime();

		const filteredByDate = timeEntries.filter((entry) => {
			const time = new Date(entry.startTime).getTime();
			return time >= start && time <= end;
		});

		const chartData = getChartData(
			filteredByDate,
			selectedProject,
			selectedPeriod,
			startDate,
			endDate,
		);

		const filteredEntries = selectedProject
			? filteredByDate.filter(
					(entry) => entry.projectId.toString() === selectedProject,
				)
			: filteredByDate;

		setChartData(chartData);
		setFilteredEntriesList(filteredEntries);
	}, [timeEntries, selectedPeriod, selectedProject, customDateRange]);

	return (
		<Main>
			<HeaderAllPage children={'Отчеты'} />
			<HeaderAnalytics
				period={selectedPeriod}
				onPeriodClick={handlePeriodChange}
				onCustomDateChange={setCustomDateRange}
				projectOption={projectOption}
				setSelectedProject={setSelectedProject}
				selectedProject={selectedProject}
			/>
			<div className="flex items-start w-full gap-6">
				<div className="flex-shrink-0 w-[400px]">
					<ProjectDistribution
						selectedPeriod={selectedPeriod}
						selectedProject={selectedProject}
						customDateRange={customDateRange}
						projects={projects}
					/>
				</div>
				<div className="w-full min-w-0">
					<DymanicBarChart chartData={chartData} />
				</div>
			</div>
			<TimeEntriesList
				filteredEntriesList={filteredEntriesList}
				selectedProject={selectedProject}
				projects={projects}
			/>
		</Main>
	);
};
