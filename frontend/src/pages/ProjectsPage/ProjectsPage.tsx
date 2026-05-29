import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsLoading, selectProjects, selectUser } from '../../selectors';
import { fetchProjects, ACTION_TYPE } from '../../action';
import { Pagination, ProjectList } from './components';
import { Search } from './components/Search/Search';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import { HeaderAllPage, Loader } from '../../components';
import { AddProjectForm } from './components/AddProjectForm/AddProjectForm';
import { Icon } from '@iconify/react';

export const ProjectsPage = () => {
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const isLoading = useSelector(selectIsLoading);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [isAddProject, setIsAddProject] = useState(false);

	useEffect(() => {
		dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

		const fetchProjectsWithLastPage = async () => {
			try {
				const returnedLastPage = await dispatch(
					fetchProjects(page, PAGINATION_LIMIT, searchPhrase),
				);
				if (returnedLastPage !== undefined) {
					setLastPage(returnedLastPage);
				}
			} catch (error) {
				console.error('Ошибка при загрузке проектов:', error);
			} finally {
				dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
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
		<main className="flex-1  overflow-auto bg-[#f9fafb]">
			{isLoading && <Loader />}
			<div className="max-w-6xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-green-800 rounded-lg shadow-sm mb-4">
							<Icon
								icon="solar:widget-2-bold"
								className="w-6 h-6 text-white"
							/>
						</div>
						<HeaderAllPage>Проекты</HeaderAllPage>
					</div>

					<button
						className="flex items-center h-8 px-3 bg-white rounded-full hover:bg-green-50 transition-colors"
						onClick={() => setIsAddProject(!isAddProject)}
					>
						<Icon
							icon="solar:add-circle-bold"
							className="text-emerald-600 w-5 h-5 mr-1.5"
						/>
						<span className="text-sm font-medium text-gray-700 whitespace-nowrap">
							Новый проект
						</span>
					</button>
				</div>

				{isAddProject && (
					<div className="mb-6 animate-in fade-in duration-300">
						<AddProjectForm
							setIsAddProject={setIsAddProject}
							isAddProject={isAddProject}
						/>
					</div>
				)}

				<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
					<div className="p-6 border-b border-gray-50 bg-white">
						<div className="max-w-md">
							<Search onChange={onSearch} searchPhrase={searchPhrase} />
						</div>
					</div>
					<div className="p-6">
						<ProjectList projects={projects} />
					</div>
					{lastPage > 1 && (
						<div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex justify-center">
							<Pagination
								setPage={setPage}
								page={page}
								lastPage={lastPage}
							/>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};
