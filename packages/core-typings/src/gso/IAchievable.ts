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

export interface ITask extends IAchievable {
	type: 'daily' | 'longterm';
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

