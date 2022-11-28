import { useEffect } from "react";
import classNames from "classnames/bind";
import { Formik, Field } from "formik";

import { Button, FormikSelect } from "components";

import { validateUrl, isNumber, validateSelect } from "validators";

import classes from "./Form.module.css";

const genresOptionsList = [
  { value: "documentary", label: "Documentary" },
  { value: "comedy", label: "Comedy" },
  { value: "horror", label: "Horror" },
  { value: "crime", label: "Crime" },
];

export const Form = ({ movieId }) => {
  useEffect(() => {
    const fetchMovieData = () => null;

    if (movieId) fetchMovieData(movieId);
  }, [movieId]);

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 200);
  };

  const formControlClasses = (invalid) =>
    classNames.bind(classes)("form-control", { invalid });

  const initialValues = {
    title: "",
    releaseDate: "",
    url: "",
    rating: "",
    genre: [],
    runtime: "",
    description: "",
  };

  const validate = ({
    title,
    releaseDate,
    url,
    rating,
    genre,
    runtime,
    description,
  }) => {
    const errors = {};

    if (!title) errors.title = "Title is mandatory.";

    if (!releaseDate) errors.releaseDate = "Release date is mandatory.";

    if (!url) errors.url = "URL is mandatory.";
    else if (!validateUrl(url)) errors.url = "URL should be valid.";

    if (!rating) errors.rating = "Rating is mandatory.";
    else if (!isNumber(rating)) errors.rating = "Rating should be a number.";

    if (!validateSelect(genre)) errors.genre = "Genre is mandatory.";

    if (!runtime) errors.runtime = "Runtime is mandatory.";

    if (!description) errors.description = "Description is mandatory.";

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitHandler}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes["control-group"]}>
            <div className={formControlClasses(errors.title && touched.title)}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder="Name of the movie"
              />
              {errors.title && touched.title && (
                <p className={classes["error-text"]}>{errors.title}</p>
              )}
            </div>

            <div
              className={formControlClasses(
                errors.releaseDate && touched.releaseDate
              )}
            >
              <label htmlFor="releaseDate">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                id="releaseDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.releaseDate}
              />
              {errors.releaseDate && touched.releaseDate && (
                <p className={classes["error-text"]}>{errors.releaseDate}</p>
              )}
            </div>
          </div>

          <div className={classes["control-group"]}>
            <div className={formControlClasses(errors.url && touched.url)}>
              <label htmlFor="url">Movie URL</label>
              <input
                type="url"
                name="url"
                id="url"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.url}
                placeholder="https://"
              />
              {errors.url && touched.url && (
                <p className={classes["error-text"]}>{errors.url}</p>
              )}
            </div>

            <div
              className={formControlClasses(errors.rating && touched.rating)}
            >
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                name="rating"
                id="rating"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rating}
                placeholder="7.8"
              />
              {errors.rating && touched.rating && (
                <p className={classes["error-text"]}>{errors.rating}</p>
              )}
            </div>
          </div>

          <div className={classes["control-group"]}>
            <div className={formControlClasses(errors.genre && touched.genre)}>
              <label htmlFor="genre">Genre</label>
              <Field
                options={genresOptionsList}
                isMulti
                name="genre"
                id="genre"
                component={FormikSelect}
                placeholder="Select Genre"
                extraClassName={classes.select}
              />
              {errors.genre && touched.genre && (
                <p className={classes["error-text"]}>{errors.genre}</p>
              )}
            </div>

            <div
              className={formControlClasses(errors.runtime && touched.runtime)}
            >
              <label htmlFor="runtime">Runtime</label>
              <input
                type="text"
                name="runtime"
                id="runtime"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.runtime}
                placeholder="Minutes"
              />
              {errors.runtime && touched.runtime && (
                <p className={classes["error-text"]}>{errors.runtime}</p>
              )}
            </div>
          </div>

          <div
            className={formControlClasses(
              errors.description && touched.description
            )}
          >
            <label htmlFor="description">Overview</label>
            <textarea
              name="description"
              id="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Movie Description"
            />
            {errors.description && touched.description && (
              <p className={classes["error-text"]}>{errors.description}</p>
            )}
          </div>

          <div className={classes["form-actions"]}>
            <Button
              primary
              inverted
              extraClassName={classes["confirm-button"]}
              onClick={resetForm}
            >
              Reset
            </Button>
            <Button
              type="submit"
              extraClassName={classes["submit-button"]}
              disabled={isSubmitting}
              primary
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
