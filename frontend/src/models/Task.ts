export interface Task {
	id: string;
	owner: string;
	projectId: string;
	title: string;
	description: string;
	status: 'todo' | 'in-progress' | 'completed';
	priority: 'low' | 'medium' | 'high';
	isArchived: boolean;
	createdAt: string;
	updatedAt: string;
}
