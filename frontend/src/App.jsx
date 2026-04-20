import { Routes, Route } from 'react-router-dom';
import {
	AnalyticsPage,
	LoginPage,
	Registration,
	ProjectsPage,
	SettingsPage,
	MainPage,
	EditProject,
} from './pages';
import { Header, PageLayout, Main } from './components';
import { AddProjectForm } from './pages/ProjectsPage/components/AddProjectForm/AddProjectForm';
import { EditCurrentTask } from './pages/ProjectsPage/components/Project/components/Tasks/components/TasksList/components/EditCurrentTask/EditCurrentTask';
import { Project } from './pages/ProjectsPage/components';

function App() {
	return (
		<PageLayout>
			<Header />
			<Main>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/projects" element={<ProjectsPage />} />
					<Route path="/projects/:id" element={<Project />} />
					<Route path="/projects/:id/edit" element={<EditProject />} />
					<Route path="/projects/:id/editTask" element={<EditCurrentTask />} />
					<Route path="/projects/create" element={<AddProjectForm />} />
					<Route path="/analytics" element={<AnalyticsPage />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Routes>
			</Main>
		</PageLayout>
	);
}

export default App;
