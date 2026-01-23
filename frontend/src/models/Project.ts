import { Task } from './Task';

export interface Project {
	id: string;
	owner: string;
	title: string;
	description: string;
	isArchived: boolean;
	createdAt: string;
	updatedAt: string;
	tasks?: Task[];
	taskCount?: number;
}
