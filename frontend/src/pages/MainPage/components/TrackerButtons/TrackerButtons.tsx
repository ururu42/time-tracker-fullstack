import { Button } from '../../../../components';
import { Icon } from '@iconify/react';

export const TrackerButtons = ({ ...props }) => {
	return (
		<div className="flex gap-4">
			<Button className="flex items-center gap-2 !bg-transparent !text-gray-600 !hover:text-gray-800 !font-medium !transition-colors">
				<Icon icon="solar:disk-line-linear" className="w-5 h-5" />
				Сохранить
			</Button>
			<Button className="flex items-center gap-2 !bg-transparent !text-gray-600 !hover:text-gray-800 !font-medium !transition-colors">
				<Icon icon="solar:close-circle-line-linear" className="w-5 h-5" />
				Отменить
			</Button>
		</div>
	);
};
