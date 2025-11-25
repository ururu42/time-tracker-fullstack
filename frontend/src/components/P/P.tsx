export const P = ({ children, className = "", ...props }) => {
    return (
        <p className={`text-base text-gray-700 mb-2 ${className}`}>{children}</p>
    )
}
