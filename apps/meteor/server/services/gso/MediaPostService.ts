import { AggregationCursor, FindCursor } from 'mongodb';
import { IMediaPost } from '@rocket.chat/core-typings/dist/gso';
import { InsertionModel } from '@rocket.chat/model-typings';
import { MediaPosts } from '@rocket.chat/models';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import { IMediaPostService, IMediaPostCreateParams, IMediaPostUpdateParams } from '../../sdk/types/gso/IMediaPostService';

export class MediaPostService extends ServiceClassInternal implements IMediaPostService {
	protected name = 'mediaPost';

	async create(params: IMediaPostCreateParams): Promise<IMediaPost> {
		const createData: InsertionModel<IMediaPost> = {
			...params,
			createdAt: new Date(),
			likes: Math.floor(Math.random() * 100000 + 1),
		};
		const result = await MediaPosts.insertOne(createData);
		const mediaPost = await MediaPosts.findOneById(result.insertedId);
		if (!mediaPost) throw new Error('mediaPost-does-not-exist');
		return mediaPost;
	}

	async createMany(mediaPosts: IMediaPostCreateParams[]): Promise<void> {
		const data: InsertionModel<IMediaPost>[] = mediaPosts.map((mediaPost) => ({
			...mediaPost,
			createdAt: new Date(),
			likes: Math.floor(Math.random() * 100000 + 1),
		}));
		await MediaPosts.insertMany(data);
	}

	async delete(mediaPostId: string): Promise<void> {
		await this.getMediaPost(mediaPostId);
		await MediaPosts.removeById(mediaPostId);
	}

	async getMediaPost(mediaPostId: string): Promise<IMediaPost> {
		const mediaPost = await MediaPosts.findOneById(mediaPostId);
		if (!mediaPost) {
			throw new Error('mediaPost-does-not-exist');
		}
		return mediaPost;
	}

	async update(mediaPostId: string, params: IMediaPostUpdateParams): Promise<IMediaPost> {
		await this.getMediaPost(mediaPostId);
		const query = {
			_id: mediaPostId,
		};
		const updateData = {
			...params,
		};
		const result = await MediaPosts.updateOne(query, { $set: updateData });
		const mediaPost = await MediaPosts.findOneById(result.upsertedId.toHexString());
		if (!mediaPost) throw new Error('mediaPost-does-not-exist');
		return mediaPost;
	}

	list(limit = 10): AggregationCursor<IMediaPost> | FindCursor {
		// return MediaPosts.find({}); 12
		return MediaPosts.getMediaPostsWithComments(limit);
	}

	async listWithoutComments(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<IMediaPost> = { sort: {} },
	): Promise<IMediaPost[]> {
		return MediaPosts.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		).toArray();
	}
}
