import { IMediaPost, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IMediaPostsModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import { Db, Collection, AggregationCursor } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class MediaPostsRaw extends BaseRaw<IMediaPost> implements IMediaPostsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IMediaPost>>) {
		super(db, getCollectionName('mediaPosts'), trash);
	}

	getMediaPostsWithComments(limit: number): AggregationCursor<IMediaPost> {
		const pipeline = [
			{
				$lookup: {
					from: 'comments',
					as: 'comments',
					let: { post: '$_id' },
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ['$blogId', '$$post'],
								},
							},
						},
						{ $limit: limit },
					],
				},
			},
		];
		return this.col.aggregate(pipeline);
	}
}
