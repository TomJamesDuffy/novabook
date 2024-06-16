import moment from "moment";

export const parseDate = (isoDateString: string) =>
  moment(isoDateString).toDate();

export const formatDateToUTC = (date: Date) =>
  moment(date).utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
