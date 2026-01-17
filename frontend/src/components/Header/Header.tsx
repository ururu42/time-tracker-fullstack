import { Link } from 'react-router-dom';
import { UserPanel } from '../UserPanel/UserPanel';

export const Header = () => {
	return (
		<header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<nav className="flex space-x-1">
					<Link
						to="/"
						className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 font-medium"
					>
						Главная
					</Link>
					<Link
						to="/projects"
						className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 font-medium"
					>
						Мои проекты
					</Link>
					<Link
						to="/analytics"
						className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-90 transition-colors duration-200 font-medium"
					>
						Аналитика
					</Link>
				</nav>
				<UserPanel />
			</div>
		</header>
	);
};
