import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import SessionCard from "@/components/molecules/SessionCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { sessionService } from "@/services/api/sessionService";

const MyExchanges = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const loadSessions = async () => {
    try {
      setLoading(true);
      setError("");
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await sessionService.getAll();
      setSessions(data);
    } catch (err) {
      setError("Failed to load sessions. Please try again.");
      toast.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleStatusChange = async (sessionId, newStatus) => {
    try {
      await sessionService.update(sessionId, { status: newStatus });
      setSessions(prev => 
        prev.map(session => 
          session.Id === sessionId ? { ...session, status: newStatus } : session
        )
      );
      toast.success(`Session ${newStatus} successfully`);
    } catch (err) {
      toast.error("Failed to update session status");
    }
  };

  const getFilteredSessions = () => {
    if (filter === "all") return sessions;
    return sessions.filter(session => session.status === filter);
  };

  const filteredSessions = getFilteredSessions();

  const filters = [
    { value: "all", label: "All Sessions", icon: "Calendar" },
    { value: "pending", label: "Pending", icon: "Clock" },
    { value: "confirmed", label: "Confirmed", icon: "CheckCircle" },
    { value: "completed", label: "Completed", icon: "Award" }
  ];

  const getStatusCounts = () => {
    return {
      all: sessions.length,
      pending: sessions.filter(s => s.status === "pending").length,
      confirmed: sessions.filter(s => s.status === "confirmed").length,
      completed: sessions.filter(s => s.status === "completed").length
    };
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return <Loading type="list" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadSessions} type="network" />;
  }

  return (
<div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold gradient-text">
            My Exchanges
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your skill exchange sessions
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-forest-green to-fresh-green text-white px-4 py-2 rounded-full">
            <ApperIcon name="TrendingUp" size={18} />
            <span className="text-sm font-medium">
              {statusCounts.completed} completed
            </span>
          </div>
        </div>
      </div>

{/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-card p-4 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((filterOption) => (
            <motion.button
              key={filterOption.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === filterOption.value
                  ? "bg-forest-green text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ApperIcon name={filterOption.icon} size={16} />
              <span>{filterOption.label}</span>
              {statusCounts[filterOption.value] > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  filter === filterOption.value
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {statusCounts[filterOption.value]}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sessions Grid */}
      {filteredSessions.length === 0 ? (
        <Empty
          type="sessions"
          title={`No ${filter === "all" ? "" : filter} sessions found`}
          message={`${filter === "all" ? "You haven't scheduled any sessions yet." : `No ${filter} sessions at the moment.`} Start by finding skill matches and scheduling your first exchange.`}
          onAction={() => window.location.href = "/"}
        />
) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSessions.map((session, index) => (
            <motion.div
              key={session.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SessionCard
                session={session}
                onStatusChange={handleStatusChange}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyExchanges;