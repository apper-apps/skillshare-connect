import { useLocation } from "react-router-dom";
import SkillGrid from "@/components/organisms/SkillGrid";

const BrowseSkills = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  return (
    <div className="max-w-7xl mx-auto">
      <SkillGrid searchQuery={searchQuery} />
    </div>
  );
};

export default BrowseSkills;