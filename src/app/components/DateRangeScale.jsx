import React, { useState } from "react";
import { MONTHS_FULL } from "../constants/constant";
import { monthMarksFunc, yearMarksFunc } from "../utils/marksGenerate";
import Slider from "@mui/material/Slider";

const DateRangeScale = ({ dateValue, onChange, value }) => {
  const [view, setView] = useState("months");

  const yearBegin = new Date(dateValue[0]).getFullYear();
  const yearEnd = new Date(dateValue[1]).getFullYear();
  const countMonths = (yearEnd - yearBegin + 1) * 12;

  const monthMarks = monthMarksFunc(countMonths, yearBegin);
  const yearMarks = yearMarksFunc(countMonths, yearBegin);

  const handleClick = () => {
    setView((prevState) => (prevState === "months" ? "years" : "months"));
  };

  const slotProps = {
    mark: { className: "mark" },
    valueLabel: { className: "valueLabel" },
    thumb: { className: "thumb" },
    track: { className: "track" },
    root: { className: "root" },
    rail: { className: "rail" },
    markLabel: { className: "markLabel" },
  };

  const valueText = (value) => {
    const month = value % 12;
    const year = yearBegin + Math.trunc(value / 12);

    return (
      <div style={{ textAlign: "center" }}>
        {MONTHS_FULL[month]}
        <br />
        {year}
      </div>
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="labelHide">
        <button
          className={`btn ${view === "years" && "btn-active"}`}
          onClick={handleClick}
        >
          Все года
        </button>
        <button
          className={`btn ${view === "months" && "btn-active"}`}
          onClick={handleClick}
        >
          Месяцы
        </button>
      </div>

      {view === "years" && (
        <Slider
          min={0}
          max={countMonths}
          value={value}
          onChange={onChange}
          step={1}
          marks={yearMarks}
          valueLabelDisplay="on"
          valueLabelFormat={valueText}
          slotProps={slotProps}
        />
      )}

      {view === "months" && (
        <Slider
          min={0}
          max={countMonths}
          value={value}
          onChange={onChange}
          step={1}
          marks={monthMarks}
          valueLabelDisplay="on"
          valueLabelFormat={valueText}
          slotProps={slotProps}
        />
      )}
    </div>
  );
};

export default DateRangeScale;
