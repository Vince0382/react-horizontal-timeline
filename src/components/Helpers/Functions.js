
export const getDaysInMonth = ( month, year ) => {
   return new Date(year, month, 0).getDate();
}

export const monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months + 1;
}