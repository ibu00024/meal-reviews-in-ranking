import React, { useState } from "react";
import "../formStyles.css";
import SuccessIcon from "../assets/success-icon.svg";
import FailIcon from "../assets/fail-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt, faStar as regularStar } from "@fortawesome/free-solid-svg-icons";

export const FormDataForm = () => {
  const [username, setUsername] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [menuRating, setMenuRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [menuPrice, setMenuPrice] = useState("");
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  
  // Define menu categories as a constant object
  const MENU_CATEGORIES: { [key: number]: string } = {
    1: "Appetizer",
    2: "Main Course",
    3: "Dessert",
    4: "Beverage",
  };
  

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // Prepare the JSON body with state values
    const submissionData = {
      username: username || "Anonymous", // Default to "Anonymous" if empty
      restaurant_name: restaurantName,
      menu_name: menuName,
      menu_category: menuCategory,
      menu_rating: menuRating,
      menu_price: menuPrice,
      comment: comment,
      image_url: imageUrl, // Ensure an empty string if no image
    };

    console.log("Submitting Data:", submissionData);

    try {
      const response = await fetch("http://localhost:8000/submit", {
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
      setShowModal(true);

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
    } catch (error) {
      console.error("Error submitting form:", error);

      // FAILURE: Show modal but DO NOT reset the form
      setIsSubmitSuccess(false);
      setShowModal(true);
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
    <div>
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

        <div className="form__group">
          <label htmlFor="restaurant_name" className="form__label">
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurant_name"
            name="restaurant_name"
            className="form__input"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            // required
          />
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

        <div className="form__group">
          <label htmlFor="menu_category" className="form__label">
            Menu Category
          </label>
          <select 
            id="menu_category" 
            name="menu_category" 
            className="form__input"
            value={menuCategory}
            onChange={(e) => setMenuCategory(e.target.value)}
            >
            <option value="">Select a category</option>
            {Object.entries(MENU_CATEGORIES).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
            ))}
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
          <button type="button" className="button" onClick={handleUploadImage}>Upload</button>
        </div>

        <button className="button" type="submit">
          Submit
        </button>
      </form>

      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            {isSubmitSuccess ? (
              <div>
                <img src={SuccessIcon} alt="Success" className="modal-icon" />
                <h3 className="modal-title-success">Submission Successful!</h3>
                <p className="modal-text">Your review has been submitted successfully.</p>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            ) : (
              <div>
                <img src={FailIcon} alt="Fail" className="modal-icon" />
                <h3 className="modal-title-fail">Submission Failed</h3>
                <p className="modal-text">There was an error submitting your review. Please try again.</p>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
