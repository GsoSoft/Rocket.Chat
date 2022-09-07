// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { DailyTasksContext, DispatchDailyTasksContext } from '../../contexts/DailyTasksContext/GlobalState';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import TaskTab from './components/TaskTab';
import TasksModal from './components/TasksModal';

const TropyView = (): ReactElement => {
	const { value } = useContext(UserPreviousPageContext);
	const { dispatch } = useContext(DispatchDailyTasksContext);
	const { expiringTasks, upcomingTasks, completedTasks } = useContext(DailyTasksContext);
	const [modal, setModal] = useState(false);
	const [gift, setGift] = useState(false);
	const [tasks, setTasks] = useState<Record<string, any>[]>([]);

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};

	// Clear the data in the reducer every five mins to force the page to refetch from
	// the backend.
	const callEvery5Minutes = (): void => {
		dispatch({ type: 'CLEAR_TASKS' });
	};

	useEffect(() => {
		const interval = window.setInterval(() => {
			callEvery5Minutes();
		}, 300000);
		return (): void => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch({ type: 'ADD_LOCATION', payload: { currentLocation: 'tasksPage' } });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!expiringTasks.length || !upcomingTasks.length || !completedTasks) {
			Meteor.call('getTasks', { offset: 1, count: 10 }, {}, (error, result) => {
				if (result) {
					if (result.length) {
						setTasks(result);
					} else {
						Meteor.call('seed', (error, result) => {
							if (result.length) {
								setTasks(result);
							}

							if (error) {
								console.log(error, 'error');
							}
						});
					}
				}

				if (error) {
					console.log(error, 'error');
				}
			});
		}
	}, [expiringTasks, upcomingTasks, completedTasks]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const sortTasks = useMemo(() => {
		if (tasks.length) {
			const newUpComingTasks: any = [];
			const newExpiringTasks: any = [];
			const newCompletedTasks: any = [];

			tasks.map((task, index) => {
				if (index === tasks.length - 1) {
					dispatch({
						type: 'ADD_TASKS',
						payload: { expiringTasks: newExpiringTasks, upcomingTasks: newUpComingTasks, completedTasks: newCompletedTasks },
					});
				}

				if (task.status === -1) {
					newUpComingTasks.push(task);
				} else if (task.status === 0) {
					newExpiringTasks.push(task);
				} else if (task.status === 1) {
					newCompletedTasks.push(task);
				}
				return null;
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tasks]);

	return (
		<Page>
			<ProfileHeader title='Pending tasks' handleRouteBack={handleRouteBack} />
			{modal ? <TasksModal gift={gift} closeModal={(): void => setModal(false)} /> : null}
			<Page.ScrollableContentWithShadow>
				<TaskTab title='EXPIRING' content={expiringTasks} setModal={setModal} setGift={setGift} />
				<TaskTab title='UPCOMING' content={upcomingTasks} setModal={setModal} setGift={setGift} />
				<TaskTab title='COMPLETED' content={completedTasks} setModal={setModal} setGift={setGift} />
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default TropyView;
