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
  const [menuRating, setMenuRating] = useState(0); // Store rating as a number
  const [hoverRating, setHoverRating] = useState(0); // For hover effect

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    if (!formData.get("username")) {
      formData.set("username", "Anonymous");
    }

    formData.set("menu_rating", menuRating.toString());

    const data = Object.fromEntries(formData);
    console.log(data);
    form.reset();

    setIsSubmitSuccess(true);
    setShowModal(true);
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
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        {/* Half-Star Rating Component with Hover Fix */}
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
