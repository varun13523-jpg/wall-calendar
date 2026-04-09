import React from 'react';
import './RangeInfo.css';

const MONTHS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

function fmt({ year, month, day }) {
  return `${day} ${MONTHS[month]} ${year}`;
}

export default function RangeInfo({ rangeStart, rangeEnd, onClear }) {
  if (!rangeStart) return null;

  return (
    <div className="range-info">
      <span className="range-icon">⟡</span>
      <span className="range-text">
        {rangeEnd ? (
          <>
            <strong>{fmt(rangeStart)}</strong>
            <span className="range-arrow">→</span>
            <strong>{fmt(rangeEnd)}</strong>
          </>
        ) : (
          <>
            <strong>{fmt(rangeStart)}</strong>
            <span className="range-hint"> — select end date</span>
          </>
        )}
      </span>
      <button className="range-clear-btn" onClick={onClear} title="Clear selection">
        ✕
      </button>
    </div>
  );
}
