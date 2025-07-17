import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import CalendarDay from "@/components/molecules/CalendarDay";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { sessionService } from "@/services/api/sessionService";

const Calendar = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");

  const loadSessions = async () => {
    try {
      setLoading(true);
      setError("");
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await sessionService.getAll();
      setSessions(data);
    } catch (err) {
      setError("Failed to load calendar. Please try again.");
      toast.error("Failed to load calendar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const getCalendarDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getSelectedDateSessions = () => {
    return sessions.filter(session => 
      format(new Date(session.scheduledDate), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    );
  };

  const getMonthSessions = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return sessions.filter(session => {
      const sessionDate = new Date(session.scheduledDate);
      return sessionDate >= start && sessionDate <= end;
    });
  };

  if (loading) {
    return <Loading type="calendar" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadSessions} type="network" />;
  }

  const calendarDays = getCalendarDays();
  const selectedDateSessions = getSelectedDateSessions();
  const monthSessions = getMonthSessions();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">
            Calendar
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your skill exchange sessions
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-forest-green to-fresh-green text-white px-4 py-2 rounded-full">
            <ApperIcon name="Calendar" size={18} />
            <span className="text-sm font-medium">
              {monthSessions.length} sessions this month
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-card p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ApperIcon name="ChevronLeft" size={20} />
                </button>
                <h2 className="text-xl font-display font-semibold text-gray-900">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                <button
                  onClick={handleNextMonth}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ApperIcon name="ChevronRight" size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  Today
                </button>
                <button className="btn-primary text-sm py-1">
                  <ApperIcon name="Plus" size={16} />
                  <span className="ml-1">Add Session</span>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day) => (
                  <CalendarDay
                    key={day.toString()}
                    date={day}
                    sessions={sessions}
                    onDayClick={handleDayClick}
                    isSelected={format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Session Details */}
        <div className="space-y-6">
          {/* Selected Date */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
              {format(selectedDate, "MMMM d, yyyy")}
            </h3>
            
            {selectedDateSessions.length === 0 ? (
              <div className="text-center py-8">
                <ApperIcon name="Calendar" size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No sessions scheduled</p>
                <button className="btn-primary text-sm mt-4">
                  <ApperIcon name="Plus" size={16} />
                  <span className="ml-1">Schedule Session</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateSessions.map((session) => (
                  <div key={session.Id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Guitar Lesson</h4>
                      <span className="text-xs text-gray-500">
                        {format(new Date(session.scheduledDate), "h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">with John Smith</p>
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <span>{session.duration} min</span>
                      <span>{session.credits} credits</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
              Upcoming Sessions
            </h3>
            
            {monthSessions.length === 0 ? (
              <div className="text-center py-8">
                <ApperIcon name="CalendarX" size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No upcoming sessions</p>
              </div>
            ) : (
              <div className="space-y-3">
                {monthSessions.slice(0, 5).map((session) => (
                  <div key={session.Id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-fresh-green rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Guitar Lesson</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(session.scheduledDate), "MMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;