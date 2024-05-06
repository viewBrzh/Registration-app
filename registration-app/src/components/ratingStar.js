import React, { useState } from 'react';

const RatingStar = ({ defaultValue = 0, onChange }) => {
  const [value, setValue] = useState(defaultValue);

  const handleClick = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating-star">
      {stars.map((starValue) => (
        <span
          key={starValue}
          className={`star ${value >= starValue ? 'filled' : ''}`}
          onClick={() => handleClick(starValue)}
        >
          &#9733; {/* Unicode for a star character */}
        </span>
      ))}
    </div>
  );
};

export default RatingStar;
