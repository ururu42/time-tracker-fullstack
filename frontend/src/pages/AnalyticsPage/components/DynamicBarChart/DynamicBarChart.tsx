import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTimeEntries } from '../../../../selectors';
import {
	calculateProjectStats,
	formatTimeFromMs,
	getCurrentMonthRange,
	getLastMonthRange,
	getThisWeekRange,
	getTodayRange,
	groupEntriesByDay,
	groupEntriesByHours,
} from '../../../../utils';
import {
	BarChart,
	ResponsiveContainer,
	Tooltip,
	CartesianGrid,
	XAxis,
	YAxis,
	Bar,
	Cell,
} from 'recharts';
export const DymanicBarChart = ({ selectedPeriod, selectedProject, customDateRange }) => {
	const timeEntries = useSelector(selectTimeEntries);
	const [chartData, setChartData] = useState([]);
	const [totalDuration, setTotalDuration] = useState(0);

	// const COLORS = ['#3f6ad8', '#44a0e7', '#56ccf2', '#2f80ed', '#1565c0'];

	const COLORS = [
		'#3f6ad8', // Насыщенный синий
		'#56ccf2', // Небесный
		'#44a0e7', // Ярко-голубой
		'#ec4899', // Ярко-розовый
	];
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

		const filteredByDate = timeEntries.filter((entry) => {
			const startTime = new Date(entry.startTime);
			return startTime >= startDate && startTime <= endDate;
		});

		if (selectedProject && selectedPeriod === 'today') {
			// нужный код (пока не добавляем

			const hoursData = groupEntriesByHours(filteredByDate);
			setChartData(hoursData);
		} else if (selectedProject) {
			const currentProjectByDate = filteredByDate.filter((entry) => {
				return entry.projectId.toString() === selectedProject;
			});

			const dailyData = groupEntriesByDay(currentProjectByDate, startDate, endDate);

			setChartData(dailyData);

			// const total = currentProjectByDate.reduce(
			// 	(acc, item) => acc + (item.duration || 0),
			// 	0,
			// );

			// setTotalDuration(total);
		} else {
			const { stats, totalDuration } = calculateProjectStats(filteredByDate);

			const formatted = stats.map((item) => ({
				name: item.projectTitle,
				hours: (item.totalDuration / 3600000).toFixed(1),
			}));

			setChartData(formatted);
			setTotalDuration(totalDuration);
		}
	}, [timeEntries, selectedPeriod, customDateRange, selectedProject]);

	console.log(chartData, 'chartData');

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4 w-full">
			{chartData.length === 0 ? (
				<div className="flex items-center justify-center h-[300px] text-gray-400">
					Нет данных за выбранный период
				</div>
			) : (
				<div style={{ width: '100%', height: 400 }}>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={chartData}
							margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								stroke="#f0f0f0"
							/>

							<XAxis
								dataKey="name"
								minTickGap={10}
								axisLine={false}
								tickLine={false}
								tick={{ fill: '#9ea2a7', fontSize: 12 }}
								interval="preserveStartEnd" // Показывает все подписи
								dy={10}
							/>

							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{ fill: '#9ea2a7', fontSize: 12 }}
								unit="h"
								allowDecimals={true}
							/>

							<Tooltip
								cursor={{ fill: '#f5f7fb' }}
								contentStyle={{
									borderRadius: '8px',
									border: 'none',
									boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
								}}
							/>

							<Bar dataKey="hours" barSize={32} radius={[6, 6, 0, 0]}>
								{chartData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
};
