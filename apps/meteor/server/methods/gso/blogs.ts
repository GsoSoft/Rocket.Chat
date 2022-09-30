import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { IBlog } from '@rocket.chat/core-typings';

import { BlogService } from '../../services/gso';
import { IBlogCreateParams, IBlogUpdateParams } from '../../sdk/types/IBlogService';

Meteor.methods({
	async createBlog(params: IBlogCreateParams): Promise<IBlog> {
		check(
			params,
			Match.ObjectIncluding({
				title: String,
				content: String,
				tags: Match.Optional([String]),
			}),
		);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		const Blogs = new BlogService();

		const blog = await Blogs.create({ ...params, authorId: Meteor.userId() as string });

		return blog;
	},

	async createManyBlogs(blogs: Omit<IBlogCreateParams, 'authorId'>[]): Promise<void> {
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}
		const Blogs = new BlogService();
		const data: IBlogCreateParams[] = blogs.map((blog) => ({ ...blog, authorId: Meteor.userId() as string }));
		await Blogs.createMany(data);
	},

	async deleteBlog(blogId: IBlog['_id']): Promise<boolean> {
		check(blogId, String);

		const Blogs = new BlogService();

		await Blogs.delete(blogId);

		return true;
	},

	async getBlogs(limit?: number): Promise<IBlog[]> {
		check(limit, Match.Optional(Number));
		// console.log('getBlogs begin  ', limit);

		const Blogs = new BlogService();

		// const result = await Blogs.list(limit).toArray();
		const result = await Blogs.list(limit).toArray();
		// console.log('getBlogs result ', result);

		return result;
	},

	async getOneBlog(blogId: IBlog['_id']): Promise<IBlog> {
		check(blogId, String);

		const Blogs = new BlogService();

		const blog = await Blogs.getBlog(blogId);

		return blog;
	},

	async updateBlog(blogId: IBlog['_id'], params: IBlogUpdateParams): Promise<IBlog> {
		check(blogId, String);
		check(
			params,
			Match.ObjectIncluding({
				title: Match.Optional(String),
				authorId: Match.Optional(String),
				tags: Match.Optional([String]),
				content: Match.Optional(String),
			}),
		);

		const Blogs = new BlogService();

		const blog = await Blogs.update(blogId, params);

		return blog;
	},
});
