import { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';

const CollectionCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [showMonths, setShowMonths] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const years = Array.from({ length: 16 }, (_, i) => 2017 + i);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handleYearClick = (year: number) => {
    if (year > 2025) return; // Disable future years
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

  // Stage 1 - Year Selection
  if (!showMonths && !showCalendar) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Collection Calendar</h1>
          
          <div className="grid grid-cols-4 gap-4 mb-8">
            {years.map(year => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                disabled={year > 2025}
                className={`p-4 rounded font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
                  selectedYear === year
                    ? 'bg-black text-white'
                    : year > 2025
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
          
          <div className="text-center text-gray-600">
            <p className="mb-2">Selected: {selectedYear}</p>
            <p>Click a year to view months</p>
          </div>
        </div>
      </div>
    );
  }

  // Stage 2 - Month Selection
  if (showMonths && !showCalendar) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={goBackToYears}
              className="flex items-center text-gray-600 hover:text-black transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Years
            </button>
            <h1 className="text-2xl font-bold">{selectedYear} - Select Month</h1>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthClick(index)}
                className="p-4 bg-gray-100 rounded font-medium hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Stage 3 - Calendar View
  if (showCalendar && selectedMonth !== null) {
    const calendarDays = generateCalendarDays(selectedYear, selectedMonth);

    return (
      <div className="min-h-screen bg-white">
        {/* Top gradient section with photo placeholder */}
        <div className="h-64 bg-gradient-to-b from-black to-gray-700 relative flex items-center justify-center">
          <div className="absolute top-4 left-4">
            <button
              onClick={goBackToMonths}
              className="flex items-center text-white hover:text-gray-300 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Months
            </button>
          </div>
          
          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Camera className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Calendar section */}
        <div className="max-w-4xl mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              {monthNames[selectedMonth]} {selectedYear}
            </h1>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="p-4 text-center font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const isCurrentMonth = day.getMonth() === selectedMonth;
              const dayNumber = day.getDate();

              return (
                <div
                  key={index}
                  className={`aspect-square border border-black p-2 relative transition-all duration-200 transform hover:scale-105 hover:bg-black hover:text-white animate-fade-in ${
                    !isCurrentMonth ? 'text-gray-400' : 'text-black'
                  }`}
                  style={{
                    animationDelay: `${index * 20}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <span className="absolute top-2 left-2 text-sm font-medium">
                    {dayNumber}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CollectionCalendar;