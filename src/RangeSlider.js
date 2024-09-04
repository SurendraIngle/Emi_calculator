import React, { useState, useCallback } from "react";
import "./Sliider.css";

const RangeSlider = ({
  min,
  max,
  step,
  initialValue,
  label,
  sign,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue || min);
  const [inputValue, setInputValue] = useState(initialValue || min);

  const handleSliderChange = useCallback(
    (e) => {
      const newValue = parseFloat(e.target.value);
      setValue(newValue);
      setInputValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e) => {
      const newValue = parseFloat(e.target.value);
      setInputValue(newValue);
      setValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  const handleInputBlur = useCallback(() => {
    const newValue = Math.max(min, parseFloat(inputValue) || value);
    setValue(newValue);
    setInputValue(newValue);
  }, [inputValue, value, min]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="range-slider">
      <div className="range-slider__header">
        <label className="range-slider__label">{label}</label>
        <input
          type="number"
          value={inputValue}
          step={step}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="range-slider__input"
        />
      </div>
      <div className="range-slider__container">
        <div className="range-slider__value" style={{ left: `${percentage}%` }}>
          {value.toLocaleString()} {sign}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="range-slider__slider"
        />
        <div className="range-slider__limits">
          <span>
            {min.toLocaleString()} {sign}
          </span>
          <span>
            {max.toLocaleString()} {sign}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;

