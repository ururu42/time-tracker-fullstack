import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../selectors';
import { fetchProjects } from '../../action';
import { Pagination, ProjectList } from './components';
import { Search } from './components/Search/Search';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import { Button } from '../../components';
import { Link } from 'react-router-dom';

export const ProjectsPage = () => {
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

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
		<div>
			<div className="max-w-6xl mx-auto">
				<div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white rounded-t-2xl">
					<h1 className="text-4xl font-bold">Проекты</h1>
					<p className="opacity-90 mt-2">Управление вашими проектами</p>
				</div>

				<div className="p-8 bg-white rounded-b-2xl shadow-md">
					<Link to="/projects/create">
						<Button className="bg-green-600 hover:bg-green-700 mb-6">
							{' '}
							+ Добавить проект
						</Button>
					</Link>
					<div className="mb-8">
						<Search onChange={onSearch} searchPhrase={searchPhrase} />
					</div>

					<div className="mb-8">
						<ProjectList projects={projects} />
					</div>

					<div className="flex justify-center">
						<Pagination setPage={setPage} page={page} lastPage={lastPage} />
					</div>
				</div>
			</div>
		</div>
	);
};
