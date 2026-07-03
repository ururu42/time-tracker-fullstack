import { useState } from 'react';

export const PeriodSelectComponent = ({
	period = 'current-month',
	onPeriodClick,
	setCustomDateRange,
}) => {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const isCustom = period === 'custom';

	const handleStartDateChange = ({ target }) => {
		const newStart = target.value;
		setStartDate(newStart);

		if (newStart && endDate) {
			setCustomDateRange({
				startDate: new Date(newStart + 'T00:00:00'),
				endDate: new Date(endDate + 'T23:59:59'),
			});
		}
	};

	const handleEndDateChange = ({ target }) => {
		const newEnd = target.value;
		setEndDate(newEnd);

		if (startDate && newEnd) {
			setCustomDateRange({
				startDate: new Date(startDate + 'T00:00:00'),
				endDate: new Date(newEnd + 'T23:59:59'),
			});
		}
	};

	return (
		<>
			<button
				onClick={() => onPeriodClick('current-month')}
				className={`${period === 'current-month' ? 'px-4 py-2 text-xs lg:text-sm font-medium text-gray-900 bg-white rounded-lg shadow-sm border border-gray-100' : 'px-3 py-2 text-xs lg:text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors'}`}
			>
				Текущий месяц
			</button>

			<button
				onClick={() => onPeriodClick('today')}
				className={`${period === 'today' ? 'px-4 py-2 text-xs lg:text-sm font-medium text-gray-900 bg-white rounded-lg shadow-sm border border-gray-100' : 'px-3 py-2 text-xs lg:text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors'}`}
			>
				Сегодня
			</button>

			<button
				onClick={() => onPeriodClick('this-week')}
				className={`${period === 'this-week' ? 'px-4 py-2 text-xs lg:text-sm font-medium text-gray-900 bg-white rounded-lg shadow-sm border border-gray-100' : 'px-3 py-2 text-xs lg:text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors'}`}
			>
				На этой неделе
			</button>

			<button
				onClick={() => onPeriodClick('last-month')}
				className={`${period === 'last-month' ? 'px-4 py-2 text-xs lg:text-sm font-medium text-gray-900 bg-white rounded-lg shadow-sm border border-gray-100' : 'px-3 py-2 text-xs lg:text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors'}`}
			>
				Прошлый месяц
			</button>

			<button
				onClick={() => onPeriodClick('custom')}
				className={`${period === 'custom' ? 'px-4 py-2 text-xs lg:text-sm font-medium text-gray-900 bg-white rounded-lg shadow-sm border border-gray-100' : 'flex items-center px-3 py-2 text-xs lg:text-sm font-medium text-gray-500 cursor-pointer lg:border-l lg:border-gray-300 lg:ml-1'}`}
			>
				Выбрать даты
			</button>

			{isCustom && (
				<div className="flex flex-row items-center gap-3 w-full mt-3 lg:mt-0 lg:w-auto lg:ml-6 flex-wrap sm:flex-nowrap">
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-500 w-4">С</span>
						<input
							type="date"
							value={startDate}
							onChange={handleStartDateChange}
							max={endDate || undefined}
							className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-500 w-4">По</span>
						<input
							type="date"
							value={endDate}
							onChange={handleEndDateChange}
							min={startDate || undefined}
							className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>
			)}
		</>
	);
};
