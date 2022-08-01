import { AtLeastOne, IMediaPost } from '@rocket.chat/core-typings';
import { AggregationCursor, FindCursor } from 'mongodb';

export type IMediaPostWithoutID = Omit<IMediaPost, '_id'>;

export type IMediaPostLean = Omit<IMediaPost, 'createdAt' | '_updatedAt' | '_id'>;

export type IMediaPostCreateParams = Omit<IMediaPost, 'createdAt' | '_updatedAt' | '_id'>;

export type IMediaPostUpdateParams = AtLeastOne<IMediaPostLean>;

export interface IMediaPostService {
	create(params: IMediaPostCreateParams): Promise<IMediaPost>;

	createMany(blogs: IMediaPostCreateParams[]): Promise<void>;

	list(limit?: number): AggregationCursor<IMediaPost> | FindCursor;

	update(blogId: string, params: IMediaPostUpdateParams): Promise<void>;

	delete(blogId: string): Promise<void>;

	getMediaPost(blogId: string): Promise<IMediaPost>;
}
