import React from 'react';
import './CalendarGrid.css';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function CalendarGrid({
  cells,
  onDayClick,
  onDayHover,
  onGridLeave,
  hasDayNote,
  currentYear,
  currentMonth,
}) {
  return (
    <div className="calendar-grid-wrap">
      {/* Day headers */}
      <div className="day-headers">
        {DAY_LABELS.map((d, i) => (
          <div key={d} className={`day-header${i >= 5 ? ' weekend' : ''}`}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="days-grid" onMouseLeave={onGridLeave}>
        {cells.map((cell, idx) => {
          const isOther = cell.type !== 'current';
          const hasNote = !isOther && hasDayNote(currentYear, currentMonth, cell.day);

          let cls = 'day-cell';
          if (isOther) cls += ' other-month';
          if (!isOther && cell.isToday) cls += ' today';
          if (!isOther && cell.isStart) cls += ' range-start';
          if (!isOther && cell.isEnd) cls += ' range-end';
          if (!isOther && cell.isInRange) cls += ' in-range';
          if (hasNote) cls += ' has-note';

          return (
            <div
              key={idx}
              className={cls}
              onClick={() => !isOther && onDayClick(cell.day)}
              onMouseEnter={() => !isOther && onDayHover(cell.day)}
              role={!isOther ? 'button' : undefined}
              tabIndex={!isOther ? 0 : undefined}
              aria-label={!isOther ? `${cell.day}` : undefined}
              onKeyDown={e => e.key === 'Enter' && !isOther && onDayClick(cell.day)}
            >
              <span className="day-number">{cell.day}</span>
              {hasNote && <span className="note-dot" aria-hidden="true" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
