import { useDispatch } from 'react-redux';
import { updateTaskCommentAsync } from '../../../../../../../../../../../action';
import { Button } from '../../../../../../../../../../../components';

export const EditingCommentTask = ({
	setEditingCommentId,
	editCommentDiscription,
	setEditCommentDiscription,
	editingCommentId,
}) => {
	const dispatch = useDispatch();

	// Отмена редактирования
	const cancelEditing = () => {
		setEditingCommentId(null);
		setEditCommentDiscription('');
	};

	// Сохранение изменений
	const saveEditing = () => {
		if (editCommentDiscription.trim()) {
			dispatch(updateTaskCommentAsync(editingCommentId, editCommentDiscription));
			cancelEditing();
		}
	};
	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Описание
				</label>
				<textarea
					value={editCommentDiscription}
					onChange={(e) => setEditCommentDiscription(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Введите описание задачи"
					rows={3}
				/>
			</div>

			<div className="flex gap-2">
				<Button
					onClick={saveEditing}
					className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
				>
					Сохранить
				</Button>
				<Button
					onClick={cancelEditing}
					className="px-4 py-2 bg-gray-400 text-white hover:bg-gray-500 transition-colors"
				>
					Отмена
				</Button>
			</div>
		</div>
	);
};
