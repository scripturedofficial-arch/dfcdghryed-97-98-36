import { ArrowLeft, Camera, ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarViewProps {
  selectedYear: number;
  selectedMonth: number;
  monthNames: string[];
  daysOfWeek: string[];
  onBackToMonths: () => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  generateCalendarDays: (year: number, month: number) => Date[];
}

const CalendarView = ({ 
  selectedYear, 
  selectedMonth, 
  monthNames, 
  daysOfWeek, 
  onBackToMonths,
  onPreviousMonth,
  onNextMonth,
  generateCalendarDays 
}: CalendarViewProps) => {
  const calendarDays = generateCalendarDays(selectedYear, selectedMonth);

  return (
    <div className="min-h-screen bg-white">
      {/* Header section with gradient background */}
      <div className="h-64 bg-gradient-to-b from-black to-gray-700 relative flex items-center justify-center">
        <button
          onClick={onBackToMonths}
          className="absolute top-4 left-4 flex items-center text-white/80 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Months
        </button>
        
        {/* Photo placeholder */}
        <div className="w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center">
          <Camera className="w-12 h-12 text-white/60" />
        </div>
      </div>

      {/* Calendar section */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 group">
            <div className="relative w-52 flex justify-center items-center">
              <button
                onClick={onPreviousMonth}
                className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-3xl font-normal text-black">{monthNames[selectedMonth]}</h1>
              <button
                onClick={onNextMonth}
                className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <span className="text-3xl font-light text-gray-600">{selectedYear}</span>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 mb-0">
            {daysOfWeek.map((day) => (
              <div key={day} className="h-12 flex items-center justify-center text-sm font-normal text-gray-700 bg-gray-50">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 border-l border-t border-black">
            {calendarDays.map((date, index) => {
              const isCurrentMonth = date.getMonth() === selectedMonth;
              const dayNumber = date.getDate();
              
              return (
                <div
                  key={index}
                  className={`
                    w-16 h-16 md:w-[118px] md:h-[118px] border-r border-b border-black flex items-start justify-start p-2 text-sm
                    ${isCurrentMonth ? 'text-black bg-white' : 'text-gray-400 bg-white'}
                  `}
                >
                  {dayNumber}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;