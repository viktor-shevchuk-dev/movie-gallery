import { useEffect } from "react";
import { Button, BaseSelect } from "components";

import { useInput, useLocalStorage } from "hooks";

import { isBlank, validateUrl, isNumber, validateSelect } from "validators";

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

  const {
    value: titleValue,
    isValid: isTitleValid,
    hasError: hasTitleError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isBlank);

  const {
    value: urlValue,
    isValid: isURLValid,
    hasError: hasURLError,
    valueChangeHandler: urlChangeHandler,
    inputBlurHandler: urlBlurHandler,
    reset: resetURL,
  } = useInput(validateUrl);

  const {
    value: ratingValue,
    isValid: isRatingValid,
    hasError: hasRatingError,
    valueChangeHandler: ratingChangeHandler,
    inputBlurHandler: ratingBlurHandler,
    reset: resetRating,
  } = useInput(isNumber);

  const {
    value: genreValue,
    isValid: isGenreValid,
    hasError: hasGenreError,
    valueChangeHandler: genreChangeHandler,
    inputBlurHandler: genreBlurHandler,
    reset: resetGenre,
  } = useInput(validateSelect);

  const {
    value: runtimeValue,
    isValid: isRuntimeValid,
    hasError: hasRuntimeError,
    valueChangeHandler: runtimeChangeHandler,
    inputBlurHandler: runtimeBlurHandler,
    reset: resetRuntime,
  } = useInput(isBlank);

  const {
    value: descriptionValue,
    isValid: isDescriptionValid,
    hasError: hasDescriptionError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isBlank);

  const {
    value: releaseDateValue,
    isValid: isReleaseDateValid,
    hasError: hasReleaseDateError,
    inputBlurHandler: releaseDateBlurHandler,
    valueChangeHandler: releaseDateChangeHandler,
    reset: resetReleaseDate,
  } = useInput(isBlank);

  const isFormValid =
    isReleaseDateValid &&
    isDescriptionValid &&
    isRuntimeValid &&
    isGenreValid &&
    isRatingValid &&
    isTitleValid &&
    isURLValid
      ? true
      : false;

  const resetFields = () => {
    resetTitle();
    resetURL();
    resetRating();
    resetGenre();
    resetRuntime();
    resetDescription();
    resetReleaseDate();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    console.log({
      titleValue,
      urlValue,
      ratingValue,
      genreValue,
      runtimeValue,
      descriptionValue,
      releaseDateValue,
    });

    resetFields();
  };

  const formControlClasses = (hasError) =>
    hasError
      ? `${classes["form-control"]} ${classes.invalid}`
      : classes["form-control"];

  const firstNameClasses = formControlClasses(hasTitleError);
  const urlClasses = formControlClasses(hasURLError);
  const ratingClasses = formControlClasses(hasRatingError);
  const genreClasses = formControlClasses(hasGenreError);
  const runtimeClasses = formControlClasses(hasRuntimeError);
  const descriptionClasses = formControlClasses(hasDescriptionError);
  const releaseDateClasses = formControlClasses(hasReleaseDateError);

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["control-group"]}>
        <div className={firstNameClasses}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={titleValue}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            placeholder="Name of the movie"
          />
          {hasTitleError && (
            <p className={classes["error-text"]}>Title is mandatory.</p>
          )}
        </div>
        <div className={releaseDateClasses}>
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            onChange={releaseDateChangeHandler}
            onBlur={releaseDateBlurHandler}
            value={releaseDateValue}
          ></input>
          {hasReleaseDateError && (
            <p className={classes["error-text"]}>Release date is mandatory.</p>
          )}
        </div>
      </div>
      <div className={classes["control-group"]}>
        <div className={urlClasses}>
          <label htmlFor="url">Movie URL</label>
          <input
            type="url"
            id="url"
            value={urlValue}
            onChange={urlChangeHandler}
            onBlur={urlBlurHandler}
            placeholder="https://"
          />
          {hasURLError && (
            <p className={classes["error-text"]}>URL should be valid.</p>
          )}
        </div>
        <div className={ratingClasses}>
          <label htmlFor="rating">Movie URL</label>
          <input
            type="number"
            id="rating"
            value={ratingValue}
            onChange={ratingChangeHandler}
            onBlur={ratingBlurHandler}
            placeholder="7.8"
          />
          {hasRatingError && (
            <p className={classes["error-text"]}>Rating should be a number. </p>
          )}
        </div>
      </div>
      <div className={classes["control-group"]}>
        <div className={genreClasses}>
          <label htmlFor="genre">Genre</label>
          <BaseSelect
            options={genresOptionsList}
            isMulti
            id="genre"
            value={genreValue}
            onChange={genreChangeHandler}
            onBlur={genreBlurHandler}
            placeholder="Select Genre"
            extraClassName={classes.select}
          />
          {hasGenreError && (
            <p className={classes["error-text"]}>Genre is mandatory.</p>
          )}
        </div>
        <div className={runtimeClasses}>
          <label htmlFor="runtime">Runtime</label>
          <input
            type="text"
            id="runtime"
            value={runtimeValue}
            onChange={runtimeChangeHandler}
            onBlur={runtimeBlurHandler}
            placeholder="Minutes"
          />
          {hasRuntimeError && (
            <p className={classes["error-text"]}>Runtime is mandatory.</p>
          )}
        </div>
      </div>

      <div className={descriptionClasses}>
        <label htmlFor="description">Overview</label>
        <textarea
          id="description"
          value={descriptionValue}
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
          placeholder="Movie Description"
        />
        {hasDescriptionError && (
          <p className={classes["error-text"]}>Description is mandatory.</p>
        )}
      </div>

      <div className={classes["form-actions"]}>
        <Button
          primary
          inverted
          extraClassName={classes["confirm-button"]}
          onClick={resetFields}
        >
          Reset
        </Button>
        <Button
          type="submit"
          extraClassName={classes["submit-button"]}
          disabled={!isFormValid}
          primary
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
