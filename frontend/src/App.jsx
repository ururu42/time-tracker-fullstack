import { Routes, Route } from 'react-router-dom';
import { LoginPage, Registration } from './pages';
import { Header, PageLayout, Main } from './components';

function App() {
	return (
		<PageLayout>
			<Header />
			<Main>
				<Routes>
					<Route path="/" element={<h1>Главная</h1>} />
					<Route path="/projects" element={<h1>Проекты</h1>} />
					<Route path="/analytics" element={<h1>Аналитика</h1>} />
					<Route path="/register" element={<Registration />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</Main>
		</PageLayout>
	);
}

export default App;
