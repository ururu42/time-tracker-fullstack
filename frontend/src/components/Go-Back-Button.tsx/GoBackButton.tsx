import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Icon } from '@iconify/react';

export const GoBackButton = ({ className = '', onClick, ...props }) => {
	const navigate = useNavigate();

	return (
		<Button
			{...props}
			className={`mb-2 bg-gray-500 hover:bg-gray-600 ${className}`}
			onClick={onClick}
		>
			<Icon icon="mdi:arrow-back" className="w-6 h-6" />
		</Button>
	);
};
