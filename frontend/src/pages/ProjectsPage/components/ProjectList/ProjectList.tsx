import { Link } from 'react-router-dom';

export const ProjectList = ({ projects }) => {
	return (
		<div className="flex flex-col">
			{projects && projects.length > 0 ? (
				projects.map((project) => (
					<Link
						to={`/projects/${project._id}`}
						className="flex justify-between items-center p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
						key={project._id}
					>
						<div className="flex flex-col">
							<h3 className="font-semibold text-xl text-gray-700 mb-2">
								{project.title}
							</h3>
							<p className="text-base text-gray-500">
								{project.description}
							</p>
							{project.taskCount !== undefined && (
								<span className="text-sm text-gray-400 mt-1">
									Задач: {project.taskCount}
								</span>
							)}
						</div>
					</Link>
				))
			) : (
				<p>No projects found</p>
			)}
		</div>
	);
};
