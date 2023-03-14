import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import { ITagGroup } from '@rocket.chat/core-typings/src/gso';
import { Cursor } from 'mongodb';

export type ITagGroupWithoutID = Omit<ITagGroup, '_id'>;

export type ITagGroupLean = Omit<ITagGroup, 'createdAt' | '_updatedAt' | '_id'>;

export type ITagGroupCreateParams = Omit<ITagGroup, 'createdAt' | '_updatedAt'>;

export type ITagGroupUpdateParams = Partial<ITagGroupLean>;

export interface ITagGroupService {
	create(params: ITagGroupCreateParams): Promise<ITagGroup>;
	createMany(tagGroups: ITagGroupCreateParams[]): Promise<void>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<ITagGroup>): Cursor<ITagGroup>;
	update(tagId: string, params: ITagGroupUpdateParams): Promise<ITagGroup>;
	delete(tagId: string): Promise<void>;
	getTagGroup(tagId: string): Promise<ITagGroup>;
}
