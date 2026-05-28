import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const ProjectList = ({ projects }) => {
	return (
		<div className="flex flex-col gap-4">
			{projects && projects.length > 0 ? (
				projects.map((project) => (
					<Link
						to={`/projects/${project.id}`}
						className="group flex justify-between items-center p-5 bg-white border border-gray-200 rounded-lg hover:border-green-400 hover:shadow-md transition-all duration-200"
						key={project.id}
					>
						<div className="flex items-center gap-4 flex-1">
							<div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
								<Icon
									icon="solar:layers-bold"
									className="w-6 h-6 text-green-800"
								/>
							</div>
							<div className="flex flex-col flex-1">
								<h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-600 transition-colors">
									{project.title}
								</h3>
								<p className="text-sm text-gray-500 mt-1 line-clamp-1">
									{project.description}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							{project.taskCount !== undefined && (
								<span className="flex items-center gap-1.5 text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
									<Icon
										icon="solar:clipboard-list-bold"
										className="w-4 h-4"
									/>
									{project.taskCount} задач
								</span>
							)}
							<Icon
								icon="solar:alt-arrow-right-linear"
								className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all"
							/>
						</div>
					</Link>
				))
			) : (
				<div className="text-center py-12 text-gray-500">
					<Icon
						icon="solar:folder-open-linear"
						className="w-16 h-16 mx-auto mb-4 text-gray-300"
					/>
					<p>Проектов пока нет</p>
				</div>
			)}
		</div>
	);
};
