import { Component, createElement, PureComponent } from 'react';

import './App.css';

const Person = ({ name, occupation }) =>
  createElement('li', {}, [
    createElement('h2', {}, name),
    createElement('p', {}, occupation),
  ]);

const PeopleList = () => (
  <ul>
    {[
      { name: 'Viktor', occupation: 'Software Engineer', id: 1 },
      {
        id: 2,
        name: 'Timothy Berners- Lee',
        occupation: 'Computer Scientist',
      },
      {
        id: 3,
        name: 'Margaret Geller',
        occupation: 'Astronomer',
      },
    ].map(({ name, occupation, id }) =>
      createElement(Person, { name, occupation, key: id }, null)
    )}
  </ul>
);

class Counter extends Component {
  state = { value: 0 };

  increment = () =>
    this.setState((state, props) => ({ value: state.value + 1 }));

  decrement = () =>
    this.setState((state, props) => ({ value: state.value - 1 }));

  render() {
    const {
      decrement,
      increment,
      state: { value },
    } = this;

    return (
      <section>
        <p>{value}</p>
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
      </section>
    );
  }
}

class SearchForm extends PureComponent {
  state = { searchQuery: '' };

  handleQueryChange = ({ target: { value } }) =>
    this.setState({ searchQuery: value });

  handleSubmit = (event) => {
    const {
      state: { searchQuery },
    } = this;
    event.preventDefault();
    if (searchQuery.trim() === '')
      return alert('Enter some valid search query please.');

    console.log(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const {
      handleSubmit,
      handleQueryChange,
      state: { searchQuery },
    } = this;

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleQueryChange}
          autoFocus
          placeholder="What do you want to watch?"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

const App = () =>
  createElement('div', {}, [
    createElement('h1', { className: 'title' }, 'React is rendered'),
    createElement(PeopleList, {}, null),
    createElement(Counter, {}, null),
    createElement(SearchForm, {}, null),
  ]);

export default App;
