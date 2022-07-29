import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { BlogsRaw } from '../raw/gso';

registerModel('IBlogsModel', new BlogsRaw(db, trashCollection));
