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
import { Header, PageLayout, PrivateRoute } from './components';
import { AddProjectForm } from './pages/ProjectsPage/components/AddProjectForm/AddProjectForm';
import { EditCurrentTask } from './pages/ProjectsPage/components/Project/components/Tasks/components/TasksList/components/EditCurrentTask/EditCurrentTask';
import { Project } from './pages/ProjectsPage/components';

function App() {
	return (
		<PageLayout>
			<Header />
			<main className="flex-1 lg:ml-64 p-6 min-h-screen bg-gray-50 transition-all duration-300">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<Registration />} />

					<Route
						path="/"
						element={
							<PrivateRoute>
								<MainPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/projects"
						element={
							<PrivateRoute>
								<ProjectsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/projects/:id"
						element={
							<PrivateRoute>
								<Project />
							</PrivateRoute>
						}
					/>
					<Route
						path="/projects/:id/edit"
						element={
							<PrivateRoute>
								<EditProject />
							</PrivateRoute>
						}
					/>
					<Route
						path="/projects/:id/editTask"
						element={
							<PrivateRoute>
								<EditCurrentTask />
							</PrivateRoute>
						}
					/>
					<Route
						path="/projects/create"
						element={
							<PrivateRoute>
								<AddProjectForm />
							</PrivateRoute>
						}
					/>
					<Route
						path="/analytics"
						element={
							<PrivateRoute>
								<AnalyticsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/settings"
						element={
							<PrivateRoute>
								<SettingsPage />
							</PrivateRoute>
						}
					/>
				</Routes>
			</main>
		</PageLayout>
	);
}

export default App;
