import * as Yup from "yup";

export const discountSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Discount name must be at least 3 characters or more.")
    .required("Discount name is required."),
  discountType: Yup.string().required("Discount type is required.").nullable(),
  type: Yup.string().required("Type is required.").nullable(),
  value: Yup.number().min(1).required("Discount value is required").nullable(),
  start_date: date()
    .required("Start date is required.")
    .nullable("Invalid date")
    .test(
      "start-date-validation",
      "Start date cannot be older than today",
      function (value) {
        if (!value) {
          return true;
        }
        // Set hours, minutes, seconds, and milliseconds to 0 for today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Compare the start_date with today's date
        return new Date(value) >= today;
      }
    ),
  end_date: Yup.string()
    .required("End date is required.")
    .nullable()
    .test(
      "end-date-validation",
      "End date cannot be older than start date",
      function (value) {
        const { start_date } = this.parent;
        // If either start_date or end_date is not a valid date, return true to skip the validation
        if (!start_date || !value) {
          return true;
        }
        // Compare start_date and end_date
        return new Date(value) >= new Date(start_date);
      }
    ),
});
