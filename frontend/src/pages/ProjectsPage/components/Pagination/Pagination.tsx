import { Button } from '../../../../components';
import { Icon } from '@iconify/react';

export const Pagination = ({ setPage, page, lastPage }) => {
	return (
		<div className="flex items-center justify-center gap-2 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
			<button
				disabled={page === 1}
				onClick={() => setPage(1)}
				className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-600 hover:text-green-800 rounded-lg disabled:opacity-40 disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-all font-medium text-sm"
			>
				<Icon icon="solar:alt-arrow-left-bold" className="w-4 h-4" />В начало
			</button>

			<button
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
				className="flex items-center justify-center p-2 bg-white text-gray-600 hover:text-green-800 rounded-lg disabled:opacity-40 disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-all"
			>
				<Icon icon="solar:alt-arrow-left-linear" className="w-5 h-5" />
			</button>

			<div className="flex items-center px-4 py-2 bg-green-50 text-green-800 rounded-lg font-semibold text-sm">
				{page} из {lastPage}
			</div>

			<button
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
				className="flex items-center justify-center p-2 bg-white text-gray-600 hover:text-green-800 rounded-lg disabled:opacity-40 disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-all"
			>
				<Icon icon="solar:alt-arrow-right-linear" className="w-5 h-5" />
			</button>

			<button
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
				className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-600 hover:text-green-800 rounded-lg disabled:opacity-40 disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-all font-medium text-sm"
			>
				В конец
				<Icon icon="solar:alt-arrow-right-bold" className="w-4 h-4" />
			</button>
		</div>
	);
};
