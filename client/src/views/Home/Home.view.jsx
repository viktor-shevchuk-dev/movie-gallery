import { useState } from "react";

import classes from "./Home.module.css";

import {
  Header,
  Main,
  Footer,
  FindMovie,
  MainHeader,
  Button,
  Modal,
  Title,
  BaseForm,
} from "components";

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [isFormError, setIsFormError] = useState(false);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
    setIsFormSuccess(false);
    setIsFormError(false);
  };

  const addedMovieErrorHandler = (error) => {
    console.log(error);
    setIsFormError("Sth went wrong.");
  };

  const addedMovieSuccessHandler = (title) => {
    setIsFormSuccess(`${title} was successfully added to the movie library.`);
  };

  let modalBodyContent, modalHeadingContent;

  if (!isFormSuccess && !isFormError) {
    modalHeadingContent = "Add movie";
    modalBodyContent = (
      <BaseForm
        onAddedMovieError={addedMovieErrorHandler}
        onAddedMovieSuccess={addedMovieSuccessHandler}
      />
    );
  } else {
    if (isFormSuccess) modalHeadingContent = isFormSuccess;
    else if (isFormError) modalHeadingContent = isFormError;

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

      <Header extraClassName={classes["home-header"]}>
        <MainHeader>
          <Button secondary onClick={toggleModal}>
            + Add Movie
          </Button>
        </MainHeader>
        <FindMovie />
      </Header>
      <Main />
      <Footer />
    </>
  );
};
