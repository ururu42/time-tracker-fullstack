import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderAllPage, Loader } from '../../components';
import {
	HeaderAnalytics,
	ProjectDistribution,
	DymanicBarChart,
	TimeEntriesList,
} from './components';
import { selectProjects, selectTimeEntries, selectIsLoading } from '../../selectors';
import { fetchTimeEntriesAsync, ACTION_TYPE } from '../../action';
import { getDateRange, getChartData } from '../../utils';

export const AnalyticsPage = () => {
	const [selectedPeriod, setSelectedPeriod] = useState('current-month');
	const [selectedProject, setSelectedProject] = useState(null);
	const [customDateRange, setCustomDateRange] = useState({});
	const timeEntries = useSelector(selectTimeEntries);
	const [chartData, setChartData] = useState([]);
	const [filteredEntriesList, setFilteredEntriesList] = useState([]);

	const isLoading = useSelector(selectIsLoading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
		dispatch(fetchTimeEntriesAsync());
	}, [dispatch]);

	const projects = useSelector(selectProjects);

	const projectOption = projects
		.filter((project) => project && project.id)
		.map((project) => ({
			value: project.id.toString(),
			label: project.title || 'Без названия',
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
			? filteredByDate.filter((entry) => {
					return entry?.projectId
						? String(entry.projectId) === String(selectedProject)
						: false;
				})
			: filteredByDate;

		setChartData(chartData);
		setFilteredEntriesList(filteredEntries);
	}, [timeEntries, selectedPeriod, selectedProject, customDateRange]);

	return (
		<main className=" flex-1 p-6 min-h-screen bg-gray-50 ">
			{isLoading && <Loader />}
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
		</main>
	);
};
