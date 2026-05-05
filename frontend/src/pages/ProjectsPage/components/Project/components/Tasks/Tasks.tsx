import { TasksList, AddTaskForm } from './components';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export const Tasks = ({ project }) => {
	const [isAddTask, setIsAddTask] = useState(false);

	return (
		<div>
			<div className="flex items-center gap-3 mb-6">
				<h2 className="text-xl font-semibold text-gray-700">Задачи проекта</h2>

				<div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm">
					<button
						className="w-full h-full flex items-center justify-center transition-transform active:scale-90"
						onClick={() => {
							setIsAddTask(true);
						}}
					>
						<Icon
							icon="solar:add-circle-bold"
							className="text-emerald-600 w-full h-full"
						/>
					</button>
				</div>
			</div>

			{isAddTask && <AddTaskForm project={project} setIsAddTask={setIsAddTask} />}
			<TasksList project={project} />
		</div>
	);
};
