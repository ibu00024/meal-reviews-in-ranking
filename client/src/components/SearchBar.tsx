import {useNavigate} from "react-router-dom";

interface SearchBarProps {
    query: string;
  onSearch: (query: string) => void;
  searchSuggestions: SearchSuggestion[];
  setSuggestions: (suggestions: SearchSuggestion[]) => void;
}

export interface SearchSuggestion {
  restaurantId: number;
  restaurantName: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ query ,onSearch, searchSuggestions, setSuggestions }) => {
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleOnClick = (restaurantId: number) => {
      setSuggestions([])
        onSearch('')
      navigate("/restaurant/" + restaurantId)
      navigate(0)
  }

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search for a restaurant..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      <div className="result-list">
        {searchSuggestions.map((suggestion) => (
            <div key={suggestion.restaurantId} className="suggest-text" onClick={() => handleOnClick(suggestion.restaurantId)}>{suggestion.restaurantName}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
