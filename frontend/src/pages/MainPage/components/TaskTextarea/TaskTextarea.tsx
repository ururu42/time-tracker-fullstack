export const TaskTextarea = ({ description, setDescription, disabled = false }) => {
	return (
		<div className="mb-6">
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Описание
			</label>
			<textarea
				value={description}
				onClick={(e) => setDescription(e.target.value)}
				placeholder={
					disabled ? 'Сначала выберите проект' : 'Поиск или название задачи...'
				}
				rows={4}
				className={`w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all ${
					disabled
						? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
						: 'bg-white border-gray-200 text-gray-700'
				}`}
				disabled={disabled}
			/>
		</div>
	);
};
