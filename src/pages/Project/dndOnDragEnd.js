import http from "../../utils/axios"

const onDragEnd = async (result, dispatchColumnData, columnData, projectId) => {
  const { source, destination, type } = result
  if (!destination) return
  const columnDataBackup = [...columnData]

  if (type === 'column') {
    // Reorder columns

    if (source.index === destination.index) return

    const newColumnOrder = [...columnData]
    const movedColumn = newColumnOrder.splice(source.index, 1)[0]
    newColumnOrder.splice(destination.index, 0, movedColumn)

    dispatchColumnData(newColumnOrder)

    const updateResponse = await http(`/projects/${projectId}`, {
      method: 'PATCH',
      data: {
        columns: newColumnOrder.map((column) => column.id),
      },
    })
    updateResponse.status !== 204 && dispatchColumnData(columnDataBackup)
  } else if (source.droppableId === destination.droppableId) {
    // Reorder tasks within the same

    if (source.index === destination.index) return

    const newColumnData = JSON.parse(JSON.stringify(columnData))
    const column = newColumnData.find(
      (column) => column.id === source.droppableId
    )
    const newTasks = [...column.tasks]
    const [movedTask] = newTasks.splice(source.index, 1)
    newTasks.splice(destination.index, 0, movedTask)
    column.tasks = newTasks

    const updateTasksOrderRes = await http(`/columns/${source.droppableId}`, {
      method: 'PATCH',
      data: {
        tasks: newTasks.map((task) => task.id),
      },
    })
    dispatchColumnData(newColumnData)

    updateTasksOrderRes.status !== 204 && dispatchColumnData(columnDataBackup)
  } else {
    // Move tasks from one column to another
    const newColumnData = JSON.parse(JSON.stringify(columnData))
    const sourceColumnIndex = newColumnData.findIndex(
      (column) => column.id === source.droppableId
    )
    const destinationColumnIndex = newColumnData.findIndex(
      (column) => column.id === destination.droppableId
    )

    const task = newColumnData[sourceColumnIndex].tasks.splice(
      source.index,
      1
    )[0]
    newColumnData[destinationColumnIndex].tasks.splice(
      destination.index,
      0,
      task
    )

    dispatchColumnData(newColumnData)

    const updateSourceTasksOrderRes = await http(
      `/columns/${source.droppableId}`,
      {
        method: 'PATCH',
        data: {
          tasks: newColumnData[sourceColumnIndex].tasks.map(
            (task) => task.id
          ),
        },
      }
    )
    if (updateSourceTasksOrderRes.status !== 204) {
      dispatchColumnData(columnDataBackup)
      return
    }
    const updateDestinationTasksOrderRes = await http(
      `/columns/${destination.droppableId}`,
      {
        method: 'PATCH',
        data: {
          tasks: newColumnData[destinationColumnIndex].tasks.map(
            (task) => task.id
          ),
        },
      }
    )
    if (updateDestinationTasksOrderRes.status !== 204) {
      dispatchColumnData(columnDataBackup)
      return
    }
  }
}

export default onDragEnd