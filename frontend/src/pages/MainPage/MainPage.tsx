import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../action';
import { selectProjects } from '../../selectors';
import { DropDown, Textarea } from '../../components';

export const MainPage = () => {
	const projects = useSelector(selectProjects);

	const [newDescription, setNewDescription] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProjects());
	}, [dispatch]);

	console.log(projects);

	return (
		<div>
			<div className="max-w-6xl mx-auto">
				<div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white rounded-t-2xl">
					<h1 className="text-4xl font-bold">Time Tracker</h1>
					<p className="opacity-90 mt-2">Отслеживайте ваше время эффективно</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-white">
					<div className="lg:col-span-2"></div>

					<div className="space-y-6">
						<div>
							<label className="block text-gray-70 font-medium mb-2">
								Проект
							</label>
							<DropDown projects={projects} />
						</div>

						<div>
							<label className="block text-gray-700 font-medium mb-2">
								Описание задачи
							</label>
							<Textarea
								placeholder="Введите описание задачи..."
								value={newDescription}
								onChange={({ target }) => setNewDescription(target.value)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
