import type { AtLeastOne, IBlog, PartialBy } from '@rocket.chat/core-typings';
import type { AggregationCursor, FindCursor } from 'mongodb';

export type IBlogWithoutID = PartialBy<Omit<IBlog, '_id'>, 'tags'>;

export type IBlogLean = Omit<IBlog, 'createdAt' | '_updatedAt' | '_id'>;

export type IBlogCreateParams = PartialBy<IBlogLean, 'tags'>;

export type IBlogCreateBody = PartialBy<Omit<IBlog, '_id'>, 'tags'>;

export type IBlogUpdateParams = AtLeastOne<IBlogLean>;

export type IBlogUpdateBody = IBlogUpdateParams & { _updatedAt: IBlog['_updatedAt'] };

export interface IBlogService {
	create(params: IBlogCreateParams): Promise<IBlog>;

	createMany(blogs: IBlogCreateParams[]): Promise<void>;

	list(limit?: number): AggregationCursor<IBlog> | FindCursor;

	update(blogId: string, params: IBlogUpdateParams): Promise<IBlog>;

	delete(blogId: string): Promise<void>;

	getBlog(blogId: string): Promise<IBlog>;
}
