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
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	Legend,
	Label,
} from 'recharts';
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
		<div
			className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
			style={{ height: '580px' }}
		>
			<div className="text-slate-700 font-bold mb-4 ml-2 text-sm uppercase tracking-tight">
				Распределение времени по проектам
			</div>
			<div className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-[calc(100%-36px)] flex flex-col">
				{statsWithPercent.length === 0 ? (
					<div>Нет данных за выбранный период</div>
				) : (
					<>
						<div className="w-full flex-shrink-0">
							<div className="w-full aspect-square max-h-[350px]">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={statsWithPercent}
											dataKey="totalDuration"
											nameKey="projectTitle"
											cx="50%"
											cy="50%"
											innerRadius={55}
											outerRadius={90}
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
												className="fill-slate-800 font-bold text-xl"
												style={{
													fontSize: '18px',
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

						{/* Легенда с прокруткой */}
						<div className="mt-4 flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
							<div className="space-y-2">
								{statsWithPercent.map((entry, index) => (
									<div
										key={`legend-${entry.projectId}`}
										className="flex items-center gap-2 text-sm"
										title={entry.projectTitle}
									>
										<div
											className="w-3 h-3 rounded-full flex-shrink-0"
											style={{
												backgroundColor:
													COLORS[index % COLORS.length],
											}}
										/>
										<span className="text-slate-600 font-medium truncate flex-1">
											{entry.projectTitle}
										</span>
										<span className="text-slate-400 text-xs flex-shrink-0">
											{formatTimeFromMs(entry.totalDuration)}
										</span>
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
