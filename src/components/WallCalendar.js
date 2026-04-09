import React from 'react';
import HeroPanel from './HeroPanel';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import RangeInfo from './RangeInfo';
import { useCalendar } from '../hooks/useCalendar';
import { useNotes, dateKey, monthKey, rangeKey } from '../hooks/useNotes';
import './WallCalendar.css';

export default function WallCalendar() {
  const {
    currentYear,
    currentMonth,
    rangeStart,
    rangeEnd,
    setHoverDay,
    goToPrevMonth,
    goToNextMonth,
    handleDayClick,
    clearRange,
    getCalendarCells,
  } = useCalendar();

  const {
    notes,
    addNote,
    deleteNote,
    hasDayNote,
  } = useNotes();

  const cells = getCalendarCells();

  return (
    <div className="wall-calendar-container">
      {/* Page title */}
      <div className="page-header">
        <h2 className="page-title">Wall Calendar</h2>
        <p className="page-hint">Click to start range · Click again to end range</p>
      </div>

      <div className="wall-calendar-card">
        {/* Hero image with month name */}
        <HeroPanel
          month={currentMonth}
          year={currentYear}
          onPrev={goToPrevMonth}
          onNext={goToNextMonth}
        />

        {/* Range selection info bar */}
        <RangeInfo
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onClear={clearRange}
        />

        {/* Main body: calendar grid + notes */}
        <div className="calendar-body">
          <CalendarGrid
            cells={cells}
            onDayClick={handleDayClick}
            onDayHover={setHoverDay}
            onGridLeave={() => setHoverDay(null)}
            hasDayNote={hasDayNote}
            currentYear={currentYear}
            currentMonth={currentMonth}
          />

          <NotesPanel
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            currentYear={currentYear}
            currentMonth={currentMonth}
            notes={notes}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
            monthKey={monthKey}
            rangeKey={rangeKey}
            dateKey={dateKey}
          />
        </div>
      </div>

      {/* Footer hint */}
      <div className="page-footer">
        Notes are saved in your browser · {currentYear}
      </div>
    </div>
  );
}
