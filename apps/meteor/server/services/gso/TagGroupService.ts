import { FindCursor } from 'mongodb';
import { ITagGroup } from '@rocket.chat/core-typings/dist/gso';
import { TagGroups } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { ITagGroupService, ITagGroupCreateParams, ITagGroupUpdateParams }  from '@rocket.chat/core-services';

export class TagGroupService extends ServiceClassInternal implements ITagGroupService {
	protected name = 'tagGroup';

	async create(params: ITagGroupCreateParams): Promise<ITagGroup> {
		const createData: InsertionModel<ITagGroup> = {
			createdAt: new Date(),
			...params,
		};
		const result = await TagGroups.insertOne(createData);
		const tagGroup = await TagGroups.findOneById(result.insertedId);
		if (!tagGroup) throw new Error('tagGroup-does-not-exist');
		return tagGroup;
	}

	async createMany(tagGroups: ITagGroupCreateParams[]): Promise<void> {
		const data: InsertionModel<ITagGroup>[] = tagGroups.map((tagGroup) => ({
			...tagGroup,
			createdAt: new Date(),
		}));
		await TagGroups.insertMany(data);
	}

	async delete(tagGroupId: string): Promise<void> {
		await this.getTagGroup(tagGroupId);
		await TagGroups.removeById(tagGroupId);
	}

	async getTagGroup(tagGroupId: string): Promise<ITagGroup> {
		const tagGroup = await TagGroups.findOneById(tagGroupId);
		if (!tagGroup) throw new Error('tagGroup-does-not-exist');
		return tagGroup;
	}

	async update(tagGroupId: string, params: ITagGroupUpdateParams): Promise<ITagGroup> {
		await this.getTagGroup(tagGroupId);
		const query = {
			_id: tagGroupId,
		};
		const updateData = {
			...params,
		};
		const result = await TagGroups.updateOne(query, { $set: updateData });
		const tagGroup = await TagGroups.findOneById(result.upsertedId._id.toHexString());
		if (!tagGroup) throw new Error('tagGroup-does-not-exist');
		return tagGroup;
	}

	list(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<ITagGroup> = { sort: {} },
	): FindCursor<ITagGroup> {
		return TagGroups.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
