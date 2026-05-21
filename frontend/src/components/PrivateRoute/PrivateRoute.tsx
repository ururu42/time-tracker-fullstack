import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../selectors';

export const PrivateRoute = ({ children }) => {
	const user = useSelector(selectUser);

	return user?.id ? children : <Navigate to="/login" replace />;
};
