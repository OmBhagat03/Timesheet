import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTimesheets } from '../api/api';
import { Timesheet } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchTimesheets().then(setTimesheets);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow px-8 py-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Timesheets</h1>
        <table className="min-w-full border bg-white rounded-md shadow-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Week #</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((sheet) => (
              <tr key={sheet.week} className="border-t text-sm text-gray-700">
                <td className="p-3">{sheet.week}</td>
                <td className="p-3">{sheet.startDate} - {sheet.endDate}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sheet.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                    sheet.status === 'INCOMPLETE' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-pink-100 text-pink-700'
                  }`}>
                    {sheet.status}
                  </span>
                </td>
                <td className="p-3 text-blue-600 hover:underline cursor-pointer">
                  {sheet.status === 'MISSING' ? 'Create' : sheet.status === 'INCOMPLETE' ? 'Update' : 'View'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

