import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../selectors';
import { UserPanel } from '../UserPanel/UserPanel';
import { ACTION_TYPE } from '../../action';
import { Icon } from '@iconify/react';

export const Header = () => {
	const location = useLocation();

	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const navItems = [
		{ to: '/', label: 'Главная', icon: 'solar:home-2-linear' },
		{ to: '/projects', label: 'Проекты', icon: 'solar:folder-with-files-linear' },
		{ to: '/analytics', label: 'Отчёты', icon: 'solar:graph-up-linear' },
		{ to: '/settings', label: 'Настройки', icon: 'solar:settings-linear' },
	];

	const handleLogout = () => {
		const confirmExit = window.confirm('Вы точно хотите выйти?');

		if (!confirmExit) return;

		dispatch({ type: ACTION_TYPE.LOGOUT });
		localStorage.removeItem('token');

		navigate('/login');
	};

	return (
		<header className="fixed left-0 h-screen bg-white border-r border-gray-200 flex flex-col w-20 lg:w-64 transition-all duration-300">
			<div className="flex flex-col h-full p-4">
				<Link to="/" className="flex items-center gap-3 mb-8 px-3">
					<div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
						<Icon
							icon="solar:clock-circle-linear"
							className="w-6 h-6 text-emerald-600"
						/>
					</div>
					<span className="text-lg font-semibold text-gray-800 hidden lg:block">
						TimeTracker
					</span>
				</Link>
				<nav className="space-y-1 flex-1">
					{navItems.map((item) => {
						const isActive = location.pathname === item.to;

						return (
							<Link
								key={item.to}
								to={item.to}
								title={item.label}
								className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${
									isActive
										? 'bg-emerald-50 text-emerald-600'
										: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
								}`}
							>
								<Icon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
								<span className="hidden lg:inline-block">{item.label}</span>
							</Link>
						);
					})}
				</nav>

				<div className="pt-4 border-t border-gray-200 mt-auto">
					{user?.id ? (
						<div
							onClick={handleLogout}
							title="Выйти"
							className="flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-gray-100 rounded-xl transition"
						>
							<div className="flex items-center gap-3">
								{user?.avatar ? (
									<img
										src={user.avatar}
										alt="avatar"
										className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0"
									/>
								) : (
									<div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 flex-shrink-0">
										<Icon
											icon="solar:user-circle-linear"
											className="w-5 h-5 text-gray-500"
										/>
									</div>
								)}

								<span className="text-sm font-medium text-gray-600 hidden lg:block">
									{user?.login}
								</span>
							</div>
							<Icon
								icon="solar:arrow-left-linear"
								className="w-5 h-5 text-red-400 hover:text-red-600 transition hidden lg:block"
							/>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</header>
	);
};
