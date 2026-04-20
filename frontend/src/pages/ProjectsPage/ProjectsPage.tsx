import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { selectProjects, selectUser } from '../../selectors';
import { fetchProjects } from '../../action';
import { Pagination, ProjectList } from './components';
import { Search } from './components/Search/Search';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import { Button, HeaderAllPage } from '../../components';
import { Icon } from '@iconify/react';

export const ProjectsPage = () => {
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const user = useSelector(selectUser);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	if (!user || !user.id) {
		return <Navigate to="/login" replace />;
	}
	//странный useEffect, как будто это экшен, надо разобраться

	useEffect(() => {
		const fetchProjectsWithLastPage = async () => {
			const returnedLastPage = await dispatch(
				fetchProjects(page, PAGINATION_LIMIT, searchPhrase),
			);

			if (returnedLastPage !== undefined) {
				setLastPage(returnedLastPage);
			}
		};

		fetchProjectsWithLastPage();
	}, [dispatch, page, shouldSearch]);

	const startDelayedSearch = debounce(setShouldSearch, 2000);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<main className="flex-1 p-2 overflow-auto bg-gray-50">
			<div className="w-full">
				{/* Заголовок страницы */}
				<div className="flex items-center justify-between mb-4">
					<HeaderAllPage children={'Проекты'} />
					<Link to="/projects/create">
						<Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
							<Icon icon="solar:plus-circle-bold" className="w-5 h-5" />
							Добавить проект
						</Button>
					</Link>
				</div>

				{/* Карточка с контентом */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
					{/* Поиск */}
					<div className="mb-6">
						<Search onChange={onSearch} searchPhrase={searchPhrase} />
					</div>

					{/* Список проектов */}
					<div className="mb-8">
						<ProjectList projects={projects} />
					</div>

					{/* Пагинация */}
					<div className="flex justify-center">
						<Pagination setPage={setPage} page={page} lastPage={lastPage} />
					</div>
				</div>
			</div>
		</main>
	);
};
