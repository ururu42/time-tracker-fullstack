import { Icon } from '@iconify/react';
import { formatTimeFromMs } from '../../utils';

export const Timer = ({ elapsedTime, isRunning, startTimer, stopTimer, disabled }) => {
	return (
		<div className="flex items-center gap-4">
			<div className="text-4xl font-mono font-semibold text-gray-800">
				{formatTimeFromMs(elapsedTime)}
			</div>

			{isRunning ? (
				<button
					className="flex items-center gap-2 bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
					onClick={stopTimer}
				>
					<Icon icon="solar:stop-circle-bold" className="w-5 h-5" />
					ОСТАНОВИТЬ
				</button>
			) : (
				<button
					className={`flex items-center gap-2 bg-indigo-900 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg font-medium transition-colors ${
						disabled ? '!bg-gray-100 !text-gray-400 cursor-not-allowed' : ''
					}`}
					disabled={disabled}
					onClick={startTimer}
				>
					<Icon icon="solar:play-circle-bold" className="w-5 h-5" />
					ЗАПУСТИТЬ
				</button>
			)}
		</div>
	);
};
