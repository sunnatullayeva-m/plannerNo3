
import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext/TaskContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import './Project.css';

function Project() {
  const { tasks, setTasks, selectedDate } = useContext(TaskContext);
  const navigate = useNavigate();

  const currentTasks = tasks[selectedDate] || {
    list: [],
    board: [],
  };

  const handleEnter = () => {
    navigate('/time');
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = Array.from(
      currentTasks[source.droppableId] || []
    );

    const destList =
      source.droppableId === destination.droppableId
        ? sourceList
        : Array.from(
            currentTasks[destination.droppableId] || []
          );

    const [removed] = sourceList.splice(source.index, 1);

    const movedTask = {
      ...removed,
      assignedTime:
        destination.droppableId === 'board'
          ? removed.assignedTime || '08:00'
          : null,
    };

    if (source.droppableId === destination.droppableId) {
      sourceList.splice(destination.index, 0, movedTask);

      setTasks((prev) => ({
        ...prev,
        [selectedDate]: {
          ...currentTasks,
          [source.droppableId]: sourceList,
        },
      }));
    } else {
      destList.splice(destination.index, 0, movedTask);

      setTasks((prev) => ({
        ...prev,
        [selectedDate]: {
          ...currentTasks,
          [source.droppableId]: sourceList,
          [destination.droppableId]: destList,
        },
      }));
    }
  };

  const addTask = (col) => {
    const newTask = {
      id: `task-${Date.now()}`,
      value: '',
      isDone: false,
      time: null,
    };

    setTasks((prev) => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || {
          list: [],
          board: [],
        }),
        [col]: [
          ...((prev[selectedDate]?.[col]) || []),
          newTask,
        ],
      },
    }));
  };

  const updateTask = (id, col, field, value) => {
    setTasks((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [col]: prev[selectedDate][col].map((task) =>
          task.id === id
            ? { ...task, [field]: value }
            : task
        ),
      },
    }));
  };

  const deleteTask = (id, col) => {
    setTasks((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [col]: prev[selectedDate][col].filter(
          (task) => task.id !== id
        ),
      },
    }));
  };

  const renderTask = (task, col) => (
    <div
      className={`item-full ${
        task.isDone ? 'done' : ''
      }`}
    >
      <div className="drag-handle">⠿</div>

      <textarea
        className="main-textarea"
        value={task.value || ''}
        placeholder="Vazifa nomi"
        onChange={(e) =>
          updateTask(
            task.id,
            col,
            'value',
            e.target.value
          )
        }
      />

      <div className="task-actions">
        <button className='check-btn'
          onClick={() =>
            updateTask(
              task.id,
              col,
              'isDone',
              !task.isDone
            )
          }
        >
          ✓
        </button>

        <button className='delete-btn '
          onClick={() =>
            deleteTask(task.id, col)
          }
        >
          ✕
        </button>
      </div>
    </div>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="project-wrapper">

        <Droppable droppableId="list">
          {(provided) => (
            <div
              className="column"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3 className="Project">
                Project:
              </h3>

              {currentTasks.list.map(
                (task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {renderTask(
                          task,
                          'list'
                        )}
                      </div>
                    )}
                  </Draggable>
                )
              )}

              {provided.placeholder}

              <button
                className="add-btn"
                onClick={() =>
                  addTask('list')
                }
              >
                +(Project added)
              </button>
            </div>
          )}
        </Droppable>

        <Droppable droppableId="board">
          {(provided) => (
            <div
              className="column board"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3 className="Project">
                Plans for the day:
              </h3>

              {currentTasks.board.map(
                (task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {renderTask(
                          task,
                          'board'
                        )}
                      </div>
                    )}
                  </Draggable>
                )
              )}

              {provided.placeholder}

              <button
                className="add-btn"
                onClick={() =>
                  addTask('board')
                }
              >
                + (Project added)
              </button>
            </div>
          )}
        </Droppable>

      </div>

      <button
        className="enter"
        onClick={handleEnter}
      >
        Enter
      </button>
    </DragDropContext>
  );
}

export default Project;