export const formatTime = (ms) => {
	const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, '0');

	const minutes = String(Math.floor((ms / 60000) % 60)).padStart(2, '0');

	const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');

	return `${hours}:${minutes}:${seconds}`;
};
