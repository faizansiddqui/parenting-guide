// src/app/lib/webinar.js
const IST_TIME_ZONE = "Asia/Kolkata";
const SUNDAY = 0;
const THURSDAY = 4;
const SATURDAY = 6;
const SATURDAY_CUTOFF_HOUR = 18;
const WEBINAR_UTC_HOUR = 14;
const WEBINAR_UTC_MINUTE = 30;
const MORNING_REMINDER_UTC_HOUR = 3;
const MORNING_REMINDER_UTC_MINUTE = 30;

function getIstDateParts(date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
  };
}

export function getNextWebinarDate(now = new Date()) {
  const current = getIstDateParts(now);
  const currentCalendarDate = new Date(Date.UTC(current.year, current.month - 1, current.day));
  const currentDay = currentCalendarDate.getUTCDay();
  const excludeTomorrowSunday =
    currentDay === SATURDAY && current.hour >= SATURDAY_CUTOFF_HOUR;

  for (let dayOffset = 1; dayOffset <= 7; dayOffset += 1) {
    const candidate = new Date(currentCalendarDate);
    candidate.setUTCDate(candidate.getUTCDate() + dayOffset);
    const candidateDay = candidate.getUTCDay();

    if (candidateDay !== SUNDAY && candidateDay !== THURSDAY) continue;
    if (excludeTomorrowSunday && dayOffset === 1 && candidateDay === SUNDAY) continue;

    return new Date(
      Date.UTC(
        candidate.getUTCFullYear(),
        candidate.getUTCMonth(),
        candidate.getUTCDate(),
        WEBINAR_UTC_HOUR,
        WEBINAR_UTC_MINUTE,
      ),
    );
  }

  throw new Error("Unable to calculate the next webinar date");
}

export function getMorningReminderDate(webinarDT) {
  const webinar = getIstDateParts(webinarDT);
  return new Date(
    Date.UTC(
      webinar.year,
      webinar.month - 1,
      webinar.day,
      MORNING_REMINDER_UTC_HOUR,
      MORNING_REMINDER_UTC_MINUTE,
    ),
  );
}

export function formatWebinarParts(webinarDT) {
  const webinarDay = webinarDT.toLocaleDateString("en-IN", {
    timeZone: IST_TIME_ZONE,
    weekday: "long",
  });

  const webinarDate = webinarDT.toLocaleDateString("en-IN", {
    timeZone: IST_TIME_ZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const webinarTime = webinarDT.toLocaleTimeString("en-IN", {
    timeZone: IST_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { webinarDay, webinarDate, webinarTime };
}
