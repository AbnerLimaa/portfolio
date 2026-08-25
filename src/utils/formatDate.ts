// src/utils/formatDate.ts
type DateStyle = "long" | "medium" | "short" | "compact"

const dateStyles: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  long: { dateStyle: "long" },
  medium: { dateStyle: "medium" },
  short: { dateStyle: "short" },
  compact: { year: "numeric", month: "short" },
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
