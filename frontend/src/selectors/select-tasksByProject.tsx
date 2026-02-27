// frontend/src/selectors/select-tasksByProject.tsx
import { createSelector } from 'reselect';

// Селектор для получения всех задач (возвращаем сам объект tasks)
const selectAllTasks = (state) => state.tasks;

// Селектор для получения projectId
const selectProjectId = (state, projectId) => projectId;

// Мемоизированный селектор
export const selectTasksByProject = createSelector(
  [selectAllTasks, selectProjectId],
  (tasks, projectId) => {
    console.log('Selecting tasks for project ID:', projectId);
    console.log('Tasks byId:', tasks.byId);
    console.log('Tasks allIds:', tasks.allIds);
    
    const result = tasks.allIds
      .map((id) => tasks.byId[id])
      .filter((task) => {
        const match = task && task.projectId === projectId;
        console.log(
          `Task ${task?.id} matches project ${projectId}:`,
          match,
        );
        return match;
      });
    
    console.log('Filtered tasks result:', result);
    return result;
  }
);
