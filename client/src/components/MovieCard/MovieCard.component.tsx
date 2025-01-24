import { FC } from "react";

import classes from "./MovieCard.module.css";

export interface MovieCardProps {
  src: string;
  title: string;
  genresList: string[];
  year: number;
}

export const MovieCard: FC<MovieCardProps> = ({
  src,
  title,
  genresList,
  year,
}) => {
  return (
    <a href="/" className={classes["link"]}>
      <img className={classes["poster"]} src={src} alt={title} />
      <div className={classes["title-and-year-wrapper"]}>
        <p className={classes.title}>{title}</p>
        <p className={classes.year}>{year}</p>
      </div>
      <p className={classes.genres}>{genresList.join(", ")}</p>
    </a>
  );
};
