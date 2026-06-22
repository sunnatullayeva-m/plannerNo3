import React, { useState, useContext } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  startOfYear,
} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../TaskContext/TaskContext';
import './Table.css';

function Table() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { tasks, setSelectedDate } = useContext(TaskContext);
  const navigate = useNavigate();

  const yearStart = startOfYear(new Date());
  const months = Array.from({ length: 12 }).map((_, i) =>
    addMonths(yearStart, i)
  );

  const start = startOfMonth(selectedMonth);
  const end = endOfMonth(selectedMonth);
  const days = eachDayOfInterval({ start, end });
  const prefixDays = getDay(start);

  const handleDateClick = (day) => {
    setSelectedDate(day.toDateString());
    navigate('/project');
  };

  return (
    <div className="table-wrapper">

      <div className="months">
        {months.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedMonth(m)}
            className={
              format(m, 'M') === format(selectedMonth, 'M')
                ? 'btn-month active'
                : 'btn-month'
            }
          >
            {format(m, 'MMM')}
          </button>
        ))}
      </div>

      <div className="calendar">
        <div className="header">
          {format(selectedMonth, 'MMMM yyyy')}
        </div>

        <div className="grid">
          {['Yak', 'Du', 'Se', 'Chor', 'Pay', 'Ju', 'Shan'].map(d => (
            <div key={d} className="dayname">{d}</div>
          ))}

          {Array.from({ length: prefixDays }).map((_, i) => (
            <div key={i} />
          ))}

          {days.map((day, i) => {
            const key = day.toDateString();
            const dayTasks = tasks[key];

            const hasTasks =
              dayTasks &&
              (
                (dayTasks.list?.some(task => task.value?.trim())) ||
                (dayTasks.board?.some(task => task.value?.trim()))
              );

            return (
              <button
                key={i}
                className={`cell ${hasTasks ? 'has-tasks' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default Table;