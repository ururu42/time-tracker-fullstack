import { Routes, Route } from 'react-router-dom';
import { LoginPage, Registration, ProjectsPage, SettingsPage } from './pages';
import { Header, PageLayout, Main } from './components';
import { AddProjectForm } from './pages/ProjectsPage/components/Header/AddProjectForm/AddProjectForm';

function App() {
	return (
		<PageLayout>
			<Header />
			<Main>
				<Routes>
					<Route path="/" element={<h1>Главная</h1>} />
					<Route path="/projects" element={<ProjectsPage />} />
					<Route path="/analytics" element={<h1>Аналитика</h1>} />
					<Route path="/register" element={<Registration />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/projects/create" element={<AddProjectForm />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Routes>
			</Main>
		</PageLayout>
	);
}

export default App;
