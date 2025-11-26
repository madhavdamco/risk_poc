import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingAnimation from "@/components/LoadingAnimation";

const Analyze = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategories = location.state?.selectedCategories || "all";

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleComplete = () => {
    setIsLoading(false);
    navigate("/results", { state: { selectedCategories } });
  };

  if (!isLoading) {
    return null;
  }

  return (
    <div className="container py-12">
      <LoadingAnimation onComplete={handleComplete} />
    </div>
  );
};

export default Analyze;
