import { Link } from 'react-router-dom';
import { UserPanel } from '../UserPanel/UserPanel';

export const Header = () => {
	return (
		<header className="bg-gray-100 shadow-md p-4 flex justify-between items-center text-lg font-medium text-gray-800">
			<nav className="flex gap-7 ">
				<Link to="/" className="hover:text-blue-600 transition-colors ">
					Main
				</Link>
				<Link to="/projects" className="hover:text-blue-600 transition-colors">
					Projects
				</Link>
				<Link to="/analytics" className="hover:text-blue-600 transition-colors">
					Analytics
				</Link>
			</nav>
			<UserPanel />
		</header>
	);
};
