
import React, {
  createContext,
  useState,
  useEffect,
} from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({
  children,
}) => {

  const [selectedDate, setSelectedDate] =
    useState(() => {
      return (
        localStorage.getItem(
          'selectedDate'
        ) || null
      );
    });

  const [tasks, setTasks] = useState(() => {
    const saved =
      localStorage.getItem('myTasks');

    return saved
      ? JSON.parse(saved)
      : {};
  });

  useEffect(() => {
    localStorage.setItem(
      'myTasks',
      JSON.stringify(tasks)
    );
  }, [tasks]);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem(
        'selectedDate',
        selectedDate
      );
    }
  }, [selectedDate]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};