import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserLogin, selectUser } from '../../selectors';
import { logout } from '../../action';
import { Icon } from '@iconify/react';
import { Button } from '../Button/Button';
import avatar from '../../img-test/8e09097b-66c5-4bac-83a2-02779c3c1f4e.jpeg';

export const UserPanel = () => {
	const userLogin = useSelector(selectUserLogin);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		sessionStorage.clear(); 
		localStorage.removeItem('userData');
		navigate('/login');
	};

	const handleGoToSettingsPage = () => {
		navigate('/settings');
	};

	return (
		<div className="flex items-center space-x-3">
			{userLogin ? (
				<>
					<Button
						onClick={handleGoToSettingsPage}
						className="flex items-center bg-transparent hover:bg-gray-100 !p-0 rounded-lg transition-colors duration-200 flex-1 min-w-0"
					>
						<img
							src={user.avatar || avatar}
							alt="Avatar"
							className="w-10 h-10 rounded-full object-cover border-gray-20 shadow-sm flex-shrink-0"
						/>
						<span className="ml-2 text-gray-700 hover:text-gray-900 font-medium truncate">
							{userLogin}
						</span>
					</Button>

					<Button
						onClick={handleLogout}
						className="bg-transparent hover:bg-gray-100 !p-2 rounded-lg transition-colors duration-200 flex-shrink-0"
						title="Logout"
					>
						<Icon
							icon="fluent:arrow-exit-32-filled"
							className="w-6 h-6 text-gray-600 hover:text-red-600"
						/>
					</Button>
				</>
			) : (
				<Link
					to="/login"
					className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium whitespace-nowrap"
				>
					Вход
				</Link>
			)}
		</div>
	);
};
