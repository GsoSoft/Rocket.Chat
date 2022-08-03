import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { IMediaPost } from '@rocket.chat/core-typings';

import { MediaPostService } from '../../services/gso';
import { IMediaPostCreateParams, IMediaPostUpdateParams } from '../../sdk/types/gso/IMediaPostService';

Meteor.methods({
	async createMediaPost(params: IMediaPostCreateParams): Promise<IMediaPost> {
		check(
			params,
			Match.ObjectIncluding({
				caption: String,
				images: Array,
			}),
		);

		if (!Meteor.user()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		const MediaPosts = new MediaPostService();

		const blog = await MediaPosts.create({ ...params, createdBy: Meteor.user()?.username });

		return blog;
	},

	async createManyMediaPosts(blogs: Omit<IMediaPostCreateParams, 'authorId'>[]): Promise<void> {
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}
		const MediaPosts = new MediaPostService();
		const data: IMediaPostCreateParams[] = blogs.map((blog) => ({ ...blog, createdBy: Meteor.user()?.username }));
		await MediaPosts.createMany(data);
	},

	async deleteMediaPost(blogId: IMediaPost['_id']): Promise<boolean> {
		check(blogId, String);

		const MediaPosts = new MediaPostService();

		await MediaPosts.delete(blogId);

		return true;
	},

	async getMediaPosts(limit?: number): Promise<IMediaPost[]> {
		check(limit, Match.Optional(Number));

		const MediaPosts = new MediaPostService();

		// const result = await MediaPosts.list(limit).toArray();
		const result = await MediaPosts.list(limit).toArray();

		return result;
	},

	async getOneMediaPost(blogId: IMediaPost['_id']): Promise<IMediaPost> {
		check(blogId, String);

		const MediaPosts = new MediaPostService();

		const blog = await MediaPosts.getMediaPost(blogId);

		return blog;
	},

	async updateMediaPost(blogId: IMediaPost['_id'], params: IMediaPostUpdateParams): Promise<boolean> {
		check(blogId, String);
		check(
			params,
			Match.ObjectIncluding({
				caption: Match.Optional(String),
				images: Match.Optional(Array),
			}),
		);

		const MediaPosts = new MediaPostService();

		await MediaPosts.update(blogId, params);

		return true;
	},
	async getMediaPostsWithoutComment(paginationOptions, queryOptions): Promise<IMediaPost[]> {
		check(
			paginationOptions,
			Match.ObjectIncluding({
				offset: Match.Optional(Number),
				count: Match.Optional(Number),
			}),
		);
		check(
			queryOptions,
			Match.ObjectIncluding({
				sort: Match.Optional(Match.Any),
				query: Match.Optional(Object),
			}),
		);

		const MediaPosts = new MediaPostService();

		const posts = await MediaPosts.listWithoutComments(paginationOptions, queryOptions);

		return posts;
	},
});
