interface UseIntlDateTime {
  formatDate: (date: Date | number) => string;
  formatTime: (date: Date | number) => string;
}

export const useIntlDateTime = (locale = "RO-ro"): UseIntlDateTime => {
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "2-digit",
  });

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    formatDate: (date: Date | number) => dateFormatter.format(date),
    formatTime: (date: Date | number) => timeFormatter.format(date),
  };
};
