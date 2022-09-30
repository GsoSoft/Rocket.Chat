import type { ITask } from '@rocket.chat/core-typings';

import type { IBaseModel } from '../IBaseModel';

export interface IAchievablesModel extends IBaseModel<ITask> {
	findByOwner(name: any, options: any): any;
}
