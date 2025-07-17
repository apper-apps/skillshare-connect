import { motion } from "framer-motion";
import { format, isSameDay, isToday, isPast } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const CalendarDay = ({ date, sessions, onDayClick, isSelected }) => {
  const dayNumber = format(date, "d");
  const daySessions = sessions.filter(session => 
    isSameDay(new Date(session.scheduledDate), date)
  );

  const getSessionColor = (session) => {
    switch (session.status) {
      case "confirmed":
        return "bg-success-green";
      case "pending":
        return "bg-warning-orange";
      case "completed":
        return "bg-info-blue";
      default:
        return "bg-gray-400";
    }
  };

  const isCurrentDay = isToday(date);
  const isPastDay = isPast(date) && !isCurrentDay;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onDayClick(date)}
      className={`
        relative w-full h-20 p-2 rounded-lg transition-all duration-200 text-left
        ${isSelected ? "bg-gradient-to-br from-forest-green to-fresh-green text-white shadow-lg" : ""}
        ${isCurrentDay && !isSelected ? "bg-gradient-to-br from-warm-orange to-orange-500 text-white" : ""}
        ${isPastDay && !isSelected ? "bg-gray-100 text-gray-400" : ""}
        ${!isSelected && !isCurrentDay && !isPastDay ? "bg-white hover:bg-gray-50 text-gray-900" : ""}
        border border-gray-200 hover:border-gray-300
      `}
    >
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${isPastDay && !isSelected ? "text-gray-400" : ""}`}>
          {dayNumber}
        </span>
        {daySessions.length > 0 && (
          <div className="flex items-center space-x-1">
            <ApperIcon name="Calendar" size={12} className="opacity-75" />
            <span className="text-xs">{daySessions.length}</span>
          </div>
        )}
      </div>

      {/* Session Indicators */}
      {daySessions.length > 0 && (
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex space-x-1">
            {daySessions.slice(0, 3).map((session, index) => (
              <div
                key={session.Id}
                className={`w-2 h-2 rounded-full ${getSessionColor(session)} ${
                  isSelected || isCurrentDay ? "bg-white/75" : ""
                }`}
              />
            ))}
            {daySessions.length > 3 && (
              <div className="w-2 h-2 rounded-full bg-gray-400" />
            )}
          </div>
        </div>
      )}
    </motion.button>
  );
};

export default CalendarDay;