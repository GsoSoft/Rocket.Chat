import type { IRocketChatRecord } from '../IRocketChatRecord';
import type { IComment } from './IComment';

export interface IMediaPost extends IRocketChatRecord {
	caption: string;
	images: Record<string, any>[];
	createdBy?: string;
	createdAt: Date;
	likes: number;
	comments?: IComment[];
}
