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

export function getDateenUSFormat(inputDate){
  const dateObject = new Date(inputDate);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return  dateObject.toLocaleDateString('en-US', options);
}

export function dateDiff(startDate, endDate) {
    const diffInMs = new Date(endDate) - new Date(startDate);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const diffInYears = Math.floor(diffInDays / 365);
    const diffInMonths = Math.floor((diffInDays - diffInYears * 365) / 30.44);
    const diffInRemainingDays = Math.floor(diffInDays - diffInYears * 365 - diffInMonths * 30.44);

    let result = '';

    if (diffInYears > 0) {
        result += `${diffInYears}Y-`;
    }

    if (diffInMonths > 0) {
        result += `${diffInMonths}M-`;
    }

    if (diffInRemainingDays > 0) {
        result += `${diffInRemainingDays}D`;
    }

    // Remove trailing dash if present
    if (result.endsWith('-')) {
        result = result.slice(0, -1);
    }

    return result;
}
