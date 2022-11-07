import { useState } from "react";

import { Navigation, Button, FindMovie, Modal, Title, Form } from "components";

import classes from "./Header.module.css";

export const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((showModal) => !showModal);

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <Title>Add movie</Title>
          <Form />
        </Modal>
      )}
      <header className={classes.header}>
        <div className={`container ${classes["header-container"]}`}>
          <section className={classes["main-header"]}>
            <Navigation />
            <Button secondary onClick={toggleModal}>
              + Add Movie
            </Button>
          </section>
          <FindMovie />
        </div>
      </header>
    </>
  );
};
