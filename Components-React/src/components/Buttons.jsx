import React from 'react';

const Button = ({ text, className, onClick }) => {
    const buttonClass = `btn ${className || ''}`.trim();

    return (
        <button className={buttonClass} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
