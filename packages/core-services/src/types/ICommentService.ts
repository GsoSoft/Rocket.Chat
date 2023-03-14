import { AtLeastOne, IComment, IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import { Cursor } from 'mongodb';

export type ICommentWithoutID = Omit<IComment, '_id'>;

export type ICommentLean = Omit<IComment, 'createdAt' | '_updatedAt' | '_id'>;

export type ICommentCreateParams = Omit<IComment, 'createdAt' | '_updatedAt' | '_id'>;

export type ICommentUpdateParams = AtLeastOne<ICommentLean>;

export type ICommentUpdateBody = ICommentUpdateParams & { _updatedAt: IComment['_updatedAt'] };

export interface ICommentService {
	create(params: ICommentCreateParams): Promise<IComment>;
	createMany(comments: ICommentCreateParams[]): Promise<void>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<IComment>): Cursor<IComment>;
	update(commentId: string, params: ICommentUpdateParams): Promise<IComment>;
	delete(commentId: string): Promise<void>;
	getComment(commentId: string): Promise<IComment>;
}
