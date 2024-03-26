import * as yup from "yup";

export const searchFormSchema = yup
  .object()
  .shape({
    search: yup.string().required("Query search is required"),
    yearStart: yup.string().optional()
    .matches(new RegExp("^[0-9]*$"), {
      message: "Must be only digits",
    }),
    yearEnd: yup.string().optional().matches(new RegExp("^[0-9]*$"), {
      message: "Must be only digits",
    }),
  })
  .required();
