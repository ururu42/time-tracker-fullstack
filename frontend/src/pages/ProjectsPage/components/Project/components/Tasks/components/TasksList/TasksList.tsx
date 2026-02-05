export const TasksList = ({ project }) => {
	return (
		<div>
			{project.tasks && project.tasks.length > 0 ? (
				<div className="space-y-4">
					{project.tasks.map((task) => (
						<div
							key={task._id}
							className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="flex justify-between items-start">
								<div className="flex-1">
									<h3 className="font-semibold text-lg text-gray-800 mb-2">
										{task.title}
									</h3>
									{task.description && (
										<p className="text-gray-600 mb-3">
											{task.description}
										</p>
									)}

									<div className="flex flex-wrap gap-2 text-sm">
										{task.status && (
											<span
												className={`px-3 py-1 rounded-full ${
													task.status === 'completed'
														? 'bg-green-100 text-green-800'
														: task.status === 'in-progress'
															? 'bg-blue-100 text-blue-800'
															: 'bg-yellow-100 text-yellow-800'
												}`}
											>
												{task.status === 'completed'
													? 'Завершена'
													: task.status === 'in-progress'
														? 'В процессе'
														: 'Новая'}
											</span>
										)}

										{task.priority && (
											<span
												className={`px-3 py-1 rounded-full ${
													task.priority === 'high'
														? 'bg-red-100 text-red-800'
														: task.priority === 'medium'
															? 'bg-yellow-100 text-yellow-800'
															: 'bg-green-100 text-green-800'
												}`}
											>
												{task.priority === 'high'
													? 'Высокий'
													: task.priority === 'medium'
														? 'Средний'
														: 'Низкий'}
											</span>
										)}
									</div>
								</div>

								<div className="ml-4 text-right text-sm text-gray-500">
									{task.createdAt && (
										<div>
											Создано:{' '}
											{new Date(
												task.createdAt,
											).toLocaleDateString()}
										</div>
									)}
									{task.updatedAt && (
										<div>
											Обновлено:{' '}
											{new Date(
												task.updatedAt,
											).toLocaleDateString()}
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="p-12 text-center bg-gray-50 rounded-lg border border-gray-200">
					<p className="text-gray-500 mb-3">В этом проекте пока нет задач</p>
				</div>
			)}
		</div>
	);
};
