import { DropDown } from '../../../../../../components';

export const ProjectSelectComponent = ({
	projectOption,
	setSelectedProject,
	selectedProject,
}) => {
	return (
		<div className="flex items-center w-full lg:w-auto lg:ml-6 px-0 lg:px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer lg:border-l lg:border-gray-300">
			<div className="w-full lg:w-auto">
				<DropDown
					options={projectOption}
					setSelectedProject={setSelectedProject}
					selectedProject={selectedProject}
				/>
			</div>
		</div>
	);
};
