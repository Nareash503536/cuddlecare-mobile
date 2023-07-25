import React from "react";

export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function getFormattedTime(time) {
  return time.toISOString().slice(12, 16);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
