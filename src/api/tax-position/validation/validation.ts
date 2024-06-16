import { TaxPositionQueryType } from "../types";
import { ValidationError } from "../../../utils/ValidationError";

export const validateTransaction = (query: TaxPositionQueryType) => {
  const { date } = query;

  if (!date) {
    throw new ValidationError("Date parameter is required.");
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  if (!dateRegex.test(date)) {
    throw new ValidationError(
      "Date parameter must be in the format 'YYYY-MM-DDTHH:MM:SSZ'."
    );
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    throw new ValidationError("Date parameter is not a valid date.");
  }
};
