import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTimeEntries } from '../../../../selectors';
import {
	calculateProjectStats,
	formatTimeFromMs,
	getCurrentMonthRange,
	getLastMonthRange,
	getThisWeekRange,
	getTodayRange,
} from '../../../../utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';
import { COLORS } from '../../../../constants';

export const ProjectDistribution = ({
	selectedPeriod,
	selectedProject,
	customDateRange,
}) => {
	const timeEntries = useSelector(selectTimeEntries);
	const [statsWithPercent, setStatsWithPercent] = useState([]);
	const [totalDuration, setTotalDuration] = useState(0);

	useEffect(() => {
		let startDate, endDate;

		if (selectedPeriod === 'today') {
			const range = getTodayRange();
			startDate = range.startDate;
			endDate = range.endDate;
		}

		if (selectedPeriod === 'current-month') {
			const range = getCurrentMonthRange();
			startDate = range.startDate;
			endDate = range.endDate;
		}

		if (selectedPeriod === 'this-week') {
			const range = getThisWeekRange();
			startDate = range.startDate;
			endDate = range.endDate;
		}

		if (selectedPeriod === 'last-month') {
			const range = getLastMonthRange();
			startDate = range.startDate;
			endDate = range.endDate;
		}

		if (selectedPeriod === 'custom' && customDateRange) {
			startDate = customDateRange.startDate;
			endDate = customDateRange.endDate;
		}

		const filtederByDate = timeEntries.filter((entry) => {
			const startTimeinDate = new Date(entry.startTime);
			return startTimeinDate >= startDate && startTimeinDate <= endDate;
		});

		if (!selectedProject) {
			const { stats, totalDuration } = calculateProjectStats(filtederByDate);
			setStatsWithPercent(stats);
			setTotalDuration(totalDuration);
		} else {
			const currentProjectByDate = filtederByDate.filter((entry) => {
				return entry.projectId?.toString() === selectedProject;
			});
			const { stats, totalDuration } = calculateProjectStats(currentProjectByDate);
			setStatsWithPercent(stats);
			setTotalDuration(totalDuration);
		}
	}, [timeEntries, selectedPeriod, customDateRange, selectedProject]);

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 min-w-0 w-full flex flex-col">
			<div className="text-slate-700 font-bold mb-3 sm:mb-4 ml-2 text-sm uppercase tracking-tight flex-shrink-0">
				Распределение времени по проектам
			</div>

			{statsWithPercent.length === 0 ? (
				<div className="w-full bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-200 text-sm text-slate-500">
					Нет данных за выбранный период
				</div>
			) : (
				<div className="flex flex-col gap-4 w-full min-w-0">
					{/* БЛОК 1: Изолированный контейнер ТОЛЬКО для графика Recharts */}
					<div className="w-full bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-200 flex-shrink-0 min-w-0 overflow-hidden">
						<div className="w-full flex justify-center min-w-0">
							{/* КЛЮЧЕВОЙ ФИКС: Ограничили высоту через h-auto и добавили min-w-0 */}
							<div className="w-full h-auto min-w-0">
								{/* КЛЮЧЕВОЙ ФИКС: Задали аспект соотношения сторон (aspect={1.3}) и отключили minWidth у Recharts */}
								<ResponsiveContainer
									width="100%"
									aspect={1.3}
									style={{ minWidth: 0 }}
								>
									<PieChart>
										<Pie
											data={statsWithPercent}
											dataKey="totalDuration"
											nameKey="projectTitle"
											cx="50%"
											cy="50%"
											innerRadius="60%"
											outerRadius="90%"
											paddingAngle={3}
											cornerRadius={4}
											stroke="none"
										>
											{statsWithPercent.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
											<Label
												value={formatTimeFromMs(totalDuration)}
												position="center"
												className="fill-slate-800 font-bold"
												style={{
													fontSize: '14px',
													fontWeight: 'bold',
													fill: '#1e293b',
												}}
											/>
										</Pie>

										<Tooltip
											contentStyle={{
												borderRadius: '12px',
												border: 'none',
												boxShadow:
													'0 10px 15px -3px rgba(0,0,0,0.1)',
											}}
											formatter={(value, name) => [
												`${Math.round(value / 60000)} мин`,
												name,
											]}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>
						</div>
					</div>

					{/* БЛОК 2: Полностью независимый контейнер для списка (легенды) */}
					<div className="w-full bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-200 min-w-0 max-h-[220px] overflow-y-auto custom-scrollbar">
						<div className="space-y-1.5 sm:space-y-2 w-full min-w-0">
							{statsWithPercent.map((entry, index) => (
								<div
									key={`legend-${entry.projectId}`}
									className="flex items-center justify-between gap-2 text-xs sm:text-sm w-full min-w-0"
									title={entry.projectTitle}
								>
									{/* Группа маркера и названия */}
									<div className="flex items-center gap-2 min-w-0 flex-1">
										<div
											className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
											style={{
												backgroundColor:
													COLORS[index % COLORS.length],
											}}
										/>
										{/* w-0 flex-1 мгновенно активирует три точки при нехватке места */}
										<div className="w-0 flex-1">
											<p className="text-slate-600 font-medium truncate">
												{entry.projectTitle}
											</p>
										</div>
									</div>

									{/* Время выполнения */}
									<span className="text-slate-400 text-[11px] sm:text-xs flex-shrink-0 text-right tabular-nums ml-2">
										{formatTimeFromMs(entry.totalDuration)}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
