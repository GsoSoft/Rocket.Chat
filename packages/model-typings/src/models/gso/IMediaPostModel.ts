import type { IMediaPost as T } from '@rocket.chat/core-typings';
import type { AggregationCursor } from 'mongodb';

import type { IBaseModel } from '../IBaseModel';

export interface IMediaPostsModel extends IBaseModel<T> {
	getMediaPostsWithComments(limit: number): AggregationCursor<T>;
}
