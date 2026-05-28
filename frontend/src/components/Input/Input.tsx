export const Input = ({ className, disabled = false, ...props }) => {
	return (
		<input
			className={`w-full mb-4 border rounded-lg bg-white border-gray-200  pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all ${
				disabled
					? '!bg-gray-100 !border-gray-200 !text-gray-400 cursor-not-allowed'
					: 'text-gray-700'
			} ${className || ''}`}
			{...props}
		></input>
	);
};
