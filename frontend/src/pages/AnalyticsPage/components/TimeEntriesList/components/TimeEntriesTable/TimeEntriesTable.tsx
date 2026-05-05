import { formatTimeFromDate, formatTimeFromMs } from '../../../../../../utils';

export const TimeEntriesTable = ({ entries, accentColor }) => {
	const lightBg = `${accentColor}15`;

	return (
		<div className="w-full">
			<div
				className="grid grid-cols-[2fr_4fr_1fr_1fr_1fr] px-6 py-3 border-b border-gray-100"
				style={{ backgroundColor: lightBg }}
			>
				<div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
					Задача
				</div>
				<div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
					Комментарий
				</div>
				<div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">
					Начало
				</div>
				<div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">
					Конец
				</div>
				<div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">
					Время
				</div>
			</div>

			<div className="divide-y divide-gray-50">
				{entries.map((entry) => (
					<div
						key={entry.id}
						className="grid grid-cols-[2fr_4fr_1fr_1fr_1fr] items-center px-6 py-4 hover:bg-gray-50/50 transition-colors"
					>
						<div className="text-sm font-medium text-gray-700 pr-4">
							{entry.taskTitle}
						</div>

						<div className="text-sm text-gray-500 italic leading-relaxed pr-4">
							{entry.comment || '—'}
						</div>

						<div className="text-sm text-gray-500 text-center whitespace-nowrap">
							{formatTimeFromDate(entry.startTime)}
						</div>

						<div className="text-sm text-gray-500 text-center whitespace-nowrap">
							{formatTimeFromDate(entry.endTime)}
						</div>

						<div className="text-sm font-bold text-gray-800 text-right whitespace-nowrap">
							{formatTimeFromMs(entry.duration)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
