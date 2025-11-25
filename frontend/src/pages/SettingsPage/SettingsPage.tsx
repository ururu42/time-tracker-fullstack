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
	console.log(user);
	return (
		<>
			{isEdit ? (
				<EditSettingsPage user={user} setIsEdit={setIsEdit} />
			) : (
				<div className="max-w-4xl mx-auto p-6">
					<H1>Настройки аккаунта {userLogin}</H1>
					<div className="flex mt-6">
						<div className="flex-shrink-0">
							<img
								src={user.avatar || avatar}
								alt="Avatar"
								className="w-70 h-100 rounded object-cover border border-gray-500 shadow-xl"
							/>
						</div>
						<div className="ml-8 flex-1">
							<div className="bg-gray-50 p-6 rounded-lg shadow-sm">
								<P className="font-semibold text-gray-900">
									Login:{' '}
									<span className="font-normal text-gray-700">
										{user.login}
									</span>
								</P>
								<P className="font-semibold text-gray-900">
									Имя пользователя:{' '}
									{user.name === '' ? (
										'отсутствует'
									) : (
										<span className="font-normal text-gray-700">
											{user.name}
										</span>
									)}
								</P>
								<P className="font-semibold text-gray-900">
									Дата создания аккаунта:{' '}
									<span className="font-normal text-gray-700">
										{new Date(user.createdAt).toLocaleDateString(
											'ru-RU',
										)}
									</span>
								</P>
							</div>
						</div>
					</div>
					<Button onClick={handlerEditUser}>
						Редактировать данные пользователя
					</Button>
				</div>
			)}
		</>
	);
};
