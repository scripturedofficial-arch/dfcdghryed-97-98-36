
import { useState } from "react";
import YearSelection from "./YearSelection";
import MonthSelection from "./MonthSelection";
import CalendarView from "./CalendarView";

const YearCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [showMonths, setShowMonths] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const years = Array.from({ length: 16 }, (_, i) => 2017 + i);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setShowMonths(true);
  };

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setShowCalendar(true);
  };

  const goBackToYears = () => {
    setShowMonths(false);
    setShowCalendar(false);
    setSelectedMonth(null);
  };

  const goBackToMonths = () => {
    setShowCalendar(false);
    setSelectedMonth(null);
  };

  const handlePreviousMonth = () => {
    if (selectedMonth === null) return;
    
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === null) return;
    
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const generateCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  // Year Selection View
  if (!showMonths && !showCalendar) {
    return (
      <YearSelection
        years={years}
        selectedYear={selectedYear}
        onYearClick={handleYearClick}
      />
    );
  }

  // Month Selection View
  if (showMonths && !showCalendar) {
    return (
      <MonthSelection
        selectedYear={selectedYear}
        months={months}
        onBackToYears={goBackToYears}
        onMonthClick={handleMonthClick}
      />
    );
  }

  // Full Calendar View
  if (showCalendar && selectedMonth !== null) {
    return (
      <CalendarView
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        monthNames={monthNames}
        daysOfWeek={daysOfWeek}
        onBackToMonths={goBackToMonths}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        generateCalendarDays={generateCalendarDays}
      />
    );
  }

  return null;
};

export default YearCalendar;
