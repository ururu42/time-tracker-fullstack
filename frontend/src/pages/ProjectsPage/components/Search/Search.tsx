import { Input } from '../../../../components';
import { Icon } from '@iconify/react';

export const Search = ({ onChange, searchPhrase }) => {
	return (
		<div className="relative">
			<Input
				className="pl-10 pr-4 py-2.5"
				value={searchPhrase}
				placeholder="Поиск по заголовкам"
				onChange={onChange}
			/>
			<Icon
				icon="solar:magnifier-linear"
				className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
			/>
		</div>
	);
};
