import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../selectors';
import { fetchProjects } from '../../action';
import { Pagination, Header, ProjectList } from './components';
import { Search } from './components/Search/Search';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';

export const ProjectsPage = () => {
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		const fetchProjectsWithLastPage = async () => {
			const returnedLastPage = await dispatch(
				fetchProjects(page, PAGINATION_LIMIT, searchPhrase) as any,
			); // Временное решение для типизации

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
			<Header />
			<Search onChange={onSearch} searchPhrase={searchPhrase} />
			<ProjectList projects={projects} />
			<Pagination setPage={setPage} page={page} lastPage={lastPage} />
		</div>
	);
};
