import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { MultiSelect, Title, Modal, Form, Button } from "components";

import classes from "./MovieCard.module.css";

import { ReactComponent as ShowOptions } from "icons/three-dots.svg";

const optionsList = [
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
];

export const MovieCard = ({ src, title, genresList, id, year }) => {
  const [showModal, setShowModal] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleModal = () => setShowModal((showModal) => !showModal);

  const optionChangeHandler = (option) => {
    setOptionValue(option);
    setMenuIsOpen((showOptions) => !showOptions);
    toggleModal();
  };

  const deleteMovie = () => {
    console.log("delete");
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
          to={`/${id}`}
          className={classes.link}
          onClick={handleMovieCardLinkClick}
        >
          <img src={src} alt={title} className={classes.poster} />
          {!menuIsOpen && (
            <Button
              onClick={toggleMenuIsOpen}
              extraClassName={classes["show-options-button"]}
            >
              <ShowOptions />
            </Button>
          )}
          <MultiSelect
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
