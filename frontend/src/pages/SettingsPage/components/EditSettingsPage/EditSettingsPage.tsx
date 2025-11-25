// import { useState, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateUserAsync } from '../../../../action';
// import { Input, P, Button } from '../../../../components';
// import avatar from '../../../../img-test/8e09097b-66c5-4bac-83a2-02779c3c1f4e.jpeg';

// export const EditSettingsPage = ({ user, setIsEdit }) => {
// 	const [editForm, setEditForm] = useState({ login: '', name: '' });
// 	const dispatch = useDispatch();
// 	const [selectedAvatar, setSelectedAvatar] = useState(null);
// 	const [previewUrl, setPreviewUrl] = useState(null);
// 	const fileInputRef = useRef();

// 	const handleAvatarChange = (e) => {
// 		const file = e.target.files[0];
// 		if (file) {
// 			// Проверка типа файла
// 			if (!file.type.match('image.*')) {
// 				alert('Пожалуйста, выберите изображение');
// 				return;
// 			}

// 			// Создание URL для предпросмотра
// 			const previewUrl = URL.createObjectURL(file);
// 			setPreviewUrl(previewUrl);

// 			// Сохранение файла для последующей отправки
// 			setSelectedAvatar(file);
// 		}
// 	};

// 	const handlerSaveUser = () => {
// 		console.log(user._id, editForm);
// 		dispatch(updateUserAsync(user.id, editForm));
// 		setIsEdit(false);
// 	};
// 	const handleInputChange = ({ target }) => {
// 		const { name, value } = target;

// 		setEditForm((prev) => {
// 			return {
// 				...prev,
// 				[name]: value,
// 			};
// 		});
// 	};
// 	return (
// 		<>
// 			<div className="flex mt-6">
// 				<div className="flex-shrink-0">
// 					<Input
// 						type="file"
// 						accept="image/*"
// 						onChange={handleAvatarChange}
// 						className="hidden"
// 						ref={fileInputRef}
// 						className="w-70 h-100 rounded object-cover border border-gray-500 shadow-xl"
// 					/>
// 					<Button
// 						type="button"
// 						onClick={() => fileInputRef.current.click()}
// 						className="bg-blue-500 text-white px-4 py-2 rounded"
// 					>
// 						Выбрать аватар
// 					</Button>
// 				</div>
// 				<div className="ml-8 flex-1">
// 					<div className="bg-gray-50 p-6 rounded-lg shadow-sm">
// 						<P className="font-semibold text-gray-900">
// 							Login:{' '}
// 							<Input
// 								className="font-normal text-gray-700"
// 								type="text"
// 								name="login"
// 								value={editForm.login}
// 								onChange={handleInputChange}
// 							></Input>
// 						</P>
// 						<P className="font-semibold text-gray-900">
// 							Имя Пользователя:
// 							<Input
// 								className="font-normal text-gray-700"
// 								type="text"
// 								name="name"
// 								value={editForm.name}
// 								onChange={handleInputChange}
// 							></Input>
// 						</P>
// 					</div>
// 				</div>
// 			</div>
// 			<Button onClick={handlerSaveUser}>Сохранить</Button>
// 		</>
// 	);
// };

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ACTION_TYPE } from '../../../../action';
import { Input, P, Button } from '../../../../components';
import avatar from '../../../../img-test/8e09097b-66c5-4bac-83a2-02779c3c1f4e.jpeg';

export const EditSettingsPage = ({ user, setIsEdit }) => {
	const [editForm, setEditForm] = useState({
		login: user.login || '',
		name: user.name || '',
	});
	const dispatch = useDispatch();
	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const fileInputRef = useRef();

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			// Проверка типа файла
			if (!file.type.match('image.*')) {
				alert('Пожалуйста, выберите изображение');
				return;
			}

			// Создание URL для предпросмотра
			const previewUrl = URL.createObjectURL(file);
			setPreviewUrl(previewUrl);

			// Сохранение файла для последующей отправки
			setSelectedAvatar(file);
		}
	};

	const handlerSaveUser = async () => {
		const formData = new FormData();
		if (selectedAvatar) {
			formData.append('avatar', selectedAvatar);
		}
		if (editForm.name) {
			formData.append('name', editForm.name);
		}
		if (editForm.login) {
			formData.append('login', editForm.login);
		}

		try {
			const response = await fetch('/api/user/me', {
				method: 'PUT',
				credentials: 'include',
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				dispatch({ type: ACTION_TYPE.UPDATE_USER, payload: result.data });
				setIsEdit(false);
			}
		} catch (error) {
			console.error('Ошибка при обновлении:', error);
		}
	};

	const handleInputChange = ({ target }) => {
		const { name, value } = target;

		setEditForm((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	return (
		<>
			<div className="flex mt-6">
				<div className="flex-shrink-0">
					<img
						src={previewUrl || user.avatar || avatar}
						alt="Avatar preview"
						className="w-70 h-100 rounded object-cover border border-gray-500 shadow-xl"
					/>
					<Input
						type="file"
						accept="image/*"
						onChange={handleAvatarChange}
						className="hidden"
						ref={fileInputRef}
					/>
					<Button
						type="button"
						onClick={() => fileInputRef.current.click()}
						className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
					>
						Выбрать аватар
					</Button>
				</div>
				<div className="ml-8 flex-1">
					<div className="bg-gray-50 p-6 rounded-lg shadow-sm">
						<P className="font-semibold text-gray-900 mb-2">
							Login:
							<Input
								className="font-normal text-gray-700 block mt-1"
								type="text"
								name="login"
								value={editForm.login}
								onChange={handleInputChange}
							/>
						</P>
						<P className="font-semibold text-gray-900 mb-2">
							Имя Пользователя:
							<Input
								className="font-normal text-gray-700 block mt-1"
								type="text"
								name="name"
								value={editForm.name}
								onChange={handleInputChange}
							/>
						</P>
					</div>
				</div>
			</div>
			<Button onClick={handlerSaveUser} className="mt-4">
				Сохранить
			</Button>
		</>
	);
};
