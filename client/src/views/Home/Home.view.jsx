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
  Form,
} from "components";

export const Home = () => {
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
