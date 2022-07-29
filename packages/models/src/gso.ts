import type {
	IBlogsModel,
	ICommentsModel,
	IFundTransactionsModel,
	IGamesModel,
	IGatewaysModel,
	IPaymentGatewaysModel,
	IProductsModel,
	ITagGroupsModel,
	ITagsModel,
	ITasksModel,
	ITransactionsModel,
	IFundBalancesModel,
	IMediaPostsModel,
} from '@rocket.chat/model-typings';

import { proxify } from './proxify';

export const FundTransactions = proxify<IFundTransactionsModel>('IFundTransactionsModel');
export const FundBalances = proxify<IFundBalancesModel>('IFundBalancesModel');
export const Blogs = proxify<IBlogsModel>('IBlogsModel');
export const Comments = proxify<ICommentsModel>('ICommentsModel');
export const Games = proxify<IGamesModel>('IGamesModel');
export const Gateways = proxify<IGatewaysModel>('IGatewaysModel');
export const Products = proxify<IProductsModel>('IProductsModel');
export const TagGroups = proxify<ITagGroupsModel>('ITagGroupsModel');
export const Tags = proxify<ITagsModel>('ITagsModel');
export const Tasks = proxify<ITasksModel>('ITasksModel');
export const Transactions = proxify<ITransactionsModel>('ITransactionsModel');
export const PaymentGateways = proxify<IPaymentGatewaysModel>('IPaymentGatewaysModel');
export const MediaPosts = proxify<IMediaPostsModel>('IMediaPostsModel');
