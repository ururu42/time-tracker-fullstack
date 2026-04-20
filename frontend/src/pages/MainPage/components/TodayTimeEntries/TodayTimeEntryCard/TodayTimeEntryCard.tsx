import { formatTimeRange, formatTimeFromMs } from '../../../../../utils';
import { Icon } from '@iconify/react';

export const TodayTimeEntryCard = ({ todayTimeEntries, onClick, isPlayTracker }) => {
	const groupByProject = (array) => {
		return array.reduce((acc, entry) => {
			const projectId = entry.projectId || 'no-project';

			if (!acc[projectId]) {
				acc[projectId] = [];
			}

			acc[projectId].push(entry);

			return acc;
		}, {});
	};

	const groupedEntries = groupByProject(todayTimeEntries);

	const playTaskAgain = (projectId, taskId, comment) => {
		onClick(projectId, taskId, comment);
	};

	if (!todayTimeEntries || todayTimeEntries.length === 0) {
		return <p className="text-center text-gray-500 py-8">Нет записей за сегодня</p>;
	}

	return (
		<div>
			{Object.entries(groupedEntries).map(([projectId, entries]) => (
				<div key={projectId} className="mb-6">
					{/* Проект */}
					<h4 className="text-sm font-semibold text-gray-700 mb-2">
						{entries[0]?.projectTitle || 'Без проекта'}
					</h4>

					<div className="bg-white rounded-xl border border-gray-200">
						{entries.map((entry, idx) => {
							return (
								<div
									key={entry.id}
									className={`flex items-center justify-between p-4 transition-all cursor-pointer ${
										idx < entries.length - 1
											? 'border-b border-gray-200'
											: ''
									} hover:bg-gray-50`}
								>
									{/* Время */}
									<div className="text-sm font-mono text-gray-700 min-w-[110px]">
										{formatTimeRange(entry)}
									</div>

									{/* Задача и проект */}
									<div className="flex-1 mx-4">
										<p className="text-gray-800 font-medium break-words">
											{entry.comment || 'Название задачи'}
										</p>

										<div className="flex items-center gap-1.5 mt-1">
											<span className="w-2 h-2 rounded-full bg-green-500"></span>
											<span className="text-xs text-gray-500">
												{entry.projectTitle || 'Mobile App'}
											</span>
										</div>
									</div>

									{/* Длительность и кнопка play */}
									<div className="flex items-center gap-3">
										<span className="text-sm font-semibold text-gray-700 min-w-[60px] text-right">
											{formatTimeFromMs(entry.duration, true)}
										</span>

										<button
											disabled={isPlayTracker}
											className={`flex items-center justify-center w-8 h-8 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors ${
												isPlayTracker
													? 'opacity-50 cursor-not-allowed'
													: ''
											}`}
											onClick={() =>
												playTaskAgain(
													entry.projectId,
													entry.taskId,
													entry.comment,
												)
											}
										>
											<Icon
												icon="solar:play-bold"
												className="w-4 h-4"
											/>
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
};

// import { formatTimeRange, formatTimeFromMs } from '../../../../../utils';
// import { Icon } from '@iconify/react';

// export const TodayTimeEntryCard = ({ todayTimeEntries, onClick }) => {
// 	const groupByProject = (array) => {
// 		return array.reduce((acc, entry) => {
// 			const projectId = entry.projectId || 'no-project';

// 			if (!acc[projectId]) {
// 				acc[projectId] = [];
// 			}

// 			acc[projectId].push(entry);

// 			return acc;
// 		}, {});
// 	};

// 	const groupedEntries = groupByProject(todayTimeEntries);

// 	const playTaskAgain = (projectId, taskId, comment) => {
// 		onClick(projectId, taskId, comment);
// 	};

// 	console.log('groupedEntries', groupedEntries);

// 	if (!todayTimeEntries || todayTimeEntries.length === 0) {
// 		return <p className="text-center text-gray-500 py-8">Нет записей за сегодня</p>;
// 	}

// 	return (
// 		<div>
// 			{Object.entries(groupedEntries).map(([projectId, entries]) => (
// 				<div key={projectId} className="mb-6">
// 					{/* Проект */}
// 					<h4 className="text-sm font-semibold text-gray-700 mb-2">
// 						{entries[0]?.projectTitle || 'Без проекта'}
// 					</h4>

// 					<div className="bg-white rounded-xl border border-gray-200">
// 						{entries.map((entry, idx) => (
// 							<div
// 								key={entry.id}
// 								className={`flex items-center justify-between p-4 transition-all cursor-pointer ${
// 									idx < entries.length - 1
// 										? 'border-b border-gray-200'
// 										: ''
// 								} hover:bg-gray-50`}
// 							>
// 								{/* Время */}
// 								<div className="text-sm font-mono text-gray-700 min-w-[110px]">
// 									{formatTimeRange(entry)}
// 								</div>

// 								{/* Задача и проект */}
// 								<div className="flex-1 mx-4">
// 									<p className="text-gray-800 font-medium truncate">
// 										{entry.comment || 'Название задачи'}
// 									</p>

// 									<div className="flex items-center gap-1.5 mt-1">
// 										<span className="w-2 h-2 rounded-full bg-green-500"></span>
// 										<span className="text-xs text-gray-500">
// 											{entry.projectTitle || 'Mobile App'}
// 										</span>
// 									</div>
// 								</div>

// 								{/* Длительность и кнопка play */}
// 								<div className="flex items-center gap-3">
// 									<span className="text-sm font-semibold text-gray-700 min-w-[60px] text-right">
// 										{formatTimeFromMs(entry.duration, true)}
// 									</span>

// 									<button
// 										className="flex items-center justify-center w-8 h-8 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
// 										onClick={() =>
// 											playTaskAgain(
// 												entry.id,
// 												entry.taskId,
// 												entry.comment,
// 											)
// 										}
// 									>
// 										<Icon
// 											icon="solar:play-bold"
// 											className="w-4 h-4"
// 										/>
// 									</button>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			))}
// 		</div>
// 	);
// };
