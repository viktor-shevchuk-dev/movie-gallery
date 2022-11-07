import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    return this.state.hasError ? (
      <h1>Sth wen wrong. Try again later.</h1>
    ) : (
      this.props.children
    );
  }
}
