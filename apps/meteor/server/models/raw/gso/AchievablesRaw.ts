import { IAchievable, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IAchievablesModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import type { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

// @ts-ignore
export class AchievablesRaw extends BaseRaw<IAchievable> implements IAchievablesModel {
	private _name: any;

	private _options: any;

	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IAchievable>>) {
		super(db, getCollectionName('achievable'), trash); // name in singular, like room!!
	}

	findByOwner(name: any, options: any) {
		this._name = name;
		this._options = options;
		throw new Error('Method not implemented.');
	}

	findByTypes(types, options = {}) {
		const query = {
			t: {
				$in: types,
			},
		};
		return this.findPaginated(query, options);
	}
}
