import type { IUser } from '../IUser';
import type { IRocketChatRecord } from '../IRocketChatRecord';
// import type { ICurrency } from './ICurrency';

export interface IInventory extends IRocketChatRecord {
	createdAt: Date;
	ownerId: IUser['_id'];
	/**
	 *
	 */
	items: Array<IInventoryItem>;
	/**
	 * Total number of item. Each item type is counted as 1. Not the  amount of each item-type combined
	 */
	itemCount: number;
}

/**
 * Item in user inventory/bag. Item can be created by various modules within the system, and can be burned/exchange for other items.
 */
export interface IInventoryItem {
	itemId: IInventory['_id'];
	createdAt: Date;
	lastUpdate: Date;
	amount: number;
	isNew: boolean;
}

/**
 * Item in user inventory/bag. Item can be created by various modules within the system, and can be burned/exchange for other items.
 */
export interface IItem {
	/**
	 * module that manage this type of item
	 */
	managedBy: any;

	/**
	 * If pricing is there, 	purchasable = true ;
	 * sale price versus the global currency
	 * Format:
	 * {
	 *   "USD": 352,
	 *   "JPY": 42
	 * }
	 */
	pricing: any;

	/**
	 * this code will be used by client side for name/description in multi-language.
	 * convention [module]_[name]: gift_rose, game_vipTicket, job_postingTicket, etc...
	 * correspondingly, english lang data can be:
	 *   "gso_gift_rose_name": "a rose",
	 *   "gso_gift_rose_desc": "This is a rose to gift to someone u love, blabla..",
	 *
	 */
	code: string;

	icon: string;
}

// export interface IItemPrice {
// 	currencyCode:ICurrency;
// 	/**
// 	 *
// 	 */
// 	unit: string;
// 	price: number;
//
// }
