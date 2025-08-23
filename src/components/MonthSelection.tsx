import { ArrowLeft } from "lucide-react";

interface MonthSelectionProps {
  selectedYear: number;
  months: string[];
  onBackToYears: () => void;
  onMonthClick: (monthIndex: number) => void;
}

const MonthSelection = ({ selectedYear, months, onBackToYears, onMonthClick }: MonthSelectionProps) => {
  return (
    <div className="min-h-96 bg-gray-100 flex items-center justify-center p-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToYears}
            className="flex items-center text-gray-600 hover:text-black transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Back to Years</span>
            <span className="sm:hidden">Back</span>
          </button>
          <h1 className="text-lg sm:text-2xl font-bold truncate">{selectedYear} - Select Month</h1>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => onMonthClick(index)}
              className="p-4 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthSelection;