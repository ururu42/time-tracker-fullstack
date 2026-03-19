export const Input = ({ className, ...props }) => {
	return (
		<input
			className={`w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${className || ''}`}
			{...props}
		></input>
	);
};
