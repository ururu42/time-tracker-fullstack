import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodayTimeEntries } from '../../../../selectors';
import { fetchTimeEntriesAsync } from '../../../../action';
import { calculateProjectStats, formatTimeFromMs } from '../../../../utils';
import { Icon } from '@iconify/react';

export const Statistics = () => {
	const dispatch = useDispatch();
	const todayTimeEntries = useSelector(selectTodayTimeEntries);
	const [statsWithPercent, setStatsWithPercent] = useState([]);
	const [totalDuration, setTotalDuration] = useState(0);

	useEffect(() => {
		dispatch(fetchTimeEntriesAsync());
	}, [dispatch]);

	useEffect(() => {
		if (todayTimeEntries && todayTimeEntries.length > 0) {
			const { stats, totalDuration } = calculateProjectStats(todayTimeEntries);

			setStatsWithPercent(stats);
			setTotalDuration(totalDuration);
		}
	}, [todayTimeEntries]);

	return (
		<div className="col-span-1">
			<h2 className="text-lg font-semibold text-gray-900 mb-4 ml-4">Статистика</h2>
			<div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center mb-4">
				<div className="flex justify-center mb-2">
					<Icon
						icon="solar:clock-circle-bold"
						className="w-5 h-5 text-gray-400"
					/>
				</div>

				<p className="text-sm text-gray-500 mb-1">Всего за день</p>

				<p className="text-4xl font-bold text-gray-900 tracking-tight">
					{formatTimeFromMs(totalDuration)}
				</p>
			</div>
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
				<div>
					<h3 className="text-sm font-medium text-gray-700 mb-3">
						По проектам:
					</h3>

					{statsWithPercent.length === 0 ? (
						<p className="text-center text-gray-500 py-4">
							Нет данных за сегодня
						</p>
					) : (
						<div className="space-y-4">
							{statsWithPercent.map((item) => (
								<div key={item.projectId}>
									{/* Название проекта и процент */}
									<div className="flex items-center justify-between mb-1.5">
										<div className="flex items-center gap-2">
											<span
												className="w-2.5 h-2.5 rounded-full"
												style={{
													backgroundColor: '#10B981',
												}}
											></span>
											<span className="text-sm font-medium text-gray-700">
												{item.projectTitle}
											</span>
										</div>
										<span className="text-sm font-semibold text-gray-900">
											{item.percent}%
										</span>
									</div>

									{/* Прогресс бар */}
									<div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
										<div
											className="h-full rounded-full transition-all duration-300"
											style={{
												width: `${item.percent}%`,
												backgroundColor: '#10B981',
											}}
										></div>
									</div>

									{/* Время по проекту */}
									<p className="text-xs text-gray-500 mt-1">
										{formatTimeFromMs(item.totalDuration, true)}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
