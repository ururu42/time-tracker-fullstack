import { Button } from '../../../../components';

export const Pagination = ({ setPage, page, lastPage }) => {
	return (
		<div className="flex justify-between w-full ">
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				{'<<'} В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				{'<'} Предыдущая
			</Button>
			<div className="flex items-center p-3 text-gray-600 border-b border-gray-300">
				Страница: {page}
			</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая {'>'}
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец {'>>'}{' '}
			</Button>
		</div>
	);
};
