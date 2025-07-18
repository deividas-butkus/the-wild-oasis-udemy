import { formatDistance, parseISO, differenceInDays } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value,
  );

export const categorizeDuration = (numNights) => {
  if (numNights === 1) return "1 night";
  if (numNights === 2) return "2 nights";
  if (numNights === 3) return "3 nights";
  if ([4, 5].includes(numNights)) return "4-5 nights";
  if ([6, 7].includes(numNights)) return "6-7 nights";
  if (numNights >= 8 && numNights <= 14) return "8-14 nights";
  if (numNights >= 15 && numNights <= 21) return "15-21 nights";
  if (numNights >= 21) return "21+ nights";
  return null;
};

export const prepareDurationData = (startData, stays) => {
  const durationCounts = {};
  
  stays.forEach(stay => {
    const category = categorizeDuration(stay.numNights);
    if (category) {
      durationCounts[category] = (durationCounts[category] || 0) + 1;
    }
  });

  return startData
    .map(item => ({
      ...item,
      value: durationCounts[item.duration] || 0,
    }))
    .filter(item => item.value > 0);
};
