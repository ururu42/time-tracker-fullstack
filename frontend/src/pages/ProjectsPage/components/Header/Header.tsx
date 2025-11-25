import { Link } from 'react-router-dom';
import { Button, H1 } from '../../../../components';

export const Header = () => {
	return (
		<div className="flex justify-between">
			<H1>All projects</H1>
			<Link to="/projects/create">
				<Button className="mb-6 bg-green-600 hover:bg-green-700">
					+ Create project
				</Button>
			</Link>
		</div>
	);
};
