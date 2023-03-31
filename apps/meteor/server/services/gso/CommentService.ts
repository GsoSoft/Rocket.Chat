import { FindCursor } from 'mongodb';
import { IComment } from '@rocket.chat/core-typings/dist/gso';
import { Comments } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { ServiceClassInternal } from '@rocket.chat/core-services';
import { ICommentService, ICommentCreateParams, ICommentUpdateParams } from '../../sdk/types/ICommentService';

export class CommentService extends ServiceClassInternal implements ICommentService {
	protected name = 'comment';

	async create(params: ICommentCreateParams): Promise<IComment> {
		const createData: InsertionModel<IComment> = {
			...params,
			createdAt: new Date(),
		};
		const result = await Comments.insertOne(createData);
		const comment = await Comments.findOneById(result.insertedId);
		if (!comment) throw new Error('comment-does-not-exist');
		return comment;
	}

	async createMany(comments: ICommentCreateParams[]): Promise<void> {
		const data: InsertionModel<IComment>[] = comments.map((comment) => ({ ...comment, createdAt: new Date() }));

		await Comments.insertMany(data);
	}

	async delete(commentId: string): Promise<void> {
		await this.getComment(commentId);
		await Comments.removeById(commentId);
	}

	async getComment(commentId: string): Promise<IComment> {
		const comment = await Comments.findOneById(commentId);
		if (!comment) {
			throw new Error('comment-does-not-exist');
		}
		return comment;
	}

	async update(commentId: string, params: ICommentUpdateParams): Promise<IComment> {
		await this.getComment(commentId);
		const query = {
			_id: commentId,
		};
		const updateData = {
			...params,
		};
		const result = await Comments.updateOne(query, { $set: updateData });
		const comment = await Comments.findOneById(result.upsertedId._id.toHexString());
		if (!comment) throw new Error('comment-does-not-exist');
		return comment;
	}

	list(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<IComment> = { sort: {} },
	): FindCursor<IComment> {
		return Comments.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
