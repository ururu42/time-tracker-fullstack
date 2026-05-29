import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodayTimeEntries } from '../../../../selectors';
import { fetchTimeEntriesAsync } from '../../../../action';
import { TodayTimeEntryCard } from './TodayTimeEntryCard/TodayTimeEntryCard';

export const TodayTimeEntries = ({ onClick, isPlayTracker }) => {
	const todayTimeEntries = useSelector(selectTodayTimeEntries);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTimeEntriesAsync());
	}, []);

	return (
		<div className="col-span-1 lg:col-span-2">
			<h2 className="text-lg font-semibold text-gray-900 mb-4 ml-4">
				Записи за сегодня
			</h2>
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
				<TodayTimeEntryCard
					todayTimeEntries={todayTimeEntries}
					onClick={onClick}
					isPlayTracker={isPlayTracker}
				/>
			</div>
		</div>
	);
};
