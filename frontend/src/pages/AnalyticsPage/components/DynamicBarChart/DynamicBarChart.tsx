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
import { formatTimeFromMs } from '../../../../utils';
export const DymanicBarChart = ({ chartData }: { chartData: any[] }) => {
	const COLORS = ['#3f6ad8', '#56ccf2', '#44a0e7', '#ec4899'];

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4 w-full h-full flex flex-col">
			{chartData.length === 0 ? (
				<div className="flex items-center justify-center flex-1 min-h-[300px] text-gray-400">
					Нет данных за выбранный период
				</div>
			) : (
				<div className="w-full flex-1">
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
								interval="preserveStartEnd"
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
								formatter={(value, name, props) => {
									const totalMs =
										props.payload.durationMs !== undefined
											? props.payload.durationMs
											: Math.round(Number(value) * 3600000);

									return [
										formatTimeFromMs(totalMs),
										'Затрачено времени',
									];
								}}
							/>

							<Bar
								dataKey="hours"
								barSize={32}
								radius={[6, 6, 0, 0]}
								background={{ fill: 'transparent' }}
							>
								{chartData.map((entry: any, index: number) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
										style={{
											opacity: entry.hours === 0 ? 0.001 : 1,
										}}
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
