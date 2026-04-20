import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Main, HeaderAllPage } from '../../components';
import { HeaderAnalytics, ProjectDistribution, DymanicBarChart } from './components';
import { selectProjects } from '../../selectors';
import { fetchTimeEntriesAsync } from '../../action';

export const AnalyticsPage = () => {
	const [selectedPeriod, setSelectedPeriod] = useState('current-month');
	const [selectedProject, setSelectedProject] = useState(null);
	const [customDateRange, setCustomDateRange] = useState({});

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

	console.log('customDateRange', customDateRange);

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
					<DymanicBarChart
						selectedPeriod={selectedPeriod}
						selectedProject={selectedProject}
						customDateRange={customDateRange}
						projects={projects}
					/>
					<div>Топ 5 задач</div>
				</div>
			</div>
		</Main>
	);
};
