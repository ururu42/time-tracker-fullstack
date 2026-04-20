import { DropDown } from '../../../../../../components';

export const ProjectSelectComponent = ({
	projectOption,
	setSelectedProject,
	selectedProject,
}) => {
	return (
		<div className="flex items-center ml-6 px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer border-l border-gray-300">
			<DropDown
				options={projectOption}
				setSelectedProject={setSelectedProject}
				selectedProject={selectedProject}
			/>
		</div>
	);
};
