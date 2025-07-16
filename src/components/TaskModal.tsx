// src/components/TaskModal.tsx
import React, { useState } from 'react';
import { Task } from '../types';

interface Props {
  date: string;
  closeModal: () => void;
  onSubmit: (task: Task) => void;
}

const TaskModal: React.FC<Props> = ({ date, closeModal, onSubmit }) => {
  const [project, setProject] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(1);

  const handleSubmit = () => {
    const newTask: Task = {
      id: Date.now(),
      project,
      type,
      description,
      hours,
    };
    onSubmit(newTask);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>

        <div className="space-y-3">
          <input value={project} onChange={(e) => setProject(e.target.value)} placeholder="Project Name" className="w-full border p-2 rounded" />
          <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type of Work" className="w-full border p-2 rounded" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" />
          <input type="number" value={hours} onChange={(e) => setHours(+e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
