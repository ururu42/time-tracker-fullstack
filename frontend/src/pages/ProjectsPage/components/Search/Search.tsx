import { Input } from '../../../../components';

export const Search = ({ onChange, searchPhrase }) => {
	return (
		<div>
			<Input
				className=""
				value={searchPhrase}
				placeholder="Поиск по заголовкам"
				onChange={onChange}
			/>
		</div>
	);
};
