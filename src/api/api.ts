import users from '../data/users.json';
import rawTimesheets from '../data/timesheets.json';
import initialEntries from '../data/entries.json';
import { Timesheet, Entry, User } from '../types';

// Simulate in-memory entries since we can't write to files in frontend
let entries: Entry[] = [...initialEntries];

// Login with dummy user
export const login = async (email: string, password: string): Promise<User | null> => {
  const user = users.find((u) => u.email === email && u.password === password);
  return user ? { ...user } : null;
};

// Fetch timesheets and cast status properly
export const fetchTimesheets = async (): Promise<Timesheet[]> => {
  return rawTimesheets.map((ts) => ({
    ...ts,
    status: ts.status as 'COMPLETED' | 'INCOMPLETE' | 'MISSING',
  }));
};

// Get entries for a specific week
export const fetchEntriesByWeek = async (week: number): Promise<Entry[]> => {
  return entries.filter((e) => e.week === week);
};

// Add a task entry
export const addEntry = async (newEntry: Entry): Promise<{ success: boolean }> => {
  const existing = entries.find((e) => e.week === newEntry.week && e.date === newEntry.date);

  if (existing) {
    // Append tasks if entry for date already exists
    existing.tasks.push(...newEntry.tasks);
  } else {
    // Create new entry for date
    entries.push(newEntry);
  }

  return { success: true };
};

// Delete a task from an entry
export const deleteEntry = async (week: number, taskId: number): Promise<{ success: boolean }> => {
  const entry = entries.find((e) => e.week === week);
  if (!entry) return { success: false };

  entry.tasks = entry.tasks.filter((task) => task.id !== taskId);
  return { success: true };
};

// Optional: Replace all entries for a specific week (used for overwrite/save)
export const saveEntries = async (week: number, updated: Entry[]): Promise<{ success: boolean }> => {
  entries = [...entries.filter((e) => e.week !== week), ...updated];
  return { success: true };
};

