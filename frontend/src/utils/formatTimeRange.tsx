export const formatTimeRange = (data) => {
	const startTime = new Date(data.startTime);
	const endTime = new Date(data.endTime);

	const startHours = String(startTime.getHours()).padStart(2, '0');
	const startMinutes = String(startTime.getMinutes()).padStart(2, '0');

	const endHours = String(endTime.getHours()).padStart(2, '0');
	const endMinutes = String(endTime.getMinutes()).padStart(2, '0');

	return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
};
