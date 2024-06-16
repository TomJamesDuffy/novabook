import { validateTransaction } from "./validation";
import { ValidationError } from "../../../utils/ValidationError";

describe("validateTransaction", () => {
  it("should throw an error if the date format is incorrect", () => {
    const query = { date: "2023-08-22" };

    expect(() => validateTransaction(query)).toThrow(ValidationError);
    expect(() => validateTransaction(query)).toThrow(
      "Date parameter must be in the format 'YYYY-MM-DDTHH:MM:SSZ'."
    );
  });

  it("should throw an error if the date is not a valid date", () => {
    const query = { date: "2023-13-22T17:29:39Z" };

    expect(() => validateTransaction(query)).toThrow(ValidationError);
    expect(() => validateTransaction(query)).toThrow(
      "Date parameter is not a valid date."
    );
  });

  it("should not throw an error for a valid date", () => {
    const query = { date: "2023-08-22T17:29:39Z" };

    expect(() => validateTransaction(query)).not.toThrow();
  });
});
