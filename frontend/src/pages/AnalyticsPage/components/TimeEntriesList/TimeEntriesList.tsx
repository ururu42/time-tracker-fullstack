import { useState } from 'react';
import { groupEntriesByProject } from '../../../../utils';
import { TimeEntriesTable } from './components/TimeEntriesTable/TimeEntriesTable';
import { COLORS } from '../../../../constants';
import { Icon } from '@iconify/react';

export const TimeEntriesList = ({ filteredEntriesList, selectedProject, projects }) => {
	const [collapsedIds, setCollapsedIds] = useState([]);

	if (!filteredEntriesList)
		return <div className="p-10 text-center text-gray-400 italic">Загрузка...</div>;

	const groppedEntriesByProject = groupEntriesByProject(filteredEntriesList);
	const projectTitleMap = projects.reduce((acc, p) => {
		acc[p.id] = p.title;
		return acc;
	}, {});

	const toggleProject = (id) => {
		setCollapsedIds((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	if (selectedProject) {
		const entries = groppedEntriesByProject[selectedProject] || [];
		return (
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				<div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
					<h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
						Результаты поиска: {projectTitleMap[selectedProject]}
					</h3>
				</div>
				<TimeEntriesTable entries={entries} accentColor="#6366f1" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{Object.entries(groppedEntriesByProject).map(
				([projectId, entries], index) => {
					const projectColor = COLORS[index % COLORS.length];
					const isCollapsed = collapsedIds.includes(projectId);

					return (
						<div
							key={projectId}
							className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
						>
							<div
								onClick={() => toggleProject(projectId)}
								className="flex items-center gap-3 px-5 py-2.5 text-white cursor-pointer select-none"
								style={{ backgroundColor: projectColor }}
							>
								<div
									className={`flex h-5 w-5 items-center justify-center rounded bg-white/20 transition-transform duration-200 ${
										isCollapsed ? '-rotate-90' : 'rotate-0'
									}`}
								>
									<Icon
										icon="tabler:chevron-down"
										className="w-3.5 h-3.5 text-white"
									/>
								</div>

								<div className="flex items-baseline gap-2">
									<span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
										Проект:
									</span>
									<h3 className="text-base font-semibold">
										{projectTitleMap[projectId] || 'Без названия'}
									</h3>
								</div>
							</div>

							{!isCollapsed && (
								<div className="w-full overflow-x-auto">
									<TimeEntriesTable
										entries={entries}
										accentColor={projectColor}
									/>
								</div>
							)}
						</div>
					);
				},
			)}
		</div>
	);
};
