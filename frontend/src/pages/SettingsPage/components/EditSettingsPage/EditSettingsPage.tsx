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
			if (!file.type.match('image.*')) {
				alert('Пожалуйста, выберите изображение');
				return;
			}

			const previewUrl = URL.createObjectURL(file);
			setPreviewUrl(previewUrl);
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
		<div>
			<div className="flex flex-col md:flex-row gap-8 mb-8">
				<div className="flex-shrink-0">
					<img
						src={previewUrl || user.avatar || avatar}
						alt="Avatar preview"
						className="w-64 h-64 rounded-xl object-cover border-4 border-white shadow-lg"
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
						className="mt-4 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition-all duration-200"
					>
						Выбрать аватар
					</Button>
				</div>

				<div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-sm">
					<div className="space-y-6">
						<div>
							<label className="block text-gray-700 font-medium mb-2">
								Login
							</label>
							<Input
								className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								type="text"
								name="login"
								value={editForm.login}
								onChange={handleInputChange}
							/>
						</div>

						<div>
							<label className="block text-gray-700 font-medium mb-2">
								Имя пользователя
							</label>
							<Input
								className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								type="text"
								name="name"
								value={editForm.name}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-center space-x-4">
				<Button
					onClick={() => setIsEdit(false)}
					className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow transition-all duration-200 font-medium"
				>
					Отмена
				</Button>
				<Button
					onClick={handlerSaveUser}
					className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition-all duration-200 font-medium"
				>
					Сохранить
				</Button>
			</div>
		</div>
	);
};
