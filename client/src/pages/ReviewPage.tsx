import React, { useEffect, useState } from "react";
import "../formStyles.css";
import SuccessIcon from "../assets/success-icon.svg";
import FailIcon from "../assets/fail-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt, faStar as regularStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


export const FormDataForm = () => {
  const [username, setUsername] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [menuName, setMenuName] = useState("");
  const [menuRating, setMenuRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [menuPrice, setMenuPrice] = useState("");
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [locationUrl, setLocationUrl] = useState("");
  const [isAddingRestaurant, setIsAddingRestaurant] = useState(false);
  const [categories, setCategories] = useState<{ categoryID: number; categoryName: string }[]>([]);
  const [menuCategory, setMenuCategory] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);  // ✅ Controls the success/failure modal
  const [showAddRestaurantModal, setShowAddRestaurantModal] = useState(false);  // ✅ Controls the Add Restaurant modal
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/category");
        const result = await response.json();

        if (result.success && result.data.length > 0) {
          setCategories(result.data);
        } else {
          console.warn("No categories found");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  /** Handle searching for a restaurant */
  const handleSearchRestaurant = async () => {
    if (!restaurantName.trim()) {
      alert("Please enter a restaurant name.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/restaurant/search?name=${restaurantName}`);
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        // Found a restaurant, update name & store ID
        
        setRestaurantName(result.data[0].name);
        setRestaurantId(result.data[0].restaurant_id);
        console.log("Restaurant found:", result.data[0]);
      } else {
        // No restaurant found, open the modal to add new restaurant info
        setShowAddRestaurantModal(true);
      }
    } catch (error) {
      console.error("Error searching restaurant:", error);
      alert("Failed to search for the restaurant. Please try again.");
    }
  };

  const handleAddRestaurant = async () => {
    if (!locationUrl.trim()) {
        alert("Please enter a Google Map URL.");
        return;
    }

    setIsAddingRestaurant(true);

    try {
        const response = await fetch("http://localhost:8000/restaurant/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ location: locationUrl }),
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to add restaurant.");
        }

        // Update restaurant_name and restaurant_id from API response
        setRestaurantName(result.data.restaurantName);
        setRestaurantId(result.data.restaurantId);

        alert("Restaurant added successfully!");
        setShowAddRestaurantModal(false);
        setLocationUrl(""); // Clear input
    } catch (error) {
      console.error("Error adding restaurant:", error);
  
      if (error instanceof Error) {
          alert(`Error: ${error.message}`);
      } else {
          alert("An unknown error occurred.");
      }
    } finally {
      setIsAddingRestaurant(false);
    }
};
  
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!restaurantId) {
      alert("Please search and select a restaurant before submitting.");
      return;
  }

    // Prepare the JSON body with state values
    const submissionData = {
      username: username || "Anonymous", // Default to "Anonymous" if empty
      restaurantId: restaurantId,
      categoryId: Number(menuCategory),
      pictureURL: imageUrl,
      rating: menuRating,
      price: Number(menuPrice),
      menuName: menuName,
      comments: comment
    };

    console.log("Submitting Data:", submissionData);

    try {
      const response = await fetch("http://localhost:8000/review", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
          console.error("Server responded with error status:", response.status);
          throw new Error(`Submission failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("Server Response:", result);

      // SUCCESS: Show modal and reset form
      setIsSubmitSuccess(true);
      setShowSubmitModal(true);

      // Reset form fields only on successful submission
      setUsername("");
      setRestaurantName("");
      setMenuName("");
      setMenuCategory("");
      setMenuRating(0);
      setMenuPrice("");
      setComment("");
      setImageFile(null);
      setImageUrl(null);
      setRestaurantId(null);
    } catch (error) {
      console.error("Error submitting form:", error);

      // FAILURE: Show modal but DO NOT reset the form
      setIsSubmitSuccess(false);
      setShowSubmitModal(true);
    }
  };


  /** Handle selecting a rating based on mouse position */
  const handleRatingClick = (event: React.MouseEvent, star: number) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - left;
    const isHalf = clickX < width / 2; // If clicked on the left half, it's a half-star

    setMenuRating(isHalf ? star - 0.5 : star);
  };

  /** Handle hover effect based on mouse position */
  const handleHover = (event: React.MouseEvent, star: number) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const hoverX = event.clientX - left;
    const isHalf = hoverX < width / 2;

    setHoverRating(isHalf ? star - 0.5 : star);
  };

  /** Upload the image to the server */
  const handleUploadImage = async () => {
    if (!imageFile) {
      alert("Please select an image before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:8000/image", {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      console.log("Image Upload Response:", result);
      
      if (result.success && result.url) {
        setImageUrl(result.url);
      } else {
        alert("Image upload failed. Please try again.");
        setImageUrl(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload the image.");
      setImageUrl(null);
    }
  };

  return (
    <div className="review-page-container">
      <h2 className="form__title">Review</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="username" className="form__label">
            Username (Optional)
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            className="form__input"
            placeholder="Anonymous"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Restaurant Name + Search Button */}
        <div className="form__group search-container" >
          <div style={{ flexGrow: 1 }}>
            <label htmlFor="restaurant_name" className="form__label">Restaurant Name</label>
            <input
              type="text"
              id="restaurant_name"
              name="restaurant_name"
              className="form__input"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </div>
          <button type="button" className="search-button" onClick={handleSearchRestaurant}>
            Search
          </button>
        </div>

        <div className="form__group">
          <label htmlFor="menu_name" className="form__label">
            Menu Name
          </label>
          <input
            type="text"
            id="menu_name"
            name="menu_name"
            className="form__input"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            // required
          />
        </div>

        {/* Menu Category Dropdown */}
        <div className="form__group">
          <label htmlFor="menu_category" className="form__label">Menu Category</label>
          <select
            id="menu_category"
            name="menu_category"
            className="form__input"
            value={menuCategory}
            onChange={(e) => setMenuCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.categoryID} value={category.categoryID}>
                  {category.categoryName}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
        </div>

        <div className="form__group">
          <label className="form__label">Menu Rating</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => {
              const filledStar = (hoverRating || menuRating) >= star; // Full star
              const halfStar = (hoverRating || menuRating) >= star - 0.5 && (hoverRating || menuRating) < star; // Half star

              return (
                <span
                  key={star}
                  className="star"
                  onMouseMove={(event) => handleHover(event, star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={(event) => handleRatingClick(event, star)}
                >
                  {filledStar ? (
                    <FontAwesomeIcon icon={solidStar} className="star-filled" />
                  ) : halfStar ? (
                    <FontAwesomeIcon icon={faStarHalfAlt} className="star-filled" />
                  ) : (
                    <FontAwesomeIcon icon={regularStar} className="star-empty" />
                  )}
                </span>
              );
            })}
          </div>
          <input type="hidden" name="menu_rating" value={menuRating}/>
        </div>

        <div className="form__group">
          <label htmlFor="menu_price" className="form__label">
            Price
          </label>
          <input
            type="number"
            id="menu_price"
            name="menu_price"
            className="form__input"
            step="0.01"
            value={menuPrice}
            onChange={(e) => setMenuPrice(e.target.value)}
            // required
          />
        </div>

        <div className="form__group">
          <label htmlFor="comment" className="form__label">
            Comment
          </label>
          <textarea
            name="comment"
            id="comment"
            className="form__textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            // required
          ></textarea>
        </div>

        {/* Single Image Upload */}
        <div className="form__group">
          <label htmlFor="image_upload" className="form__label">Upload an Image</label>
          <input 
            type="file" 
            id="image_upload" 
            name="image" 
            className="form__input" 
            accept="image/*" 
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          {imageUrl ? (
            <div className="image-preview">
                <img src={imageUrl} alt="Uploaded Preview" className="preview-img" />
            </div>
          ) : (
              <p className="upload-status">No image uploaded yet.</p>
          )}
          <button type="button" className="upload-button" onClick={handleUploadImage}>Upload</button>
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>

      {/* Show submission modal*/}
      {showSubmitModal && (
        <div className="modal-container">
          <div className="modal-content">
            {isSubmitSuccess ? (
              <div>
                <img src={SuccessIcon} alt="Success" className="modal-icon" />
                <h3 className="modal-title-success">Submission Successful!</h3>
                <p className="modal-text">Your review has been submitted successfully.</p>
                <button onClick={() => {
                  setShowSubmitModal(false);
                  navigate("/");
                }}>Close</button>
              </div>
            ) : (
              <div>
                <img src={FailIcon} alt="Fail" className="modal-icon" />
                <h3 className="modal-title-fail">Submission Failed</h3>
                <p className="modal-text">There was an error submitting your review. Please try again.</p>
                <button onClick={() => setShowSubmitModal(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Adding New Restaurant */}
      {showAddRestaurantModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h3 className="modal-title">Add Restaurant Information</h3>
            <p>Please provide the Google Map URL for this restaurant.</p>
            <input
              type="text"
              className="form__input"
              placeholder="Enter Google Map URL"
              value={locationUrl}
              onChange={(e) => setLocationUrl(e.target.value)}
            />
            <button onClick={handleAddRestaurant} className="button">
              Submit
            </button>
            <button onClick={() => setShowAddRestaurantModal(false)} className="button" style={{ marginTop: "10px" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
