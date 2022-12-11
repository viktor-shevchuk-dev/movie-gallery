import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { BaseSelect, Title, Modal, BaseForm, Button } from "components";

import classes from "./MovieCard.module.css";

import { ReactComponent as ShowOptions } from "icons/three-dots.svg";
import { useDeleteMovieMutation } from "services";
import { convertDateToYear } from "converters";

const optionsList = [
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
];

export const MovieCard = ({
  title,
  genres,
  id,
  posterPath,
  releaseDate,
  runtime,
  voteAverage,
  overview,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const ref = useRef(null);
  const [deleteMovieMutation] = useDeleteMovieMutation();
  const [isEditingSuccess, setIsEditingSuccess] = useState(false);
  const [isEditingError, setIsEditingError] = useState(false);

  const year = convertDateToYear(releaseDate);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);

    setIsEditingSuccess(false);
    setIsEditingError(false);
  };

  const optionChangeHandler = (option) => {
    setOptionValue(option);
    setMenuIsOpen((showOptions) => !showOptions);
    toggleModal();
  };

  const toggleMenuIsOpen = (event) => {
    setMenuIsOpen((menuIsOpen) => !menuIsOpen);
    const { current: selectEl } = ref;
    if (!selectEl) return;
    menuIsOpen ? selectEl.blur() : selectEl.focus();
  };

  const handleMovieCardLinkClick = (event) =>
    event.target !== event.currentTarget &&
    ["svg", "DIV", "BUTTON"].includes(event.target.nodeName) &&
    event.preventDefault();

  const deleteMovie = () => deleteMovieMutation(id);

  const editingErrorHandler = (error) => {
    console.log(error);
    setIsEditingError("Sth went wrong.");
  };

  const editingSuccessHandler = (title) =>
    setIsEditingSuccess(`${title} was successfully edited.`);

  let modalBodyContent, modalHeadingContent;

  if (!isEditingSuccess && !isEditingError) {
    if (optionValue.value === "edit") {
      modalHeadingContent = "Edit";
      const movieToEdit = {
        title,
        id,
        posterPath,
        releaseDate,
        overview,
        runtime,
        voteAverage,
        genres: genres.map((genre) => ({
          value: genre.toLowerCase(),
          label: genre,
        })),
      };
      modalBodyContent = (
        <BaseForm
          onEditingError={editingErrorHandler}
          onEditingSuccess={editingSuccessHandler}
          movieToEdit={movieToEdit}
        />
      );
    } else {
      modalHeadingContent = "Delete movie";
      modalBodyContent = (
        <>
          <p>Are you sure you want to delete this movie?</p>
          <Button
            primary
            extraClassName={classes["confirm-button"]}
            onClick={deleteMovie}
          >
            Confirm
          </Button>
        </>
      );
    }
  } else {
    if (isEditingSuccess) modalHeadingContent = isEditingSuccess;
    else if (isEditingError) modalHeadingContent = isEditingError;

    modalBodyContent = (
      <Button primary onClick={toggleModal}>
        OK
      </Button>
    );
  }

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <Title>{modalHeadingContent}</Title>
          {modalBodyContent}
        </Modal>
      )}
      <li className={classes["movie-card"]}>
        <Link
          to={`/movies/${id}`}
          className={classes.link}
          onClick={handleMovieCardLinkClick}
        >
          <img src={posterPath} alt={title} className={classes.poster} />
          {!menuIsOpen && (
            <Button
              onClick={toggleMenuIsOpen}
              extraClassName={classes["show-options-button"]}
            >
              <ShowOptions />
            </Button>
          )}
          <BaseSelect
            isClosingMenu
            selectRef={ref}
            menuIsOpen={menuIsOpen}
            options={optionsList}
            id="genre"
            value={optionValue}
            onChange={optionChangeHandler}
            extraClassName={classes["options-select"]}
            dropdownIndicator={<ShowOptions />}
            closeMenuOnSelect={true}
            onCloseOptions={toggleMenuIsOpen}
          />

          <div className={classes["title-and-year"]}>
            <p className={classes.title}>{title}</p>
            {year && <p className={classes.year}>{year}</p>}
          </div>
          <p className={classes.genres}> {genres?.join(", ")}</p>
        </Link>
      </li>
    </>
  );
};

MovieCard.propTypes = {
  posterPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.number.isRequired,
  year: PropTypes.number,
};
