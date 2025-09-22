// import { useNavigate, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectUserLogin } from '../../selectors';
// import { logout } from '../../action';
// import { useState } from 'react';
// import { Icon } from '@iconify/react';

// export const UserPanel = () => {
// 	const userLogin = useSelector(selectUserLogin);
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	const handleLogout = () => {
// 		dispatch(logout());
// 		sessionStorage.removeItem('userData');
// 		navigate('/login');
// 	};
// 	return (
// 		<div className="flex justify-center">
// 			{userLogin ? (
// 				<>
// 					<div className="italic">{userLogin}</div>
// 					<button onClick={handleLogout} className="ml-5 text-3xl">
// 						<Icon icon="fluent:arrow-exit-32-filled" />
// 					</button>
// 				</>
// 			) : (
// 				<div>
// 					<Link to="/login">Вход</Link>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// отображаем Вход или User name

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserLogin } from '../../selectors';
import { logout } from '../../action';
import { Icon } from '@iconify/react';

export const UserPanel = () => {
	const userLogin = useSelector(selectUserLogin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/login');
	};

	return (
		<div className="flex items-center space-x-4">
			{userLogin ? (
				<>
					<div className="flex items-center space-x-2">
						<span className="text-gray-700 italic">{userLogin}</span>
						<button
							onClick={handleLogout}
							className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition"
							title="Logout"
						>
							<Icon
								icon="fluent:arrow-exit-32-filled"
								className="w-5 h-5 text-white"
							/>
						</button>
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
