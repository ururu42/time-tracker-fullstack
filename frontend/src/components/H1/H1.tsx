export const H1 = ({ className = '', children, ...props }) => {
	return (
		<h1 {...props} className={`text-center mb-6 text-2xl font-semibold text-gray-700 ${className} || ""`}>
			{children}
		</h1>
	);
};
