// import { useState, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { ACTION_TYPE } from '../../../../action';
// import { Input, P, Button } from '../../../../components';
// import avatar from '../../../../img-test/8e09097b-66c5-4bac-83a2-02779c3c1f4e.jpeg';

// export const EditSettingsPage = ({ user, setIsEdit }) => {
// 	const [editForm, setEditForm] = useState({
// 		login: user.login || '',
// 		name: user.name || '',
// 	});
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

// 	const handlerSaveUser = async () => {
// 		const formData = new FormData();
// 		if (selectedAvatar) {
// 			formData.append('avatar', selectedAvatar);
// 		}
// 		if (editForm.name) {
// 			formData.append('name', editForm.name);
// 		}
// 		if (editForm.login) {
// 			formData.append('login', editForm.login);
// 		}

// 		try {
// 			const response = await fetch('/api/user/me', {
// 				method: 'PUT',
// 				credentials: 'include',
// 				body: formData,
// 			});

// 			if (response.ok) {
// 				const result = await response.json();
// 				dispatch({ type: ACTION_TYPE.UPDATE_USER, payload: result.data });
// 				setIsEdit(false);
// 			}
// 		} catch (error) {
// 			console.error('Ошибка при обновлении:', error);
// 		}
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
// 					<img
// 						src={previewUrl || user.avatar || avatar}
// 						alt="Avatar preview"
// 						className="w-70 h-100 rounded object-cover border border-gray-500 shadow-xl"
// 					/>
// 					<Input
// 						type="file"
// 						accept="image/*"
// 						onChange={handleAvatarChange}
// 						className="hidden"
// 						ref={fileInputRef}
// 					/>
// 					<Button
// 						type="button"
// 						onClick={() => fileInputRef.current.click()}
// 						className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
// 					>
// 						Выбрать аватар
// 					</Button>
// 				</div>
// 				<div className="ml-8 flex-1">
// 					<div className="bg-gray-50 p-6 rounded-lg shadow-sm">
// 						<P className="font-semibold text-gray-900 mb-2">
// 							Login:
// 							<Input
// 								className="font-normal text-gray-700 block mt-1"
// 								type="text"
// 								name="login"
// 								value={editForm.login}
// 								onChange={handleInputChange}
// 							/>
// 						</P>
// 						<P className="font-semibold text-gray-900 mb-2">
// 							Имя Пользователя:
// 							<Input
// 								className="font-normal text-gray-700 block mt-1"
// 								type="text"
// 								name="name"
// 								value={editForm.name}
// 								onChange={handleInputChange}
// 							/>
// 						</P>
// 					</div>
// 				</div>
// 			</div>
// 			<Button onClick={handlerSaveUser} className="mt-4">
// 				Сохранить
// 			</Button>
// 		</>
// 	);
// };

// import { useState, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { ACTION_TYPE } from '../../../../action';
// import { Input, P, Button } from '../../../../components';
// import avatar from '../../../../img-test/8e09097b-66c5-4bac-83a2-02779c3c1f4e.jpeg';
// import Cropper from 'react-easy-crop';

// export const EditSettingsPage = ({ user, setIsEdit }) => {
// 	const [editForm, setEditForm] = useState({
// 		login: user.login || '',
// 		name: user.name || '',
// 	});
// 	const dispatch = useDispatch();
// 	const [selectedAvatar, setSelectedAvatar] = useState(null);
// 	const [previewUrl, setPreviewUrl] = useState(null);
// 	const fileInputRef = useRef();
// 	const [crop, setCrop] = useState({ x: 0, y: 0 });
// 	const [zoom, setZoom] = useState(1);
// 	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

// 	const handleAvatarChange = (e) => {
// 		const file = e.target.files[0];
// 		if (file) {
// 			if (!file.type.match('image.*')) {
// 				alert('Пожалуйста, выберите изображение');
// 				return;
// 			}

// 			const previewUrl = URL.createObjectURL(file);
// 			setPreviewUrl(previewUrl);
// 			setSelectedAvatar(file);
// 		}
// 	};

// 	const onCropComplete = (croppedArea, croppedAreaPixels) => {
// 		setCroppedAreaPixels(croppedAreaPixels);
// 	};

// 	const handlerSaveUser = async () => {
// 		const formData = new FormData();
// 		if (selectedAvatar) {
// 			// Если нужно обрезать изображение перед отправкой
// 			// можно использовать getCroppedImg для получения обрезанного изображения
// 			formData.append('avatar', selectedAvatar);
// 		}
// 		if (editForm.name) {
// 			formData.append('name', editForm.name);
// 		}
// 		if (editForm.login) {
// 			formData.append('login', editForm.login);
// 		}

// 		try {
// 			const response = await fetch('/api/user/me', {
// 				method: 'PUT',
// 				credentials: 'include',
// 				body: formData,
// 			});

// 			if (response.ok) {
// 				const result = await response.json();
// 				dispatch({ type: ACTION_TYPE.UPDATE_USER, payload: result.data });
// 				setIsEdit(false);
// 			}
// 		} catch (error) {
// 			console.error('Ошибка при обновлении:', error);
// 		}
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
// 					{previewUrl ? (
// 						<div className="relative w-70 h-100 rounded object-cover border border-gray-500 shadow-xl overflow-hidden">
// 							<Cropper
// 								image={previewUrl}
// 								crop={crop}
// 								zoom={zoom}
// 								aspect={1} // или другой аспект в зависимости от нужд
// 								onCropChange={setCrop}
// 								onZoomChange={setZoom}
// 								onCropComplete={onCropComplete}
// 								cropShape="rect"
// 								showGrid={true}
// 							/>
// 						</div>
// 					) : (
// 						<img
// 							src={user.avatar || avatar}
// 							alt="Avatar preview"
// 							className="w-70 h-100 rounded object-cover border border-gray-50 shadow-xl"
// 						/>
// 					)}
// 					<Input
// 						type="file"
// 						accept="image/*"
// 						onChange={handleAvatarChange}
// 						className="hidden"
// 						ref={fileInputRef}
// 					/>
// 					<Button
// 						type="button"
// 						onClick={() => fileInputRef.current.click()}
// 						className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
// 					>
// 						Выбрать аватар
// 					</Button>
// 				</div>
// 				<div className="ml-8 flex-1">
// 					<div className="bg-gray-50 p-6 rounded-lg shadow-sm">
// 						<P className="font-semibold text-gray-900 mb-2">
// 							Login:
// 							<Input
// 								className="font-normal text-gray-70 block mt-1"
// 								type="text"
// 								name="login"
// 								value={editForm.login}
// 								onChange={handleInputChange}
// 							/>
// 						</P>
// 						<P className="font-semibold text-gray-900 mb-2">
// 							Имя Пользователя:
// 							<Input
// 								className="font-normal text-gray-70 block mt-1"
// 								type="text"
// 								name="name"
// 								value={editForm.name}
// 								onChange={handleInputChange}c
// 							/>
// 						</P>
// 					</div>
// 				</div>
// 			</div>
// 			<Button onClick={handlerSaveUser} className="mt-4">
// 				Сохранить
// 			</Button>
// 		</>
// 	);
// };

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ACTION_TYPE } from '../../../../action';
import { Input, P, Button } from '../../../../components';
import avatar from '../../../../img-test/8e09097b-66c5-4bac-83a2-02779c3c1f4e.jpeg';
import Cropper from 'react-easy-crop';

export const EditSettingsPage = ({ user, setIsEdit }) => {
	const [editForm, setEditForm] = useState({
		login: user.login || '',
		name: user.name || '',
	});
	const dispatch = useDispatch();
	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const fileInputRef = useRef();
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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

	const onCropComplete = (croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const getCroppedImg = async (imageSrc, crop, fileName) => {
		return new Promise((resolve) => {
			const image = new Image();
			image.src = imageSrc;
			image.crossOrigin = 'anonymous'; // Добавлено для обработки изображений с других доменов

			image.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				// Устанавливаем размеры canvas
				const scaleX = image.naturalWidth / image.width;
				const scaleY = image.naturalHeight / image.height;

				canvas.width = crop.width;
				canvas.height = crop.height;

				// Рисуем изображение на canvas с учетом обрезки
				// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
				ctx.drawImage(
					image,
					crop.x * scaleX, // sx - начальная x-координата исходного изображения
					crop.y * scaleY, // sy - начальная y-координата исходного изображения
					crop.width * scaleX, // sWidth - ширина части исходного изображения
					crop.height * scaleY, // sHeight - высота части исходного изображения
					0, // dx - x-координата на canvas
					0, // dy - y-координата на canvas
					crop.width, // dWidth - ширина на canvas
					crop.height, // dHeight - высота на canvas
				);

				// Конвертируем canvas в Blob
				canvas.toBlob(
					(blob) => {
						// Создаем File из Blob с оригинальным именем файла
						const file = new File([blob], fileName, { type: 'image/jpeg' });
						resolve(file);
					},
					'image/jpeg',
					0.9,
				); // 0.9 - качество изображения
			};

			image.onerror = () => {
				console.error('Ошибка загрузки изображения');
				resolve(null);
			};
		});
	};

	const handlerSaveUser = async () => {
		const formData = new FormData();

		if (selectedAvatar) {
			// Если пользователь перемещал изображение, обрежем его
			if (croppedAreaPixels) {
				const croppedFile = await getCroppedImg(
					previewUrl,
					croppedAreaPixels,
					selectedAvatar.name,
				);
				formData.append('avatar', croppedFile);
			} else {
				// Иначе отправляем оригинальный файл
				formData.append('avatar', selectedAvatar);
			}
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
					{previewUrl ? (
						<div className="relative w-70 h-100 rounded object-cover border border-gray-500 shadow-xl overflow-hidden">
							<Cropper
								image={previewUrl}
								crop={crop}
								zoom={zoom}
								aspect={1} // или другой аспект в зависимости от нужд
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
								cropShape="rect"
								showGrid={true}
							/>
						</div>
					) : (
						<img
							src={user.avatar || avatar}
							alt="Avatar preview"
							className="w-70 h-100 rounded object-cover border border-gray-50 shadow-xl"
						/>
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
						<P className="font-semibold text-gray-90 mb-2">
							Имя Пользователя:
							<Input
								className="font-normal text-gray-70 block mt-1"
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
