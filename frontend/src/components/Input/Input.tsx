export const Input = ({ className, ...props }) => {
	return (
		<input
			className={`w-full h-10 mb-2.5 border border-gray-400 rounded p-4 ${className || ''}`}
			{...props}
		></input>
	);
};
