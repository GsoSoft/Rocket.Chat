import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IAchievable extends IRocketChatRecord {
	/**
	 * this code will be used by client side for description multi-language.
	 * For ex : USD, JPY, VND, etc...
	 * correspondingly : english lang data can be:
	 *   "gso_currency_USD_desc": "This is United State Dollar, bla bla...",
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
	status: any;
	reward: number;
}

/**
 * Dopamine causes that little happy feeling when someone likes your post on Instagram, fill in a checkbox, or complete a small task.
 *
 */
export interface ITask extends IAchievable {
	type: 'daily' | 'weekly' | 'monthly';
	sortOrder: number;
	status: -1 | 0 | 1;
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
 * Tasks from event campaign.
 * Oxytocin: The “love” hormone, gives you a rush of pleasure from affection and connection.
 */
export interface IEventTask extends IAchievable {
	type: 'event';
	sortOrder: number;
	status: -1 | 0 | 1;
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
	type: 'achievements';
	sortOrder: number;
	status: -1 | 0 | 1;
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
