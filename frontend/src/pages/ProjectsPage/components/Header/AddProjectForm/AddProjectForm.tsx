import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Input } from '../../../../../components';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { addProjectAsync } from '../../../../../action';

export const AddProjectForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addProjectAsync(newTitle, newDescription));
		navigate('/projects');
	};
	return (
		<div className="">
			<Button className="mb-2 bg-gray-500 hover:bg-gray-600" onClick={handleGoBack}>
				<Icon icon="mdi:arrow-back" className="w-6 h-6" />
			</Button>
			<form onSubmit={handleSubmit}>
				<div>
					<p className="text-gray-900 mb-2">Название проекта: </p>
					<Input
						placeholder="Введите название проекта"
						value={newTitle}
						onChange={({ target }) => setNewTitle(target.value)}
					/>
					<p className="text-gray-900 mb-2">Описание проекта: </p>
					<textarea
						className="w-full border border-gray-400 rounded h-30 p-4 mb-2"
						placeholder="Введите описание проекта"
						value={newDescription}
						onChange={({ target }) => setNewDescription(target.value)}
					></textarea>
				</div>
				<div className="flex justify-center gap-6">
					<Button type="submit" className="bg-green-600 hover:bg-green-700">
						Сохранить
					</Button>
					<Button
						type="button"
						className="bg-red-700 hover:bg-red-800"
						onClick={handleGoBack}
					>
						Отмена
					</Button>
				</div>
			</form>
		</div>
	);
};
