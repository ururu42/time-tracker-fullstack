import { useSelector } from 'react-redux';
import { selectUserLogin, selectUser } from '../../selectors';
import { Button, H1, P } from '../../components';
import { EditSettingsPage } from './components/EditSettingsPage/EditSettingsPage';
import avatar from '../../img-test/8e09097b-66c5-4bac-83a2-02779c3c1f4e.jpeg';
import { useState } from 'react';

export const SettingsPage = () => {
	const userLogin = useSelector(selectUserLogin);
	const user = useSelector(selectUser);
	const [isEdit, setIsEdit] = useState(false);

	const handlerEditUser = () => {
		setIsEdit(true);
	};

	return (
		<div>
			<div className="max-w-6xl mx-auto">
				<div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white rounded-t-2xl">
					<h1 className="text-4xl font-bold">Настройки аккаунта</h1>
					<p className="opacity-90 mt-2">{userLogin}</p>
				</div>

				<div className="p-8 bg-white rounded-b-2xl shadow-md">
					{isEdit ? (
						<EditSettingsPage user={user} setIsEdit={setIsEdit} />
					) : (
						<div>
							<div className="flex flex-col md:flex-row gap-8 mb-8">
								<div className="flex-shrink-0">
									<img
										src={user.avatar || avatar}
										alt="Avatar"
										className="w-64 h-64 rounded-xl object-cover border-4 border-white shadow-lg"
									/>
								</div>

								<div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-sm">
									<div className="space-y-4">
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
											<span className="font-semibold text-gray-700">
												Login:
											</span>
											<span className="font-medium text-gray-900">
												{user.login}
											</span>
										</div>

										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
											<span className="font-semibold text-gray-700">
												Имя пользователя:
											</span>
											<span className="font-medium text-gray-900">
												{user.name || 'отсутствует'}
											</span>
										</div>

										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
											<span className="font-semibold text-gray-700">
												Дата создания аккаунта:
											</span>
											<span className="font-medium text-gray-900">
												{new Date(
													user.createdAt,
												).toLocaleDateString('ru-RU')}
											</span>
										</div>
									</div>
								</div>
							</div>

							<div className="flex justify-center">
								<Button
									onClick={handlerEditUser}
									className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition-all duration-200 font-medium"
								>
									Редактировать данные пользователя
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
