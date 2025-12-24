import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../action';
import { selectProjects } from '../../selectors';
import { DropDown, Timer } from '../../components';

export const MainPage = () => {
	const projects = useSelector(selectProjects);
	console.log(projects);

	const [newDescription, setNewDescription] = useState('');

	const dispatch = useDispatch()

	useEffect(() => {
		const fetchProjectsWithLastPage = async () => {
			const returnedLastPage = await dispatch(
				fetchProjects(1, -1, "") as any,
			); // Временное решение для типизации
		};

		fetchProjectsWithLastPage();
	}, [dispatch]);

	return (
		<div>
			<Timer />
			<DropDown projects={projects} />
			<textarea
				className="w-full border border-gray-400 rounded h-30 p-4 mb-2"
				placeholder="Введите описание проекта"
				value={newDescription}
				onChange={({ target }) => setNewDescription(target.value)}
			></textarea>
		</div>
	);
};
