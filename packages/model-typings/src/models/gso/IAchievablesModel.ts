import type { IAchievable } from '@rocket.chat/core-typings';

import type { IBaseModel } from '../IBaseModel';

export interface IAchievablesModel extends IBaseModel<IAchievable> {
	findByOwner(name: any, options: any): any;

	findByTypes(types: any, options?: any): any;
}
