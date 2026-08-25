// src/utils/formatDate.ts
type DateStyle = "long" | "medium" | "short" | "compact" | "numeric"

const dateStyles: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  long: { dateStyle: "long" },
  medium: { dateStyle: "medium" },
  short: { dateStyle: "short" },
  compact: { year: "numeric", month: "short" },
  numeric: { year: "numeric", month: "2-digit", day: "2-digit" },
}

export function formatDate(
  date: Date,
  style: DateStyle = "long",
  options?: Intl.DateTimeFormatOptions,
  locale: string = "en-US"
) {
  if (style === "compact") {
    const month = new Intl.DateTimeFormat(locale, { timeZone: "UTC", month: "short" }).format(date).replace('.', '');
    const year = new Intl.DateTimeFormat(locale, { timeZone: "UTC", year: "numeric" }).format(date);
    return `${month}/${year}`;
  }

  return new Intl.DateTimeFormat(locale, {
    timeZone: "UTC",
    ...dateStyles[style],
    ...options,
  }).format(date)
}
