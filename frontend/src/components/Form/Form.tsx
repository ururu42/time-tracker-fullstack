import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const Form = ({
	title = '',
	description = '',
	onTitleChange,
	onDescriptionChange,
	onSubmit,
	onCancel,
	titleLabel = 'Название проекта',
	descriptionLabel = 'Описание проекта',
	titlePlaceholder = 'Введите название проекта',
	descriptionPlaceholder = 'Введите описание проекта',
	isLoading = false,
	disabled = false,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (disabled || isLoading) return;
		onSubmit();
	};

	return (
		<div className="mb-4">
			<form onSubmit={handleSubmit}>
				<div>
					<p className="text-sm font-medium text-gray-700 mb-2">
						{titleLabel}{' '}
					</p>
					<Input
						placeholder={titlePlaceholder}
						value={title}
						onChange={({ target }) => onTitleChange(target.value)}
						disabled={disabled || isLoading}
					/>
					<p className="text-sm font-medium text-gray-700 mb-2">
						{descriptionLabel}{' '}
					</p>
					<textarea
						className={`w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all mb-3 ${
							disabled
								? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
								: 'bg-white border-gray-200 text-gray-700'
						}`}
						placeholder={descriptionPlaceholder}
						value={description}
						onChange={({ target }) => onDescriptionChange(target.value)}
						rows={4}
						disabled={disabled || isLoading}
					></textarea>
				</div>
				<div className="flex justify-center gap-6">
					<button
						type="submit"
						className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm
		${
			disabled || isLoading
				? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
				: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'
		}`}
						disabled={disabled || isLoading}
					>
						{isLoading ? 'Сохранение...' : 'Сохранить'}
					</button>

					<button
						type="button"
						className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200
		${
			disabled || isLoading
				? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
				: 'bg-red-100 text-red-700 hover:bg-red-200 hover:shadow-sm'
		}`}
						onClick={onCancel}
						disabled={disabled || isLoading}
					>
						Отменить
					</button>
				</div>
			</form>
		</div>
	);
};
