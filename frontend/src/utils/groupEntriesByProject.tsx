export const groupEntriesByProject = (entries = []) => {
	return entries.reduce((acc, entry) => {
		const projectId = entry.projectId;

		if (!acc[projectId]) {
			acc[projectId] = [];
		}
		acc[projectId].push(entry);

		return acc;
	}, {});
};
