export interface User {
	id: string;
	login: string;
	name?: string;
	avatar?: string;
	role: number;
	settings: {
		timezone: string;
	};
	createdAt: string;
	updatedAt: string;
}
