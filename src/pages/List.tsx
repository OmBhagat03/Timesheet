// src/pages/List.tsx
import React, { useEffect, useState } from 'react';
import { fetchEntriesByWeek, saveEntries } from '../api/api';
import { Entry, Task } from '../types';
import TaskModal from '../components/TaskModal';
import Header from '../components/Header';
import Footer from '../components/Footer';

const getWeekDates = (start: string): string[] => {
  const dates = [];
  const date = new Date(start);
  for (let i = 0; i < 6; i++) {
    const day = new Date(date);
    day.setDate(date.getDate() + i);
    dates.push(day.toISOString().split('T')[0]);
  }
  return dates;
};

const weekMap: Record<number, { start: string; end: string }> = {
  1: { start: '2024-01-01', end: '2024-01-05' },
  2: { start: '2024-01-08', end: '2024-01-12' },
  3: { start: '2024-01-15', end: '2024-01-19' },
  4: { start: '2024-01-21', end: '2024-01-26' },
  5: { start: '2024-01-28', end: '2024-02-01' }
};

const List = () => {
  const [week, setWeek] = useState(4);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [weekHours, setWeekHours] = useState(0);

  useEffect(() => {
    fetchEntriesByWeek(week).then((res) => {
      setEntries(res);
      const total = res.flatMap((e) => e.tasks).reduce((sum, t) => sum + t.hours, 0);
      setWeekHours(total);
    });
  }, [week]);

  const handleAddTask = (date: string) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleTaskSubmit = async (task: Task) => {
    const updated = [...entries];
    const index = updated.findIndex(e => e.date === selectedDate);
    if (index !== -1) {
      updated[index].tasks.push(task);
    } else {
      updated.push({ week, date: selectedDate!, tasks: [task] });
    }
    await saveEntries(week, updated);
    setEntries(updated);
    setWeekHours(updated.flatMap((e) => e.tasks).reduce((sum, t) => sum + t.hours, 0));
  };

  const groupedEntries = entries.reduce((acc, entry) => {
    acc[entry.date] = entry.tasks;
    return acc;
  }, {} as Record<string, Task[]>);

  const weekDates = getWeekDates(weekMap[week].start);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="p-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setWeek((w) => Math.max(1, w - 1))}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            ← Previous Week
          </button>
          <div>
            <h1 className="text-xl font-bold">Timesheet Week {week}</h1>
            <p className="text-gray-600">{weekMap[week].start} - {weekMap[week].end}</p>
          </div>
          <button
            onClick={() => setWeek((w) => Math.min(5, w + 1))}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next Week →
          </button>
        </div>

        {/* Weekly progress */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-orange-400 h-2.5 rounded-full"
            style={{ width: `${(weekHours / 168) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{weekHours}/168 hrs</p>

        {/* Render all days of the selected week */}
        {weekDates.map((date) => (
          <div key={date} className="mb-6">
            <h2 className="font-semibold text-gray-800 mb-2">
              {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
            </h2>

            {(groupedEntries[date] || []).map((task) => (
              <div key={task.id} className="flex justify-between bg-white p-4 mb-2 rounded shadow-sm">
                <div>{task.description}</div>
                <div className="flex gap-3">
                  <span>{task.hours} hrs</span>
                  <span className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded">{task.project}</span>
                </div>
              </div>
            ))}

            <button
              onClick={() => handleAddTask(date)}
              className="w-full text-blue-600 text-center py-2 bg-blue-50 rounded hover:bg-blue-100 transition"
            >
              + Add new task
            </button>
          </div>
        ))}
      </div>

      <Footer />

      {modalOpen && selectedDate && (
        <TaskModal
          date={selectedDate}
          closeModal={() => setModalOpen(false)}
          onSubmit={handleTaskSubmit}
        />
      )}
    </div>
  );
};

export default List;
