import "./movies.css";
import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import {useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";
import NoImage from "../Component/NoImage";

const Movies = () => {
  const [movies, setMovies] = useSearchParams();
  const [movieinfo, setMovieInfo] = useState([]);
  const navigate = useNavigate();

  const keywords = movies.get("q");

  const movieList = async () => {
    const response = await axios.get(
      `/search/multi?query=${keywords}&include_adult=true&page=1`
    );
    setMovieInfo(response.data.results);
    console.log("검색결과", response);
  };

  useEffect(() => {
    movieList();
  }, [movieinfo]);

  if (movieinfo.length > 0) {
    return (
      <div className="container">
        <div className="inner">
          {movieinfo?.map((item) => (
            <div
              className="movie"
              onClick={() => navigate(`/movies/${item.id}`)}
            >
              {item.known_for || item.backdrop_path === null ? (
                <NoImage />
              ) : (
                <>
                  <img
                    className="movie-img"
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  />

                  <section className="movie_info">
                    <h1 className="movie_name">{item.title || item.name}</h1>
                    <hr />

                    <div className="movie_detail">
                      <h2 className="popularity">
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: "white" }}
                        />{' '}
                        {item.popularity}{' '}
                      </h2>
                      <h3 className="vote">
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ color: "yellow" }}
                        />{' '}
                        {item.vote_average}{' '}
                      </h3>
                      <h2 className="adult">
                        {item.adult ? "Adult" : "Under18"}
                      </h2>
                    </div>
                  </section>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>The search term '<span>{keywords}</span>' you are looking for does not exist.</p>
        </div>
      </section>
    );
  }
};

export default Movies;
