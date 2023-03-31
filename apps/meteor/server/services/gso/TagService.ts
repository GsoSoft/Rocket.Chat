import { AggregationCursor, FindCursor } from 'mongodb';
import { ITag } from '@rocket.chat/core-typings/dist/gso';
import { Tags } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { ServiceClassInternal } from '@rocket.chat/core-services';
import { ITagService, ITagCreateParams, ITagUpdateParams } from '@rocket.chat/core-services';

export class TagService extends ServiceClassInternal implements ITagService {
	protected name = 'tag';

	async create(params: ITagCreateParams): Promise<ITag> {
		const createData: InsertionModel<ITag> = {
			createdAt: new Date(),
			...params,
		};
		const result = await Tags.insertOne(createData);
		const tag = await Tags.findOneById(result.insertedId);
		if (!tag) throw new Error('tag-does-not-exist');
		return tag;
	}

	async createMany(tags: ITagCreateParams[]): Promise<void> {
		const data: InsertionModel<ITag>[] = tags.map((tag) => ({
			...tag,
			createdAt: new Date(),
		}));
		await Tags.insertMany(data);
	}

	async delete(tagId: string): Promise<void> {
		await this.getTag(tagId);
		await Tags.removeById(tagId);
	}

	async getTag(tagId: string): Promise<ITag> {
		const tag = await Tags.findOneById(tagId);
		if (!tag) throw new Error('tag-does-not-exist');
		return tag;
	}

	async update(tagId: string, params: ITagUpdateParams): Promise<ITag> {
		await this.getTag(tagId);
		const query = {
			_id: tagId,
		};
		const updateData = {
			...params,
		};
		const result = await Tags.updateOne(query, { $set: updateData });
		const tag = await Tags.findOneById(result.upsertedId._id.toHexString());
		if (!tag) throw new Error('tag-does-not-exist');
		return tag;
	}

	list(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<ITag> = { sort: {} },
	): Cursor<ITag> {
		return Tags.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}

	listByCategory(limit?: number | undefined): AggregationCursor<ITag> {
		return Tags.getTagsByCategory(limit);
	}
}
