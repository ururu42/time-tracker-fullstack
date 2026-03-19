import { Button } from '../../../../components';
import { Icon } from '@iconify/react';

export const Pagination = ({ setPage, page, lastPage }) => {
	return (
		<div className="flex items-center justify-center gap-2">
			<Button
				disabled={page === 1}
				onClick={() => setPage(1)}
				className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				<Icon icon="solar:alt-arrow-left-bold" className="w-4 h-4" />
				В начало
			</Button>
			<Button
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
				className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				<Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4" />
			</Button>
			<div className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium">
				Страница {page} из {lastPage}
			</div>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
				className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				<Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
			</Button>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
				className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				В конец
				<Icon icon="solar:alt-arrow-right-bold" className="w-4 h-4" />
			</Button>
		</div>
	);
};
