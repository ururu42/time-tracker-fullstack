import { Icon } from '@iconify/react';
import { formatTimeFromMs } from '../../utils';

export const Timer = ({ elapsedTime, isRunning, startTimer, disabled }) => {
	return (
		<div className="flex items-center gap-4">
			<div className="text-4xl font-mono font-semibold text-gray-800">
				{formatTimeFromMs(elapsedTime)}
			</div>

			{isRunning ? (
				<div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg">
					<span className="relative flex h-3 w-3">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
					</span>
					<span className="text-sm font-medium whitespace-nowrap">Таймер идёт</span>
				</div>
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
