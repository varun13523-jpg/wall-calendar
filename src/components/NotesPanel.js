import React, { useState } from 'react';
import './NotesPanel.css';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export default function NotesPanel({
  rangeStart,
  rangeEnd,
  currentYear,
  currentMonth,
  notes,
  onAddNote,
  onDeleteNote,
  monthKey,
  rangeKey,
  dateKey,
}) {
  const [inputText, setInputText] = useState('');

  const handleSave = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    let key;
    if (rangeStart && rangeEnd) {
      key = rangeKey(rangeStart, rangeEnd);
    } else if (rangeStart) {
      key = dateKey(rangeStart.year, rangeStart.month, rangeStart.day);
    } else {
      key = monthKey(currentYear, currentMonth);
    }

    onAddNote(key, trimmed);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  // Build saved notes list for current month
  const currentPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const mk = monthKey(currentYear, currentMonth);
  const noteItems = [];

  if (notes[mk]) {
    noteItems.push({
      key: mk,
      label: `${MONTHS[currentMonth]} ${currentYear}`,
      labelType: 'month',
      ...notes[mk],
    });
  }

  for (const [key, val] of Object.entries(notes)) {
    if (key.startsWith(currentPrefix) && !key.startsWith('month__')) {
      noteItems.push({ key, label: key, labelType: 'day', ...val });
    }
  }

  for (const [key, val] of Object.entries(notes)) {
    if (key.startsWith('range__') && key.includes(currentPrefix)) {
      const inner = key.replace('range__', '');
      const parts = inner.split('__');
      noteItems.push({
        key,
        label: `${parts[0]} → ${parts[1]}`,
        labelType: 'range',
        ...val,
      });
    }
  }

  // Header text
  let headerText = `${MONTHS[currentMonth]} notes`;
  let subText = 'General memo for this month';

  if (rangeStart && rangeEnd) {
    headerText = 'Range note';
    subText = `${rangeStart.day}/${rangeStart.month + 1} → ${rangeEnd.day}/${rangeEnd.month + 1}`;
  } else if (rangeStart) {
    headerText = 'Day note';
    subText = `${rangeStart.day} ${MONTHS[rangeStart.month]}`;
  }

  return (
    <div className="notes-panel">
      <div className="notes-header">
        <div className="notes-title">{headerText}</div>
        <div className="notes-sub">{subText}</div>
      </div>

      <div className="notes-input-wrap">
        <textarea
          className="notes-textarea"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a note... (Ctrl+Enter to save)"
          rows={4}
          aria-label="Note text"
        />
        <button
          className="notes-save-btn"
          onClick={handleSave}
          disabled={!inputText.trim()}
        >
          Save note
        </button>
      </div>

      {noteItems.length > 0 && (
        <div className="saved-notes-list">
          <div className="saved-notes-label">Saved notes</div>
          {noteItems.map(item => (
            <NoteItem key={item.key} item={item} onDelete={() => onDeleteNote(item.key)} />
          ))}
        </div>
      )}
    </div>
  );
}

function NoteItem({ item, onDelete }) {
  const typeIcon = item.labelType === 'month' ? '◈' : item.labelType === 'range' ? '⟡' : '◦';

  return (
    <div className={`note-item note-type-${item.labelType}`}>
      <div className="note-item-header">
        <span className="note-type-icon">{typeIcon}</span>
        <span className="note-item-label">{item.label}</span>
        <button className="note-delete-btn" onClick={onDelete} title="Delete note" aria-label="Delete note">
          ✕
        </button>
      </div>
      <p className="note-item-text">{item.text}</p>
    </div>
  );
}
