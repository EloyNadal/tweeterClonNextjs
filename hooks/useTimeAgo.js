import { useEffect, useState } from "react";

let isRelativeTimeFormatSuported = typeof Intl !== "undefined" && Intl.RelativeTimeFormat;
let isDateTimeFormatSupported = typeof Intl !== "undefined" && Intl.DateTimeFormat;
//para comprobar compativilidad
/* isRelativeTimeFormatSuported = false;
isDateTimeFormatSupported = false; */

const DATE_UNITS = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
];

const getDateDiffs = timestamp => {
    const now = Date.now();
    const elapsed = (timestamp - now) / 1000;

    for (const [unit, secondsInUnit] of DATE_UNITS) {
        if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
            const value = Math.round(elapsed / secondsInUnit);
            return { value, unit }
        }
    }

}

export default function useTimeAgo(timestamp) {

    const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp));

    useEffect(() => {

        if (isRelativeTimeFormatSuported) {
            const timeout = setInterval(() => {
                const newTimeAgo = getDateDiffs(timestamp);
                setTimeago(newTimeAgo);
            }, 1000 * 3600)

            return () => clearInterval(timeout);
        }

    }, [timestamp])

    if (!isRelativeTimeFormatSuported) {
        return formatDate(timestamp, {language : 'es'});
    }

    const { value, unit } = timeago;
    const rtf = new Intl.RelativeTimeFormat('es', { style: "long" })
    return rtf.format(value, unit);
}

export const formatDate = (timestamp, { language = 'es' } = {}) => {
    const date = new Date(timestamp);

    if (!isDateTimeFormatSupported) {
        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        }

        return date.toLocaleDateString(language, options);
    }

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }

    return new Intl.DateTimeFormat(language, options).format(date);
}