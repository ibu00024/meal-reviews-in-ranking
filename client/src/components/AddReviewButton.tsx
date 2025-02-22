import React from "react";
import "../index.css"

interface AddReviewButtonProps {
    onClick: () => void;
}

const AddReviewButton: React.FC<AddReviewButtonProps> = ({ onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            Add Review
        </button>
    );
};

export default AddReviewButton;