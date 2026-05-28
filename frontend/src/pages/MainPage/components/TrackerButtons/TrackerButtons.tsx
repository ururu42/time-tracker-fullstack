import { Button } from '../../../../components';
import { Icon } from '@iconify/react';

export const TrackerButtons = ({
	onSaveTimerEntryWithAll,
	isRunning,
	elapsedTime,
	onCancel,
	...props
}) => {
	const isDisabled = isRunning || elapsedTime === 0;

	return (
		<div className="flex gap-4 mt-4">
			<button
				disabled={isDisabled}
				onClick={onSaveTimerEntryWithAll}
				className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm
					${
						isDisabled
							? 'bg-gray-200 text-gray-400 cursor-not-allowed'
							: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'
					}
				`}
			>
				Сохранить
			</button>

			<button
				onClick={onCancel}
				disabled={isDisabled}
				className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 
					${
						isDisabled
							? 'bg-gray-100 text-gray-400 cursor-not-allowed'
							: 'bg-red-100 text-red-700 hover:bg-red-200 hover:shadow-sm'
					}`}
			>
				Отменить
			</button>
		</div>
	);
};
