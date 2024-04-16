import { createSlice } from '@reduxjs/toolkit'

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    columnData: [],
    projects: {},
  },
  reducers: {
    // Project
    updateProject(state, action) {
      state.projects = action.payload
    },
    updateProjectTitle(state, action) {
      state.projects[action.payload.projectId].name = action.payload.update
    },
    updateProjectDesc(state, action) {
      state.projects[action.payload.projectId].profile = action.payload.update
    },

    // DND
    updateColumnData(state, action) {
      state.columnData = action.payload
    },

    // Column
    deleteColumn(state, action) {
      state.columnData = state.columnData.filter(
        (column) => column.id !== action.payload
      )
    },
    createColumn(state, action) {
      state.columnData.push(action.payload)
    },
    updateColumnTitle(state, action) {
      state.columnData = state.columnData.map((column) =>
        column.id === action.payload.id
          ? { ...column, name: action.payload.name }
          : column
      )
    },
    createTask(state, action) {
      const { columnId, newTask } = action.payload
      state.columnData = state.columnData.map((updateColumnData) => {
        if (updateColumnData.id === columnId) {
          return {
            ...updateColumnData,
            tasks: [...updateColumnData.tasks, newTask],
          }
        } else {
          return updateColumnData
        }
      })
    },
  },
})

export const {
  updateColumnData,
  deleteColumn,
  createColumn,
  updateColumnTitle,
  updateProjectData,
  updateProjectTitle,
  createTask,
} = projectSlice.actions

const projectReducer = projectSlice.reducer

export default projectReducer
