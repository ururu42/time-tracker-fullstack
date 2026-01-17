export interface TimeEntry {
	id: string;
	owner: string;
	taskId: string;
	startTime: string;
	endTime: string;
	duration: number;
	comment?: string;
	createdAt: string;
	updatedAt: string;
}

export interface TimeEntryWithoutId {
	owner: string;
	taskId: string;
	startTime: string;
	endTime: string;
	duration: number;
	comment?: string;
}
