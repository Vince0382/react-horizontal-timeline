
export const day = 1000 * 60 * 60 * 24;

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

export const dayDiff = (d1, d2) => {
    return Math.round(Math.abs(( new Date(d1).getTime() - new Date(d2).getTime() ) / day ));
}

export const timeDiff = (d1, d2) => {
    return new Date(d1).getTime() - new Date(d2).getTime();
}

export const randomRGBAColor = ( alpha, min, max ) => {
    const minByte = min ? min : 0;
    const maxByte = max ? max : 255;
    const randomNumber = () => Math.floor(Math.random() * (maxByte - minByte + 1) + minByte);
    return `rgba(${[randomNumber(), randomNumber(), randomNumber(), alpha].join(',')})`
}

export const rgbaFromArray = (arr, alpha) => {
    if ( !arr || arr.length !== 3 ) return null;
    return `rgba(${arr.join(',')}, ${alpha ? alpha : 1})`;
}
