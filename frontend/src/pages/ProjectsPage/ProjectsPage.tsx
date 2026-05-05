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
		// Фон страницы делаем чуть серым, как в MainPage
		<main className="flex-1 p-6 overflow-auto bg-[#f9fafb]">
			<div className="max-w-6xl mx-auto">
				{/* Шапка страницы: выравниваем по высоте и стилю */}
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-green-800 rounded-lg shadow-sm">
							<Icon
								icon="solar:widget-2-bold"
								className="w-6 h-6 text-white"
							/>
						</div>
						<HeaderAllPage>Проекты</HeaderAllPage>
					</div>

					<Link to="/projects/create">
						<div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
							<Icon
								icon="solar:add-circle-bold"
								className="text-emerald-600 w-full h-full"
							/>
						</div>
					</Link>
				</div>

				{/* Основной контейнер-карточка */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
					{/* Поле поиска (делаем с отступами как в макете) */}
					<div className="p-6 border-b border-gray-50 bg-white">
						<div className="max-w-md">
							<Search onChange={onSearch} searchPhrase={searchPhrase} />
						</div>
					</div>

					{/* Список проектов */}
					<div className="p-6">
						{/* Внутри ProjectList убедись, что карточки проектов используют те же стили indigo-600 */}
						<ProjectList projects={projects} />
					</div>

					{/* Подвал с пагинацией */}
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
