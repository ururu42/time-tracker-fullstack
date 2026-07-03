import { PeriodSelectComponent, ProjectSelectComponent } from './components';

export const HeaderAnalytics = ({
	period,
	onPeriodClick,
	setCustomDateRange,
	projectOption,
	setSelectedProject,
	selectedProject,
}) => {
	return (
		<div className="max-w-7xl mx-auto w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6 mb-4">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex flex-wrap items-center gap-1 lg:gap-0">
					<PeriodSelectComponent
						period={period}
						onPeriodClick={onPeriodClick}
						setCustomDateRange={setCustomDateRange}
					/>
				</div>
				<ProjectSelectComponent
					projectOption={projectOption}
					setSelectedProject={setSelectedProject}
					selectedProject={selectedProject}
				/>
			</div>
		</div>
	);
};
