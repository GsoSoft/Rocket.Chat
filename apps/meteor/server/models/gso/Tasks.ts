import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { AchievablesRaw } from '../raw/gso';

registerModel('ITasksModel', new AchievablesRaw(db, trashCollection));
