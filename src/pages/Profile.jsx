import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import SkillCard from "@/components/molecules/SkillCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { useUser } from "@/hooks/useUser";
import { skillService } from "@/services/api/skillService";

const Profile = () => {
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("skills");
  const { user } = useUser();

  const loadUserSkills = async () => {
    try {
      setLoading(true);
      setError("");
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await skillService.getAll();
      const userSkillsData = data.filter(skill => skill.userId === user?.Id);
      setUserSkills(userSkillsData);
    } catch (err) {
      setError("Failed to load profile. Please try again.");
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserSkills();
  }, [user]);

  const getSkillsByType = (type) => {
    return userSkills.filter(skill => skill.type === type);
  };

  const tabs = [
    { id: "skills", label: "My Skills", icon: "BookOpen" },
    { id: "reviews", label: "Reviews", icon: "Star" },
    { id: "stats", label: "Statistics", icon: "TrendingUp" }
  ];

  if (loading) {
    return <Loading type="profile" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadUserSkills} type="network" />;
  }

  const skillsOffered = getSkillsByType("offer");
  const skillsRequested = getSkillsByType("request");

  return (
<div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-card p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-warm-orange to-orange-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          
<div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
              {user?.name || "User Name"}
            </h1>
            <p className="text-gray-600 mt-2">
              {user?.bio || "Passionate about learning and sharing skills with the community"}
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ApperIcon name="MapPin" size={16} />
                <span>New York, NY</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ApperIcon name="Calendar" size={16} />
                <span>Joined March 2024</span>
              </div>
            </div>
          </div>
          
          <button className="btn-primary">
            <ApperIcon name="Edit" size={18} />
            <span className="ml-2">Edit Profile</span>
          </button>
        </div>
      </div>

{/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-card p-4 sm:p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-forest-green to-fresh-green rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Coins" size={24} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{user?.credits || 0}</h3>
          <p className="text-sm text-gray-600">Time Credits</p>
        </div>
        
<div className="bg-white rounded-lg shadow-card p-4 sm:p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-warm-orange to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="BookOpen" size={24} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{userSkills.length}</h3>
          <p className="text-sm text-gray-600">Skills Listed</p>
        </div>
        
<div className="bg-white rounded-lg shadow-card p-4 sm:p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-info-blue to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Users" size={24} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">12</h3>
          <p className="text-sm text-gray-600">Sessions Completed</p>
        </div>
        
<div className="bg-white rounded-lg shadow-card p-4 sm:p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Star" size={24} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{user?.rating || 4.8}</h3>
          <p className="text-sm text-gray-600">Average Rating</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-card">
<div className="border-b border-gray-200">
          <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-forest-green text-forest-green"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <ApperIcon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
<div className="p-4 sm:p-6">
          {activeTab === "skills" && (
            <div className="space-y-8">
              {/* Skills Offered */}
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  Skills I Offer ({skillsOffered.length})
                </h3>
                {skillsOffered.length === 0 ? (
                  <Empty
                    type="skills"
                    title="No skills offered yet"
                    message="Share your expertise with the community by adding skills you can teach."
                    actionText="Add a Skill to Offer"
                    onAction={() => window.location.href = "/add-skill"}
                  />
) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {skillsOffered.map((skill) => (
                      <SkillCard
                        key={skill.Id}
                        skill={skill}
                        onClick={() => window.location.href = `/skill/${skill.Id}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Skills Requested */}
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  Skills I Want to Learn ({skillsRequested.length})
                </h3>
                {skillsRequested.length === 0 ? (
                  <Empty
                    type="skills"
                    title="No learning requests yet"
                    message="Let the community know what skills you'd like to learn."
                    actionText="Add a Learning Request"
                    onAction={() => window.location.href = "/add-skill"}
                  />
) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {skillsRequested.map((skill) => (
                      <SkillCard
                        key={skill.Id}
                        skill={skill}
                        onClick={() => window.location.href = `/skill/${skill.Id}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <ApperIcon name="Star" size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600">Complete some skill exchanges to start receiving reviews.</p>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-forest-green to-fresh-green text-white rounded-lg">
                  <h4 className="text-lg font-semibold mb-4">Teaching Activity</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Hours Taught</span>
                      <span className="font-bold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students Helped</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credits Earned</span>
                      <span className="font-bold">24</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-warm-orange to-orange-500 text-white rounded-lg">
                  <h4 className="text-lg font-semibold mb-4">Learning Activity</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Hours Learned</span>
                      <span className="font-bold">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Teachers Met</span>
                      <span className="font-bold">6</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credits Spent</span>
                      <span className="font-bold">18</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;