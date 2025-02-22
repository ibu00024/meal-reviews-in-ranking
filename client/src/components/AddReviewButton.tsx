import React from "react";
import "../index.css"

interface AddReviewButtonProps {
    onClick: () => void;
}

const AddReviewButton: React.FC<AddReviewButtonProps> = ({ onClick }) => {
    return (
        <button className="navbar-button" onClick={onClick}>
            Add Review
        </button>
    );
};

export default AddReviewButton;