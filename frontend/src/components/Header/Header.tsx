import { Link, useLocation } from 'react-router-dom';
import { UserPanel } from '../UserPanel/UserPanel';
import { Icon } from '@iconify/react';

export const Header = () => {
	const location = useLocation();

	const navItems = [
		{ to: '/', label: 'Главная', icon: 'solar:home-2-linear' },
		{ to: '/projects', label: 'Проекты', icon: 'solar:folder-with-files-linear' },
		{ to: '/analytics', label: 'Отчёты', icon: 'solar:graph-up-linear' },
		{ to: '/settings', label: 'Настройки', icon: 'solar:settings-linear' },
	];

	return (
		<header className="bg-gray-50 border-r border-gray-200 w-64 flex-shrink-0">
			<div className="flex flex-col h-full p-4">
				{/* Логотип */}
				<Link to="/" className="flex items-center gap-2 mb-8 px-3">
					<Icon icon="solar:clock-circle-linear" className="w-8 h-8 text-indigo-600" />
					<span className="text-xl font-semibold text-gray-800">TimeTracker</span>
				</Link>

				{/* Навигация */}
				<nav className="space-y-1 flex-1">
					{navItems.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors duration-200 ${
								location.pathname === item.to
									? 'bg-indigo-50 text-indigo-600'
									: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
							}`}
						>
							<Icon icon={item.icon} className="w-5 h-5" />
							{item.label}
						</Link>
					))}
				</nav>

				{/* Log out внизу */}
				<div className="pt-4 border-t border-gray-200">
					<Link
						to="/login"
						className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
					>
						<Icon icon="solar:arrow-left-linear" className="w-5 h-5" />
						Log out
					</Link>
				</div>
			</div>
		</header>
	);
};
