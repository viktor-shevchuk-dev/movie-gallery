import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { useInput } from "hooks";

import { BaseSelect, Title, Modal, Form, Button } from "components";

import classes from "./MovieCard.module.css";

import { ReactComponent as ShowOptions } from "icons/three-dots.svg";
import { validateSelect } from "validators";

const optionsList = [
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
];

export const MovieCard = ({ src, title, genresList, id, year }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [optionValue, setOptionValue] = useState("");

  const toggleModal = () => setShowModal((showModal) => !showModal);

  const optionChangeHandler = (option) => {
    setOptionValue(option);
    setShowOptions((showOptions) => !showOptions);
    toggleModal();
  };

  const closeClickHandler = () => {
    setShowOptions((showOptions) => !showOptions);
  };

  const deleteMovie = () => {
    console.log("delete");
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          {optionValue.value === "edit" ? (
            <>
              <Title>Edit movie</Title> <Form movieId={id} />
            </>
          ) : (
            <>
              <Title>Delete movie</Title>
              <p>Are you sure you want to delete this movie?</p>
              <Button
                primary
                extraClassName={classes["confirm-button"]}
                onClick={deleteMovie}
              >
                Confirm
              </Button>
            </>
          )}
        </Modal>
      )}
      <li className={classes["movie-card"]}>
        <Link
          // to={`movies/${id}`}
          className={classes.link}
        >
          <img src={src} alt={title} className={classes.poster} />
          <BaseSelect
            // menuIsOpen={showOptions}
            options={optionsList}
            id="genre"
            value={optionValue}
            onChange={optionChangeHandler}
            extraClassName={classes["options-select"]}
            dropdownIndicator={<ShowOptions />}
            onCloseOptions={closeClickHandler}
            closeMenuOnSelect={true}
          />

          <div className={classes["title-and-year"]}>
            <p className={classes.title}>{title}</p>
            <p className={classes.year}>{year}</p>
          </div>
          <p className={classes["genres-list"]}> {genresList?.join(", ")}</p>
        </Link>
      </li>
    </>
  );
};

MovieCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
