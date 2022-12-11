import { useState } from "react";
import { useParams } from "react-router-dom";

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
  const { searchQuery: urlSearchParameter } = useParams();

  const [showModal, setShowModal] = useState(false);

  const [isAddingSuccess, setIsAddingSuccess] = useState(false);
  const [isAddingError, setIsAddingError] = useState(false);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);

    setIsAddingSuccess(false);
    setIsAddingError(false);
  };

  const addingErrorHandler = (error) => {
    console.log(error);
    setIsAddingError("Sth went wrong.");
  };

  const addingSuccessHandler = (title) =>
    setIsAddingSuccess(`${title} was successfully added to the movie library.`);

  let modalBodyContent, modalHeadingContent;

  if (!isAddingSuccess && !isAddingError) {
    modalHeadingContent = "Add movie";
    modalBodyContent = (
      <BaseForm
        onAddingError={addingErrorHandler}
        onAddingSuccess={addingSuccessHandler}
      />
    );
  } else {
    if (isAddingSuccess) modalHeadingContent = isAddingSuccess;
    else if (isAddingError) modalHeadingContent = isAddingError;

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
      <Main searchQuery={urlSearchParameter} />
      <Footer />
    </>
  );
};
