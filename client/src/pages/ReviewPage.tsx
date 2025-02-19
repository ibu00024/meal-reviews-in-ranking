import React, { useState } from "react";
import { Modal } from "@mui/material";
import "../formStyles.css";
import SuccessIcon from "../assets/success-icon.svg";
import FailIcon from "../assets/fail-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt, faStar as regularStar } from "@fortawesome/free-solid-svg-icons";

export const FormDataForm = () => {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [menuRating, setMenuRating] = useState(0); // Store selected rating
  const [hoverRating, setHoverRating] = useState(0); // Store hovered rating
  const [imageFile, setImageFile] = useState<File | null>(null); // Store single image
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Store uploaded image URL
  
  // Define menu categories as a constant object
  const MENU_CATEGORIES: { [key: number]: string } = {
    1: "Appetizer",
    2: "Main Course",
    3: "Dessert",
    4: "Beverage",
  };
  

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    if (!formData.get("username")) {
      formData.set("username", "Anonymous");
    }

//  Log form data before submitting
  console.log("Form Data (Before Sending):");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await fetch("http://localhost:8000/submit", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.log("Server responded with an error status:", response.status);
      throw new Error(`Submission failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log("Server Response:", result);

    // Make sure success state updates before opening modal
    setIsSubmitSuccess(true);
    setShowModal(true);

  } catch (error) {
    console.error("Error submitting form:", error);

    // Ensure fail modal is set correctly
    setIsSubmitSuccess(false);
    
    // Delay showing modal to ensure state updates correctly
    setTimeout(() => {
      setShowModal(true);
      console.log("Modal State (after update):", showModal, "Submission Success:", isSubmitSuccess);
    }, 50);
  }

  // Convert menu category key from string to number
  const categoryKey = formData.get("menu_category") as string;
  if (categoryKey) {
    formData.set("menu_category", parseInt(categoryKey, 10).toString());
  }


    formData.set("menu_rating", menuRating.toString()); // Store as number
    if (imageUrl) formData.set("image", imageUrl); // Store image URL

    const data = Object.fromEntries(formData);
    console.log("Final Form Data:", data);

    form.reset();
    setImageFile(null);
    setImageUrl(null);
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

  /** Handle image selection */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;

    setImageFile(file);
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

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      setImageUrl(result.url); // Store uploaded image URL
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload the image.");
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
            className="form__input"
            placeholder="Anonymous"
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
            // required
          />
        </div>

        <div className="form__group">
          <label htmlFor="menu_category" className="form__label">
            Menu Category
          </label>
          <select id="menu_category" name="menu_category" className="form__input">
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
          <input type="hidden" name="menu_rating" value={menuRating} />
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
            // required
          ></textarea>
        </div>

        {/* Single Image Upload */}
        <div className="form__group">
          <label htmlFor="image_upload" className="form__label">Upload an Image</label>
          <input type="file" id="image_upload" name="image" className="form__input" accept="image/*" onChange={handleImageChange} />
          {imageFile && (
            <div className="image-preview">
              <img src={URL.createObjectURL(imageFile)} alt="Preview" className="preview-img" />
            </div>
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
