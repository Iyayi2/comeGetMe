export default function formatDate({
  date,
  year,
  time,
  weekday,
}: {
      date:  string;
     year?: boolean;
     time?: boolean;
  weekday?: boolean;
}) {
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', hour12: false };
     year && (options.year    = 'numeric');
  weekday && (options.weekday = 'long')
  if (time) {
    options.hour   = 'numeric';
    options.minute = 'numeric';
  }
  const isFormatted = new Date(date);
  return isFormatted.toLocaleString('en-US', options);
}
