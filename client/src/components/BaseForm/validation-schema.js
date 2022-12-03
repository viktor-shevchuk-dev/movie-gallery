import * as yup from "yup";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  releaseDate: yup.string().required("Release date is required"),
  posterPath: yup.string().url("Invalid url").required("Url is required"),
  voteAverage: yup
    .number()
    .max(100, "Rating must be less than or equl to 100")
    .required("Rating is required"),
  genres: yup.array().min(1, "At least one genre is required"),
  runtime: yup
    .number("Runtime must be a number")
    .min(0, "Runtime must be 0 minutes or more")
    .required("Runtime is required"),
  overview: yup.string().required("Description is required"),
});

export default validationSchema;
