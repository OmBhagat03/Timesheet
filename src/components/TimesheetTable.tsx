import React from 'react';
import StatusBadge from './StatusBadge';
import { Timesheet } from '../types';

interface Props {
  timesheets: Timesheet[];
  onActionClick: (week: number, status: string) => void;
}

const TimesheetTable: React.FC<Props> = ({ timesheets, onActionClick }) => {
  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="p-2 border">Week #</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {timesheets.map((sheet) => (
          <tr key={sheet.week} className="text-center">
            <td className="p-2 border">{sheet.week}</td>
            <td className="p-2 border">{sheet.startDate} - {sheet.endDate}</td>
            <td className="p-2 border"><StatusBadge status={sheet.status} /></td>
            <td className="p-2 border text-blue-600 cursor-pointer" onClick={() => onActionClick(sheet.week, sheet.status)}>
              {sheet.status === 'MISSING' ? 'Create' : sheet.status === 'INCOMPLETE' ? 'Update' : 'View'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimesheetTable;
