import { useState, useEffect } from 'react';

export const Timer = () => {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let interval;

		if (isRunning) {
			interval = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 1000);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [isRunning]);

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	return (
		<div>
			<div>{formatTime(time)}</div>
			<button onClick={() => setIsRunning(true)} disabled={isRunning}>
				Start
			</button>
			<button onClick={() => setIsRunning(false)} disabled={!isRunning}>
				Pause
			</button>
			<button
				onClick={() => {
					setTime(0);
					setIsRunning(false);
				}}
			>
				Reset
			</button>
		</div>
	);
};
