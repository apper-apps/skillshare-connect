import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import ChatMessage from "@/components/molecules/ChatMessage";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { messageService } from "@/services/api/messageService";
import { useUser } from "@/hooks/useUser";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const { user, users } = useUser();

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await messageService.getAll();
      setMessages(data);
      
      // Group messages by match and select first one
      const groupedMessages = groupMessagesByMatch(data);
      if (groupedMessages.length > 0) {
        setSelectedMatch(groupedMessages[0].matchId);
      }
    } catch (err) {
      setError("Failed to load messages. Please try again.");
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const groupMessagesByMatch = (messages) => {
    const grouped = messages.reduce((acc, message) => {
      const matchId = message.matchId;
      if (!acc[matchId]) {
        acc[matchId] = [];
      }
      acc[matchId].push(message);
      return acc;
    }, {});

    return Object.entries(grouped).map(([matchId, messages]) => ({
      matchId,
      messages: messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
      lastMessage: messages[messages.length - 1]
    }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMatch) return;

    try {
      const messageData = {
        matchId: selectedMatch,
        senderId: user?.Id || 1,
        content: newMessage,
        timestamp: new Date().toISOString()
      };

      await messageService.create(messageData);
      setMessages(prev => [...prev, { ...messageData, Id: Date.now() }]);
      setNewMessage("");
      toast.success("Message sent");
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  const getSelectedMessages = () => {
    if (!selectedMatch) return [];
    return messages
      .filter(msg => msg.matchId === selectedMatch)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const getMatchUser = (matchId) => {
    // In a real app, this would come from match data
    return users.find(u => u.Id !== user?.Id) || users[0];
  };

  if (loading) {
    return <Loading type="messages" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadMessages} type="network" />;
  }

  const groupedMessages = groupMessagesByMatch(messages);

  return (
<div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-card overflow-hidden h-[500px] sm:h-[600px]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-full sm:w-1/3 border-r border-gray-200 bg-gray-50">
            <div className="p-3 sm:p-4 border-b border-gray-200">
<h2 className="text-base sm:text-lg font-display font-semibold text-gray-900">
                Messages
              </h2>
            </div>
            
            <div className="overflow-y-auto h-full">
{groupedMessages.length === 0 ? (
                <div className="p-6 sm:p-8 text-center">
                  <ApperIcon name="MessageCircle" size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No conversations yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {groupedMessages.map(({ matchId, messages, lastMessage }) => {
                    const matchUser = getMatchUser(matchId);
                    return (
                      <motion.button
                        key={matchId}
                        whileHover={{ backgroundColor: "#f9fafb" }}
onClick={() => setSelectedMatch(matchId)}
                        className={`w-full p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors ${
                          selectedMatch === matchId ? "bg-white border-r-4 border-r-forest-green" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-warm-orange to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {matchUser?.name?.charAt(0) || "U"}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">
                              {matchUser?.name || "Unknown User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {lastMessage.content}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

{/* Chat Area */}
          <div className="flex-1 flex flex-col hidden sm:flex">
            {selectedMatch ? (
              <>
{/* Chat Header */}
                <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-warm-orange to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {getMatchUser(selectedMatch)?.name?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {getMatchUser(selectedMatch)?.name || "Unknown User"}
                        </h3>
                        <p className="text-sm text-gray-500">Online</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <ApperIcon name="Phone" size={20} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <ApperIcon name="Video" size={20} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <ApperIcon name="MoreVertical" size={20} />
                      </button>
                    </div>
                  </div>
                </div>

{/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
                  {getSelectedMessages().map((message) => (
                    <ChatMessage
                      key={message.Id}
                      message={message}
                      isOwn={message.senderId === user?.Id}
                      user={users.find(u => u.Id === message.senderId)}
                    />
                  ))}
                </div>

{/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
placeholder="Type a message..."
                      className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-fresh-green focus:border-fresh-green text-sm sm:text-base"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-2 bg-gradient-to-r from-forest-green to-fresh-green text-white rounded-full hover:shadow-lg disabled:opacity-50 transition-all"
                    >
                      <ApperIcon name="Send" size={20} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <Empty
                type="messages"
                title="Select a conversation"
                message="Choose a conversation from the list to start messaging"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;