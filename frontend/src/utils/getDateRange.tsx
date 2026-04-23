import { getCurrentMonthRange } from './getCurrentMonthRange';
import { getLastMonthRange } from './getLastMonthRange';
import { getThisWeekRange } from './getThisWeekRange';
import { getTodayRange } from './getTodayRange';

export const getDateRange = (selectedPeriod, customDateRange) => {
	switch (selectedPeriod) {
		case 'today':
			return getTodayRange();
		case 'current-month':
			return getCurrentMonthRange();
		case 'this-week':
			return getThisWeekRange();
		case 'last-month':
			return getLastMonthRange();
		case 'custom':
			if (customDateRange) {
				return {
					startDate: customDateRange.startDate,
					endDate: customDateRange.endDate,
				};
			}
			return getCurrentMonthRange();

		default:
			return getCurrentMonthRange();
	}
};
