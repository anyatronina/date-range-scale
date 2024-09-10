import { MONTHS } from "../constants/constant";

export function monthMarksFunc(countMonths, yearBegin) {
  const marks = [];

  for (let i = 0; i <= countMonths; i++) {
    if (i === countMonths) {
      marks.push({
        value: i,
        label: yearBegin + Math.trunc(i / 12),
      });
    } else {
      marks.push({
        value: i,
        label: i % 12 === 0 ? yearBegin + Math.trunc(i / 12) : MONTHS[i % 12],
      });
    }
  }

  return marks;
}

export function yearMarksFunc(countMonths, yearBegin) {
  const marks = [];

  for (let i = 0; i <= countMonths; i++) {
    if (i % 12 === 0) {
      marks.push({
        value: i,
        label: yearBegin + Math.trunc(i / 12),
      });
    }
  }

  return marks;
}
