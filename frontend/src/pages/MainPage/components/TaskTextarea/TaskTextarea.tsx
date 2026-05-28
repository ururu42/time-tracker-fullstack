export const TaskTextarea = ({ description, setDescription }) => {
	return (
		<div className="mb-6">
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Описание
			</label>
			<textarea
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder={'Описание задачи...'}
				rows={4}
				className={`w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all`}
			/>
		</div>
	);
};
