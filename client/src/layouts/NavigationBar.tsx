import Logo from "../assets/logo.png";
import SearchBar, { SearchSuggestion } from "../components/SearchBar.tsx";
import AddReviewButton from "../components/AddReviewButton.tsx";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchSuggestions = async (
    query: string,
  ): Promise<SearchSuggestion[]> => {
    try {
      const response = await fetch(
        "http://localhost:8000/restaurant/search?name=" + query,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      return json.data.map((data: { restaurant_id: number; name: string }) => ({
        restaurantId: data.restaurant_id,
        restaurantName: data.name,
      }));
    } catch {
      return [];
    }
  };

  const onClickAddReview = () => {
    setSearchQuery("");
    navigate("/submit");
  };

  const onClickHome = () => {
    setSearchQuery("");
    navigate("/");
  };

  useEffect(() => {
    if (searchQuery == "") {
      setSuggestions([]);
      return;
    }
    fetchSuggestions(searchQuery).then((suggestions) => {
      setSuggestions(suggestions);
    });
  }, [searchQuery]);

  return (
    <div className="search-bar-container">
      <img
        src={Logo}
        alt="Meal Review Logo"
        className="logo"
        onClick={onClickHome}
      />
      <SearchBar
        query={searchQuery}
        onSearch={setSearchQuery}
        searchSuggestions={suggestions}
        setSuggestions={setSuggestions}
      />
      {location.pathname !== "/submit" && (
        <AddReviewButton onClick={onClickAddReview} />
      )}
    </div>
  );
};
export default NavigationBar;
