import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ACTION_TYPE } from '../../../../action';
import { Input, Button } from '../../../../components';
import { Icon } from '@iconify/react';
import { API_URL } from '../../../../config';

export const EditSettingsPage = ({
	user,
	setIsEdit,
	avatarSrc,
	removeAvatar,
	setRemoveAvatar,
	previewUrl,
	setPreviewUrl,
}) => {
	const [editForm, setEditForm] = useState({
		login: user.login || '',
		name: user.name || '',
	});

	const dispatch = useDispatch();
	const [selectedAvatar, setSelectedAvatar] = useState(null);

	const fileInputRef = useRef();

	const isChanged =
		selectedAvatar ||
		removeAvatar ||
		editForm.login !== user.login ||
		editForm.name !== user.name;

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
			setRemoveAvatar(false);
		}
	};

	const handlerSaveUser = async () => {
		const formData = new FormData();

		if (selectedAvatar) {
			formData.append('avatar', selectedAvatar);
		}

		if (editForm.name) formData.append('name', editForm.name);
		if (editForm.login) formData.append('login', editForm.login);

		if (removeAvatar) {
			formData.append('removeAvatar', 'true');
		}

		try {
			const response = await fetch(`${API_URL}/api/user/me`, {
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

		setEditForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onRemoveAvatar = () => {
		setSelectedAvatar(null);
		setPreviewUrl(null);
		setRemoveAvatar(true);

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row gap-8">
				<div className="flex-shrink-0 flex flex-col items-center">
					{avatarSrc ? (
						<img
							src={avatarSrc}
							alt="Avatar preview"
							className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-4 border-white shadow-md"
						/>
					) : (
						<div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gray-100 border-4 border-white shadow-md flex items-center justify-center">
							<Icon
								icon="solar:crown-line-duotone"
								className="w-20 h-20 text-gray-400"
							/>
						</div>
					)}

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
						className="mt-4 flex items-center gap-2 px-4 py-2 !bg-blue-400 hover:!bg-gray-300 text-gray-700 rounded-xl transition-all"
					>
						<Icon icon="solar:camera-bold" className="w-5 h-5" />
						Выбрать фото
					</Button>
					{!removeAvatar && (previewUrl || user.avatar) && (
						<Button
							type="button"
							onClick={onRemoveAvatar}
							className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-400 hover:bg-gray-300 text-gray-700 rounded-xl transition-all"
						>
							Удалить фото
						</Button>
					)}
				</div>
				<div className="flex-1 rounded-2xl p-6 border border-gray-200">
					<div className="space-y-5">
						<div>
							<label className="block text-sm text-gray-500 mb-1">
								Login
							</label>
							<Input
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
								type="text"
								name="login"
								value={editForm.login}
								onChange={handleInputChange}
							/>
						</div>

						<div>
							<label className="block text-sm text-gray-500 mb-1">
								Имя пользователя
							</label>
							<Input
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
								type="text"
								name="name"
								value={editForm.name}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center gap-4 pt-4">
				<Button
					onClick={() => setIsEdit(false)}
					className="px-6 py-3 bg-red-400 hover:bg-gray-300 text-gray-700 rounded-xl transition-all"
				>
					Отмена
				</Button>

				<Button
					disabled={!isChanged}
					onClick={handlerSaveUser}
					className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-sm transition-all"
				>
					<Icon icon="solar:diskette-bold" className="w-5 h-5" />
					Сохранить
				</Button>
			</div>
		</div>
	);
};
