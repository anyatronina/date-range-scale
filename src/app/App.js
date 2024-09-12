import { useState } from "react";
import "./App.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DateRangeScale from "./components/DateRangeScale";

function App() {
  const [dateValue, setDateValue] = useState([null, null]); // мин и макс даты
  const [datePicked, setDatePicked] = useState([null, null]); // выбранные даты

  const yearBegin = new Date(dateValue[0]).getFullYear();

  const [value, setValue] = useState([
    (new Date(datePicked[0]).getFullYear() - yearBegin) * 12 +
      new Date(datePicked[0]).getMonth(),
    (new Date(datePicked[1]).getFullYear() - yearBegin) * 12 +
      new Date(datePicked[1]).getMonth(),
  ]);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleChangeMin = (newValue) => {
    setDateValue((prevState) => [newValue, prevState[1]]);
    setValue(() => [
      (new Date(datePicked[0]).getFullYear() -
        new Date(newValue).getFullYear()) *
        12 +
        new Date(datePicked[0]).getMonth(),
      (new Date(datePicked[1]).getFullYear() -
        new Date(newValue).getFullYear()) *
        12 +
        new Date(datePicked[1]).getMonth(),
    ]);
  };

  const handleChangeMax = (newValue) => {
    setDateValue((prevState) => [prevState[0], newValue]);
  };

  const handleChangeRangeMin = (newValue) => {
    setDatePicked((prevState) => [newValue, prevState[1]]);
    setValue((prevState) => [
      (new Date(newValue).getFullYear() - yearBegin) * 12 +
        new Date(newValue).getMonth(),
      prevState[1],
    ]);
  };

  const handleChangeRangeMax = (newValue) => {
    setDatePicked((prevState) => [prevState[0], newValue]);
    setValue((prevState) => [
      prevState[0],
      (new Date(newValue).getFullYear() - yearBegin) * 12 +
        new Date(newValue).getMonth(),
    ]);
  };

  return (
    <div style={{ margin: "100px 50px 0 50px" }}>
      <div style={{ marginBottom: "10px" }} className="datePiker-column">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="мин"
              value={dateValue[0]}
              onChange={handleChangeMin}
            />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="макс"
              value={dateValue[1]}
              onChange={handleChangeMax}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div style={{ marginBottom: "100px" }} className="datePiker-column">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="от"
              value={datePicked[0]}
              onChange={handleChangeRangeMin}
            />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="до"
              value={datePicked[1]}
              onChange={handleChangeRangeMax}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      {dateValue[0] && dateValue[1] && datePicked[0] && datePicked[1] && (
        <DateRangeScale
          dateValue={dateValue}
          datePicked={datePicked}
          onChange={handleChange}
          value={value}
        />
      )}
    </div>
  );
}

export default App;
