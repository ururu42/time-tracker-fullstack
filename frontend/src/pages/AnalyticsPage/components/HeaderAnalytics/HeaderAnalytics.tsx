import { PeriodSelectComponent, ProjectSelectComponent } from './components';

export const HeaderAnalytics = ({
	period,
	onPeriodClick,
	onCustomDateChange,
	projectOption,
	setSelectedProject,
	selectedProject,
}) => {
	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
			<div className="flex items-center justify-between">
				<PeriodSelectComponent
					period={period}
					onPeriodClick={onPeriodClick}
					onCustomDateChange={onCustomDateChange}
				/>
				<ProjectSelectComponent
					projectOption={projectOption}
					setSelectedProject={setSelectedProject}
					selectedProject={selectedProject}
				/>
			</div>
		</div>
	);
};
