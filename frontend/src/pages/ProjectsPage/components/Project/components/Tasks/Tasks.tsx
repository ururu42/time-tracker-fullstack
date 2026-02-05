import { Button } from '../../../../../../components';
import { TasksList, AddTaskForm } from './components';
import { useState } from 'react';

export const Tasks = ({ project }) => {
	const [isAddTask, setIsAddTask] = useState(false);

	console.log('isAddTask', isAddTask);
	return (
		<div>
			<h2 className="text-xl font-semibold text-gray-700 mb-4">Задачи проекта</h2>
			<Button
				className="bg-green-600 hover:bg-green-800 mb-6"
				onClick={() => {
					setIsAddTask(true);
				}}
			>
				Добавить задачу
			</Button>
			{isAddTask && <AddTaskForm project={project} setIsAddTask={setIsAddTask} />}
			<TasksList project={project} />
		</div>
	);
};
