import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DateRangePicker } from "react-dates/initialize";

import DayPicker, { DateUtils } from "react-day-picker";

import "react-day-picker/lib/style.css";
import styles from "./calendar.module.scss";
let dateCount = 0;

const CalendarContainer = () => {
  const [focusedInput, setFocusedInput] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const modifiers = { start: from, end: to };

  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const handleDayClick = (day) => {
    if (dateCount <= 1) {
      const range = DateUtils.addDayToRange(day, dateRange);
      setDateRange(range);
    } else if (dateCount > 1) {
      setDateRange({
        from: day,
        to: undefined,
      });

      dateCount = 0;
    }

    console.log("day is ", day);
    console.log("date count is ", dateCount);
    console.log("date range is: ", dateRange);

    dateCount++;
  };

  const handleDayClickIndividual = (day) => {
    if (dateCount % 2 == 0) {
      console.log("even");
      setFrom(day);
    } else {
      console.log("odd");
      setTo(day);
    }
    console.log("date range is: ", from, to);
    dateCount++;
  };
  return (
    <div className={styles.wrapper}>
      /*
      <DayPicker
        numberOfMonths={12}
        className="Selectable"
        selectedDays={[from, { from, to }]}
        modifiers={modifiers}
        onDayClick={handleDayClickIndividual}
      />
      {/* <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={(startDate, endDate) =>
          handleDateRange(startDate, endDate)
        } // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
      /> */}
    </div>
  );
};

export default CalendarContainer;
