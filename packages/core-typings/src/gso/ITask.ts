import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface ITask extends IRocketChatRecord {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	assignedBy: string;
	assignedTo: string;
	type: 'daily' | 'longterm' | 'achievements';
	sortOrder: number;
	status: -1 | 0 | 1;
	reward: number;
	/**
	 * react route ?!
	 */
	uiRoute: string;
}
