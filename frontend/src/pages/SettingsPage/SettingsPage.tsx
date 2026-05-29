import { useSelector } from 'react-redux';
import { selectUserLogin, selectUser } from '../../selectors';
import { Button, HeaderAllPage } from '../../components';
import { EditSettingsPage } from './components/EditSettingsPage/EditSettingsPage';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export const SettingsPage = () => {
	const userLogin = useSelector(selectUserLogin);
	const user = useSelector(selectUser);
	const [isEdit, setIsEdit] = useState(false);

	const [previewUrl, setPreviewUrl] = useState(null);
	const [removeAvatar, setRemoveAvatar] = useState(false);
	const avatarSrc = removeAvatar ? null : previewUrl || user.avatar;

	return (
		<main className=" flex-1 min-h-screen bg-gray-50 ">
			<HeaderAllPage>Настройки аккаунта</HeaderAllPage>
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
				<p className="text-gray-600">Вы вошли как</p>
				<p className="text-lg font-semibold text-gray-900">{userLogin}</p>
			</div>
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
				{isEdit ? (
					<EditSettingsPage
						user={user}
						setIsEdit={setIsEdit}
						avatarSrc={avatarSrc}
						removeAvatar={removeAvatar}
						setRemoveAvatar={setRemoveAvatar}
						previewUrl={previewUrl}
						setPreviewUrl={setPreviewUrl}
					/>
				) : (
					<div className="space-y-6">
						<div className="flex flex-col md:flex-row gap-8">
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
							<div className="flex-1  rounded-2xl p-6 border border-gray-200">
								<div className="space-y-5">
									<div className="flex justify-between items-center">
										<span className="text-gray-500">Login</span>
										<span className="font-medium text-gray-900">
											{user.login}
										</span>
									</div>

									<div className="flex justify-between items-center">
										<span className="text-gray-500">
											Имя пользователя
										</span>
										<span className="font-medium text-gray-900">
											{user.name || '—'}
										</span>
									</div>

									<div className="flex justify-between items-center">
										<span className="text-gray-500">
											Дата регистрации
										</span>
										<span className="font-medium text-gray-900">
											{new Date(user.createdAt).toLocaleDateString(
												'ru-RU',
											)}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-center pt-4">
							<Button
								onClick={() => setIsEdit(true)}
								className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-sm transition-all duration-200"
							>
								<Icon icon="solar:pen-bold" className="w-5 h-5" />
								Редактировать
							</Button>
						</div>
					</div>
				)}
			</div>
		</main>
	);
};
