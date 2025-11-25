import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserLogin } from '../../selectors';
import { logout } from '../../action';
import { Icon } from '@iconify/react';
import { Button } from '../Button/Button';

export const UserPanel = () => {
	const userLogin = useSelector(selectUserLogin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/login');
	};

	const handleGoToSettingsPage = () => {
		navigate('/settings')
	}

	return (
		<div className="flex items-center space-x-4">
			{userLogin ? (
				<>
					<div className="flex items-center space-x-2">
						<Button onClick={handleGoToSettingsPage} className="flex bg-transparent hover:bg-transparent !p-0">
							<span className="text-gray-700 hover:text-blue-800 italic">{userLogin}</span>
							<Icon icon="mdi:settings-outline" className="w-7 h-7 text-gray-700 hover:text-blue-800 ml-2"/>
						</Button>
						
						<Button
							onClick={handleLogout}
							className="bg-transparent hover:bg-transparent !p-0"
							title="Logout"
						>
							<Icon
								icon="fluent:arrow-exit-32-filled"
								className="w-7 h-7 text-red-700 hover:text-red-500"
							/>
						</Button>
					</div>
				</>
			) : (
				<Link
					to="/login"
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
				>
					Вход
				</Link>
			)}
		</div>
	);
};
