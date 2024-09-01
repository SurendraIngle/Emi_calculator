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

// const RangeSlider = ({ min, max, step, initialValue, label,sign,onChange }) => {
//   const [value, setValue] = useState(initialValue || min);
//   const [inputValue, setInputValue] = useState(initialValue || min);

//   const handleSliderChange = (e) => {
//   //  console.log("target", e.target.value);
//     const newValue = parseFloat(e.target.value);
//     setValue(newValue);
//     setInputValue(newValue);
//     if (onChange) {
//    //   console.log("handleSliderChange", newValue);
//       onChange(newValue); // Call the callback with the new value
//     }
//   };

//   const handleInputChange = (e) => {
//     const newValue = parseFloat(e.target.value);
//     setInputValue(newValue);
//     setValue(newValue);
//     if (onChange) {
//       onChange(newValue); // Call the callback with the new value
//     }
//   };

//   const handleInputBlur = () => {
//   //  console.log("inputValue", inputValue);
//     let newValue = parseFloat(inputValue);

//     if (isNaN(newValue)) {
//       newValue = value;
//     } else {
//       newValue = Math.max(min, newValue);
//     }

//     setValue(newValue);
//     setInputValue(newValue);
//   };

//   return (
//     <div style={{ width: "100%", padding: "20px" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: "10px",
//         }}
//       >
//         <label style={{ fontWeight: "bold" }}>{label}</label>
//         <input
//           type="number"
//           value={inputValue}
//           step={step}
//           onChange={handleInputChange}
//           onBlur={handleInputBlur}
//           style={{
//             padding: "5px",
//             width: "120px",
//             fontSize: "16px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//             textAlign: "right",
//             marginRight: "20%",
//           }}
//         />
//       </div>
//       <div style={{ width: "80%", position: "relative" }}>
//         <div
//           style={{
//             position: "absolute",
//             top: "-35px",
//             left: `${((value - min) / (max - min)) * 100}%`,
//             transform: "translateX(-50%)",
//             backgroundColor: "#f5f5f5",
//             borderRadius: "8px",
//             padding: "5px 10px",
//             boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//             fontWeight: "bold",
//           }}
//         >
//           {value.toLocaleString()} {sign}
//         </div>
//         <input
//           type="range"
//           min={min}
//           max={max}
//           step={step}
//           value={value}
//           onChange={handleSliderChange}
//           style={{ width: "100%" }}
//         />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginTop: "8px",
//           }}
//         >
//           <span>{min.toLocaleString()} {sign}</span>
//           <span>{max.toLocaleString()} {sign}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RangeSlider;
