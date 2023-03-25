import type { AtLeastOne, IGame, IPaginationOptions, IQueryOptions, PartialBy } from '@rocket.chat/core-typings';

export type IGameWithoutID = PartialBy<Omit<IGame, '_id'>, 'tags' | 'ranking'>;

export type IGameLean = Omit<IGame, 'createdAt' | '_updatedAt' | '_id'>;

export type IGameCreateParams = PartialBy<IGameLean, 'tags' | 'ranking'>;

export type IGameUpdateParams = AtLeastOne<IGameLean>;

export type IGameUpdateBody = IGameUpdateParams & { _updatedAt: IGame['_updatedAt'] };

export interface IGameService {
	create(params: IGameCreateParams): Promise<IGame>;
	createMany(games: IGameCreateParams[]): Promise<void>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<IGame>): Promise<IGame>;
	update(gameId: string, params: IGameUpdateParams): Promise<IGame>;
	delete(gameId: string): Promise<void>;
	getGame(gameId: string): Promise<IGame>;
}
