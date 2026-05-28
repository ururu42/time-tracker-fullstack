export const Button = ({ disabled, className = '', children, ...props }) => {
	return (
		<button
			{...props}
			disabled={disabled}
			className={`px-4 py-2 rounded-lg bg-blue-500 text-white 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 cursor-pointer'}
        ${className}`}
		>
			{children}
		</button>
	);
};
