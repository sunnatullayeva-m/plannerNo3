
import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../TaskContext/TaskContext';
import './Time.css';

function Time() {
  const { tasks, setTasks, selectedDate } = useContext(TaskContext);
  const currentTasks = tasks[selectedDate] || { list: [], board: [] };

  const [hours, setHours] = useState(['08:', '09:', '10:', '11:', '12:', '13:', '14:', '15:', '16:', '17:', '18:', '19:', '20:', '21:', '22:', '23:', '00:', '01:', '02:', '03:', '04:', '05:', '06:', '07:']);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:` + `${String(now.getMinutes()).padStart(2, '0')}`;
      currentTasks.board.forEach((task) => {
        if (task.time === currentTime && Notification.permission === 'granted') {
          new Notification('Era Planner', { body: task.value });
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [currentTasks.board]);

  const onDragStart = (e, index, type) => {
    e.dataTransfer.setData('index', index);
    e.dataTransfer.setData('type', type);
  };

  const handleDrop = (e, targetIndex, type) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('index'));
    const sourceType = e.dataTransfer.getData('type');

    if (sourceType === 'task' && type === 'task') {
      const newBoard = [...currentTasks.board];
      const draggedItem = newBoard[sourceIndex];
      newBoard.splice(sourceIndex, 1);
      newBoard.splice(targetIndex, 0, draggedItem);
      
      setTasks((prev) => ({
        ...prev,
        [selectedDate]: { ...prev[selectedDate], board: newBoard },
      }));
    }
  };

  const toggleTaskDone = (taskId) => {
    setTasks((prev) => {
      const dateData = prev[selectedDate] || { list: [], board: [] };
      const updatedBoard = dateData.board.map((t) =>
        t.id === taskId ? { ...t, isDone: !t.isDone } : t
      );
      return { ...prev, [selectedDate]: { ...dateData, board: updatedBoard } };
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => {
      const dateData = prev[selectedDate] || { list: [], board: [] };
      const filteredBoard = dateData.board.filter((t) => t.id !== taskId);
      return { ...prev, [selectedDate]: { ...dateData, board: filteredBoard } };
    });
  };

  return (
    <div className="time-wrapper">
      <div className="left-div">
        <div className="time-left">
          <h3>Time</h3>
          {hours.map((hour, index) => (
            <div key={index} className="hour-box">
              <span>{hour}</span>
              <select onMouseDown={(e) => e.stopPropagation()}>
                {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="time-right">
        <h3>Today's Tasks</h3>
        {currentTasks.board.map((task, index) => (
          <div
            key={task.id}
            className={`task-box ${task.isDone ? 'done' : ''}`}
            draggable={true}
            onDragStart={(e) => onDragStart(e, index, 'task')}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index, 'task')}
          >
            <span className="drag-handle">⋮⋮</span>

            <input type="text" value={task.value} readOnly className="task-input" />

            <div className="task-actions">
              <button className="check-btn" onClick={(e) => { e.stopPropagation(); toggleTaskDone(task.id); }}>✓</button>
              <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}>✕</button>
            </div>

            {task.time && <span style={{ marginLeft: '10px', fontSize: '12px' }}>{task.time}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Time;