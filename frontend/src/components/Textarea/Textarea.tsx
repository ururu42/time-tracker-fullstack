export const Textarea = ({ className = '', placeholder, ...props }) => {
	return (
		<textarea
			{...props}
			className={`w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all ${className}`}
			placeholder={`${placeholder}`}
		></textarea>
	);
};
