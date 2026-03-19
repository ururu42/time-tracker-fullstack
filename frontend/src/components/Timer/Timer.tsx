import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveTimeEntryAsync } from '../../action';
import { selectCurrentTimeEntry } from '../../selectors';
import { formatTime } from '../../utils';
import { Icon } from '@iconify/react';

export const Timer = ({ task, comment, setComment, disabled }) => {
	const currentTimeEntry = useSelector(selectCurrentTimeEntry);
	const [loading, setLoading] = useState('');
	const [error, setError] = useState('');

	const dispatch = useDispatch();

	const [elapsedTime, setElapsedTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState(null);
	// const [comment, setComment] = useState('');

	const intervalRef = useRef(null);

	const startTimer = () => {
		setIsRunning(true);
		setStartTime(() => new Date());

		intervalRef.current = setInterval(() => {
			setElapsedTime((prev) => prev + 1000);
		}, 1000);

		return intervalRef;
	};

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const stopTimer = () => {
		clearInterval(intervalRef.current);
		setIsRunning(false);
	};

	const saveTimer = () => {
		stopTimer();

		const endTime = new Date();

		const data = {
			startTime,
			endTime,
			duration: elapsedTime,
			taskId: task?.id,
			comment,
		};

		try {
			dispatch(saveTimeEntryAsync(data));
			setElapsedTime(0);
			setIsRunning(false);
			setStartTime(null);
			setComment('');
			setSelectedTaskId('');
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="flex items-center gap-4">
			<div className="text-4xl font-mono font-semibold text-gray-800">
				{formatTime(elapsedTime)}
			</div>
			{isRunning ? (
				<button
					className="flex items-center gap-2 bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
					onClick={stopTimer}
				>
					<Icon icon="solar:stop-circle-bold" className="w-5 h-5" />
					ОСТАНОВИТЬ
				</button>
			) : (
				<button
					className={`flex items-center gap-2 bg-indigo-900 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg font-medium transition-colors ${
						disabled
							? '!bg-gray-100 !border-gray-400 !text-gray-400 !cursor-not-allowed'
							: ''
					}`}
					disabled={disabled}
					onClick={startTimer}
				>
					<Icon icon="solar:play-circle-bold" className="w-5 h-5" />
					ЗАПУСТИТЬ
				</button>
			)}
			{/* Кнопка Сохранить (только если остановлен и есть время) */}
			{!isRunning && elapsedTime > 0 && (
				<button
					onClick={saveTimer}
					className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
				>
					<Icon icon="solar:check-circle-bold" className="w-5 h-5" />
					СОХРАНИТЬ
				</button>
			)}
		</div>
	);
};
