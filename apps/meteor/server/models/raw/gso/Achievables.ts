import { ITask, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IAchievablesModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class AchievablesRaw extends BaseRaw<ITask> implements IAchievablesModel {
	private _name: any;

	private _options: any;

	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ITask>>) {
		super(db, getCollectionName('task'), trash);
	}

	findByOwner(name: any, options: any) {
		this._name = name;
		this._options = options;
		throw new Error('Method not implemented.');
	}
}
