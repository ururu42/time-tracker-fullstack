import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTimeEntries } from '../../../../../../../../../../selectors';
import {
	formatTimeFromDate,
	formatTimeFromMs,
} from '../../../../../../../../../../utils';
import { EditingCommentTask } from './EditingCommetTask/EditingCommentTask';
import { Icon } from '@iconify/react';

export const CommentListForTask = ({ tasksByProject, task }) => {
	const timeEntries = useSelector(selectTimeEntries);
	const [editingCommentId, setEditingCommentId] = useState(null);
	const [editCommentDiscription, setEditCommentDiscription] = useState(null);

	const filteredTimeEntriesByProject = timeEntries.filter(
		(entry) => entry.projectId === tasksByProject?.[0]?.projectId,
	);

	const taskEntries = filteredTimeEntriesByProject.filter(
		(entry) => entry.taskId === task.id,
	);

	console.log('taskEntries', taskEntries);

	const startEditing = (entry) => {
		setEditingCommentId(entry.id);
		setEditCommentDiscription(entry.comment || '');
	};

	return (
		<div className="space-y-2">
			{taskEntries.length > 0 ? (
				<div className="w-full bg-white rounded-xl border border-gray-100 overflow-hidden">
					<div className="grid grid-cols-[7fr_1fr_1fr_1fr_1fr] px-6 py-3 border-b border-gray-100">
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
						{taskEntries.map((entry) => (
							<>
								{editingCommentId === entry.id ? (
									<EditingCommentTask
										setEditingCommentId={setEditingCommentId}
										editCommentDiscription={editCommentDiscription}
										setEditCommentDiscription={
											setEditCommentDiscription
										}
										editingCommentId={editingCommentId}
									/>
								) : (
									<>
										<div
											key={entry.id}
											className="grid grid-cols-[7fr_1fr_1fr_1fr_1fr] items-center px-6 py-4 hover:bg-gray-50/50 transition-colors"
										>
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
											<div className="flex ml-6">
												<Icon
													icon="mdi:edit"
													className="w-5 h-5 text-gray-600 hover:text-gray-700 cursor-pointer"
													onClick={() => startEditing(entry)}
												/>
												<Icon
													icon="mdi:delete-forever"
													className="w-5 h-5 text-red-600 hover:text-red-700 ml-2 cursor-pointer"
													onClick={() =>
														onCommentRemove(entry.id)
													}
												/>
											</div>
										</div>
									</>
								)}
							</>
						))}
					</div>
				</div>
			) : (
				<div className="text-xs text-gray-300 italic p-2">
					Пока нет записей времени...
				</div>
			)}
		</div>
	);
};
