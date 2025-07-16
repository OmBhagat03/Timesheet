export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface Timesheet {
  week: number;
  startDate: string;
  endDate: string;
  status: 'COMPLETED' | 'INCOMPLETE' | 'MISSING';
}

export interface Task {
  id: number;
  project: string;
  type: string;
  description: string;
  hours: number;
}

export interface Entry {
  week: number;
  date: string;
  tasks: Task[];
}
