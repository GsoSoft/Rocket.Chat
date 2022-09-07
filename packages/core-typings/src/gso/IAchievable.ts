import type { IRocketChatRecord } from '../IRocketChatRecord';

export enum IAchievableStatus {
	EXPIRED = 'EXPIRED',
	FAILED = 'FAILED',
	ACTIVE = 'ACTIVE', // created
	COMPLETED = 'COMPLETED ',
}

// export enum IAchievableType {
// 	DAILY = 'EXPIRED',
// 	FAILED = 'FAILED',
// 	ACTIVE = 'ACTIVE', // created
// 	COMPLETED = 'COMPLETED ',
// }

/**
 * A thing (task, trophy) that use can achieve by doing something!
 */
export interface IAchievable extends IRocketChatRecord {
	/**
	 * this code will be used by client side for description multi-language.
	 * For ex : achievable_daily_poke_friend, etc...
	 * correspondingly : english lang data can be:
	 *   "gso_achievable_daily_poke_friend": "Poke a friend daily to get reward...",
	 *
	 */
	code: string;

	/**
	 * Internal use: in english helping staff to understand its purpose!
	 * For end user , use translation with @code
	 */
	_description: string;
	startDate: Date;
	endDate: Date;
	/**
	 * the module/feature that manage this achievable
	 */
	assignedBy: string;
	assignedTo: string;
	type: string;
	sortOrder: number;
	/**
	 * created/failed/etc...
	 */
	status: IAchievableStatus;
	reward: number;
}

/**
 * Dopamine causes that little happy feeling when someone likes your post on Instagram, fill in a checkbox, or complete a small task.
 *
 */
export interface ITask extends IAchievable {
	type: 'daily' | 'weekly' | 'monthly';
	sortOrder: number;
	/**
	 * usually Item
	 */
	reward: any;
	/**
	 * react route ?!
	 */
	uiRoute: string;
}

/**
 * "to do" Tasks
 * Can be assigned by system or another member or self.
 * Oxytocin: The “love” hormone, gives you a rush of pleasure from affection and connection.
 */
export interface ITodo extends IAchievable {
	type: 'todo';
	sortOrder: number;
}

/**
 * Tasks from event campaign.
 * Oxytocin: The “love” hormone, gives you a rush of pleasure from affection and connection.
 */
export interface IEventTask extends IAchievable {
	type: 'event';
	sortOrder: number;
}

/**
 * Serotonin is another social chemical, but it functions in an entirely different way.
 * Serotonin plays a role in the dynamics of pride, loyalty, and status. When we feel a sense of accomplishment or recognition from others, we are experiencing the effects of serotonin.
 * This could be from receiving your diploma, crossing the finish line in a race, or being appreciated for hard work in the office.
 * Serotonin can create strong, positive emotions.
 *
 * a.k.a : Achievement , badge, etc
 * https://reddit.fandom.com/wiki/Trophy
 * https://stackoverflow.com/help/badges
 */
export interface ITrophy extends IAchievable {
	type: 'achievements'; // well
	sortOrder: number;
	/**
	 * usually Item from inventory
	 */
	reward: any;
	/**
	 * react route ?!
	 */
	uiRoute: string;
	icon: string;
}
