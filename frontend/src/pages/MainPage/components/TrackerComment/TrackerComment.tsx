export const TrackerComment = ({ timerComment, setTimerComment, disabled }) => {
	return (
		<div className="mb-6">
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Комментрий таймера
			</label>
			<textarea
				value={timerComment}
				onChange={(e) => setTimerComment(e.target.value)}
				placeholder={
					disabled ? 'Сначала выберите проект' : 'На что было потрачено время?'
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
