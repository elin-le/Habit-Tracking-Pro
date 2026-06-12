export interface CheckInRecord {
  id: string; 
  habitId: string;
  checkedAt: string; 
  completionCount: number; 
  completionStatus: 'Not Started' | 'In Progress' | 'Completed'; 
}

const KEY = "app_checkins_v1";

const readAll = (): CheckInRecord[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CheckInRecord[];
  } catch (e) {
    console.error("Failed to read checkins", e);
    return [];
  }
};

const writeAll = (items: CheckInRecord[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to write checkins", e);
  }
};

const getForDate = (date: string) => {
  const all = readAll();
  return all.filter((r) => r.checkedAt === date);
};

const getForDateAndHabit = (date: string, habitId: string) => {
  const all = readAll();
  return all.find((r) => r.checkedAt === date && r.habitId === habitId) || null;
};

const upsert = (record: CheckInRecord) => {
  const all = readAll();
  const idx = all.findIndex((r) => r.checkedAt === record.checkedAt && r.habitId === record.habitId);
  if (idx >= 0) { // habit existed
    all[idx] = record;
  } else { // idx = -1 - not existed
    all.push(record);
  }
  writeAll(all);
  return record;
};

const remove = (date: string, habitId: string) => {
  const all = readAll().filter((r) => !(r.checkedAt === date && r.habitId === habitId));
  writeAll(all);
};

export default {
  readAll,
  writeAll,
  getForDate,
  getForDateAndHabit,
  upsert,
  remove,
};
