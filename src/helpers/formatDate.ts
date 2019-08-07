import { DateTime } from "luxon";

function formatDate(
  dateString,
  {
    parseFormat = "yyyy-MM-dd HH:mm",
    format = "d. LLLL yyyy"
  }: { parseFormat?: string; format?: string } = {}
): string {
  return DateTime.fromFormat(dateString, parseFormat)
    .setLocale("de")
    .toFormat(format);
}

export default formatDate;
