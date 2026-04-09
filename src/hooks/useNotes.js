import { useState, useCallback } from 'react';

const STORAGE_KEY = 'wall_calendar_notes';

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // storage unavailable
  }
}

export function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function monthKey(year, month) {
  return `month__${year}_${month}`;
}

export function rangeKey(start, end) {
  return `range__${dateKey(start.year, start.month, start.day)}__${dateKey(end.year, end.month, end.day)}`;
}

export function useNotes() {
  const [notes, setNotes] = useState(loadNotes);

  const addNote = useCallback((key, text) => {
    setNotes(prev => {
      const updated = { ...prev, [key]: { text, createdAt: Date.now() } };
      saveNotes(updated);
      return updated;
    });
  }, []);

  const deleteNote = useCallback((key) => {
    setNotes(prev => {
      const updated = { ...prev };
      delete updated[key];
      saveNotes(updated);
      return updated;
    });
  }, []);

  const getNotesForMonth = useCallback((year, month) => {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    const mk = monthKey(year, month);
    const result = [];

    // Month-level note
    if (notes[mk]) {
      result.push({ key: mk, label: 'General month note', ...notes[mk] });
    }

    // Day notes
    for (const [key, val] of Object.entries(notes)) {
      if (key.startsWith(prefix) && !key.startsWith('month__')) {
        result.push({ key, label: key, ...val });
      }
    }

    // Range notes that start in this month
    for (const [key, val] of Object.entries(notes)) {
      if (key.startsWith('range__') && key.includes(`${prefix}`)) {
        const parts = key.replace('range__', '').split('__');
        result.push({ key, label: `${parts[0]} → ${parts[1]}`, ...val });
      }
    }

    return result;
  }, [notes]);

  const hasDayNote = useCallback((year, month, day) => {
    const k = dateKey(year, month, day);
    return !!notes[k];
  }, [notes]);

  return { notes, addNote, deleteNote, getNotesForMonth, hasDayNote };
}
