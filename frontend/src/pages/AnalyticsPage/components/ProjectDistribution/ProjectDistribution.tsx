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
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
			<div className="text-slate-700 font-bold mb-4 ml-2 text-sm uppercase tracking-tight">
				Распределение времени по проектам
			</div>
			<div className="w-full h-[400px] bg-white p-4 rounded-xl shadow-sm border border-slate-200">
				{statsWithPercent.length === 0 ? (
					<div>Нет данных за выбранный период</div>
				) : (
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={statsWithPercent} 
								dataKey="totalDuration"
								nameKey="projectTitle"
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={100}
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
										fontSize: '20px',
										fontWeight: 'bold',
										fill: '#1e293b',
									}}
								/>
							</Pie>

							<Tooltip
								contentStyle={{
									borderRadius: '12px',
									border: 'none',
									boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
								}}
								formatter={(value) => [
									`${Math.round(value / 60000)} мин`,
									'Время',
								]}
							/>

							<Legend
								verticalAlign="bottom"
								iconType="circle"
								formatter={(value) => (
									<span className="text-slate-600 text-sm font-medium">
										{value}
									</span>
								)}
							/>
						</PieChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	);
};
