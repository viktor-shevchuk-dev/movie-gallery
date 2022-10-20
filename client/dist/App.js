var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null"
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component, createElement, PureComponent } from "react";
var peopleList = [
  { id: 1, name: "Viktor", occupation: "Software Engineer" },
  {
    id: 2,
    name: "Timothy Berners- Lee",
    occupation: "Computer Scientist",
  },
  {
    id: 3,
    name: "Margaret Geller",
    occupation: "Astronomer",
  },
];
var Person = function (_a) {
  var name = _a.name,
    occupation = _a.occupation;
  return createElement("li", {}, [
    createElement("h2", {}, name),
    createElement("p", {}, occupation),
  ]);
};
var PeopleList = function () {
  return _jsx("ul", {
    children: peopleList.map(function (_a) {
      var name = _a.name,
        occupation = _a.occupation,
        id = _a.id;
      return createElement(
        Person,
        { name: name, occupation: occupation, key: id },
        null
      );
    }),
  });
};
var Counter = /** @class */ (function (_super) {
  __extends(Counter, _super);
  function Counter() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = { value: 0 };
    _this.increment = function () {
      return _this.setState(function (state) {
        return { value: state.value + 1 };
      });
    };
    _this.decrement = function () {
      return _this.setState(function (state) {
        return { value: state.value - 1 };
      });
    };
    return _this;
  }
  Counter.prototype.render = function () {
    var _a = this,
      decrement = _a.decrement,
      increment = _a.increment,
      value = _a.state.value;
    return _jsxs("section", {
      children: [
        _jsx("p", { children: value }),
        _jsx(
          "button",
          __assign({ onClick: decrement }, { children: "Decrement" })
        ),
        _jsx(
          "button",
          __assign({ onClick: increment }, { children: "Increment" })
        ),
      ],
    });
  };
  return Counter;
})(Component);
var SearchForm = /** @class */ (function (_super) {
  __extends(SearchForm, _super);
  function SearchForm() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = { searchQuery: "" };
    _this.handleQueryChange = function (_a) {
      var value = _a.target.value;
      return _this.setState({ searchQuery: value });
    };
    _this.handleSubmit = function (event) {
      var searchQuery = _this.state.searchQuery;
      event.preventDefault();
      if (searchQuery.trim() === "")
        return alert("Enter some valid search query please.");
      console.log(searchQuery);
      _this.setState({ searchQuery: "" });
    };
    return _this;
  }
  SearchForm.prototype.render = function () {
    var _a = this,
      handleSubmit = _a.handleSubmit,
      handleQueryChange = _a.handleQueryChange,
      searchQuery = _a.state.searchQuery;
    return _jsxs(
      "form",
      __assign(
        { onSubmit: handleSubmit },
        {
          children: [
            _jsx("input", {
              type: "text",
              value: searchQuery,
              onChange: handleQueryChange,
              autoFocus: true,
              placeholder: "What do you want to watch?",
            }),
            _jsx(
              "button",
              __assign({ type: "submit" }, { children: "Search" })
            ),
          ],
        }
      )
    );
  };
  return SearchForm;
})(PureComponent);
var App = function () {
  return createElement("div", {}, [
    createElement("h1", { className: "title" }, "React is rendered"),
    createElement(PeopleList, {}, null),
    createElement(Counter, {}, null),
    createElement(SearchForm, {}, null),
  ]);
};
export default App;
