<<<<<<< HEAD
import { useState, useCallback, useMemo } from "react";

export function useCalendar() {
  const today = useMemo(() => new Date(), []);
=======
import { useState, useCallback } from 'react';

export function useCalendar() {
  const today = new Date();
>>>>>>> ef6e045ba5cacf5f0d0315d1560e471919c693e0

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoverDay, setHoverDay] = useState(null);

  const goToPrevMonth = useCallback(() => {
<<<<<<< HEAD
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
=======
    setCurrentMonth(m => {
      if (m === 0) { setCurrentYear(y => y - 1); return 11; }
>>>>>>> ef6e045ba5cacf5f0d0315d1560e471919c693e0
      return m - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
<<<<<<< HEAD
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
=======
    setCurrentMonth(m => {
      if (m === 11) { setCurrentYear(y => y + 1); return 0; }
>>>>>>> ef6e045ba5cacf5f0d0315d1560e471919c693e0
      return m + 1;
    });
  }, []);

<<<<<<< HEAD
  const handleDayClick = useCallback(
    (day) => {
      if (!rangeStart || rangeEnd) {
        setRangeStart({ year: currentYear, month: currentMonth, day });
        setRangeEnd(null);
      } else {
        const start = new Date(
          rangeStart.year,
          rangeStart.month,
          rangeStart.day,
        );
        const clicked = new Date(currentYear, currentMonth, day);
        if (clicked < start) {
          setRangeEnd({ ...rangeStart });
          setRangeStart({ year: currentYear, month: currentMonth, day });
        } else if (clicked.getTime() === start.getTime()) {
          // clicking same day = clear
          setRangeStart(null);
          setRangeEnd(null);
        } else {
          setRangeEnd({ year: currentYear, month: currentMonth, day });
        }
      }
    },
    [rangeStart, rangeEnd, currentYear, currentMonth],
  );
=======
  const handleDayClick = useCallback((day) => {
    if (!rangeStart || rangeEnd) {
      setRangeStart({ year: currentYear, month: currentMonth, day });
      setRangeEnd(null);
    } else {
      const start = new Date(rangeStart.year, rangeStart.month, rangeStart.day);
      const clicked = new Date(currentYear, currentMonth, day);
      if (clicked < start) {
        setRangeEnd({ ...rangeStart });
        setRangeStart({ year: currentYear, month: currentMonth, day });
      } else if (clicked.getTime() === start.getTime()) {
        // clicking same day = clear
        setRangeStart(null);
        setRangeEnd(null);
      } else {
        setRangeEnd({ year: currentYear, month: currentMonth, day });
      }
    }
  }, [rangeStart, rangeEnd, currentYear, currentMonth]);
>>>>>>> ef6e045ba5cacf5f0d0315d1560e471919c693e0

  const clearRange = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setHoverDay(null);
  }, []);

<<<<<<< HEAD
  const getDayState = useCallback(
    (day) => {
      const isToday =
        currentYear === today.getFullYear() &&
        currentMonth === today.getMonth() &&
        day === today.getDate();

      const isStart =
        rangeStart &&
        rangeStart.year === currentYear &&
        rangeStart.month === currentMonth &&
        rangeStart.day === day;

      const isEnd =
        rangeEnd &&
        rangeEnd.year === currentYear &&
        rangeEnd.month === currentMonth &&
        rangeEnd.day === day;

      let isInRange = false;
      if (rangeStart) {
        const a = new Date(rangeStart.year, rangeStart.month, rangeStart.day);
        const endDate = rangeEnd
          ? new Date(rangeEnd.year, rangeEnd.month, rangeEnd.day)
          : hoverDay
            ? new Date(currentYear, currentMonth, hoverDay)
            : null;

        if (endDate) {
          const lo = a < endDate ? a : endDate;
          const hi = a < endDate ? endDate : a;
          const cur = new Date(currentYear, currentMonth, day);
          isInRange = cur > lo && cur < hi;
        }
      }

      return { isToday, isStart, isEnd, isInRange };
    },
    [rangeStart, rangeEnd, hoverDay, currentYear, currentMonth, today],
  );
=======
  const getDayState = useCallback((day) => {
    const isToday =
      currentYear === today.getFullYear() &&
      currentMonth === today.getMonth() &&
      day === today.getDate();

    const isStart = rangeStart &&
      rangeStart.year === currentYear &&
      rangeStart.month === currentMonth &&
      rangeStart.day === day;

    const isEnd = rangeEnd &&
      rangeEnd.year === currentYear &&
      rangeEnd.month === currentMonth &&
      rangeEnd.day === day;

    let isInRange = false;
    if (rangeStart) {
      const a = new Date(rangeStart.year, rangeStart.month, rangeStart.day);
      const endDate = rangeEnd
        ? new Date(rangeEnd.year, rangeEnd.month, rangeEnd.day)
        : (hoverDay ? new Date(currentYear, currentMonth, hoverDay) : null);

      if (endDate) {
        const lo = a < endDate ? a : endDate;
        const hi = a < endDate ? endDate : a;
        const cur = new Date(currentYear, currentMonth, day);
        isInRange = cur > lo && cur < hi;
      }
    }

    return { isToday, isStart, isEnd, isInRange };
  }, [rangeStart, rangeEnd, hoverDay, currentYear, currentMonth, today]);
>>>>>>> ef6e045ba5cacf5f0d0315d1560e471919c693e0

  // Build calendar grid cells
  const getCalendarCells = useCallback(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    // Monday-first offset
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    const cells = [];

    // Previous month's trailing days
    for (let i = 0; i < offset; i++) {
<<<<<<< HEAD
      cells.push({ day: prevMonthDays - offset + 1 + i, type: "prev" });
=======
      cells.push({ day: prevMonthDays - offset + 1 + i, type: 'prev' });
>>>>>>> ef6e045ba5cacf5f0d0315d1560e471919c693e0
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
<<<<<<< HEAD
      cells.push({ day: d, type: "current", ...getDayState(d) });
=======
      cells.push({ day: d, type: 'current', ...getDayState(d) });
>>>>>>> ef6e045ba5cacf5f0d0315d1560e471919c693e0
    }

    // Next month leading days
    const remaining = (7 - ((offset + daysInMonth) % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
<<<<<<< HEAD
      cells.push({ day: d, type: "next" });
=======
      cells.push({ day: d, type: 'next' });
>>>>>>> ef6e045ba5cacf5f0d0315d1560e471919c693e0
    }

    return cells;
  }, [currentYear, currentMonth, getDayState]);

  return {
    currentYear,
    currentMonth,
    rangeStart,
    rangeEnd,
    hoverDay,
    setHoverDay,
    goToPrevMonth,
    goToNextMonth,
    handleDayClick,
    clearRange,
    getCalendarCells,
    today,
  };
}
