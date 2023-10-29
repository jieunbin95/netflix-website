import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";

const Banner = ({ title, fetchUrl }) => {
  const [showMovie, setShowMovie] = useState([]);

  const movieBanner = async () => {
    const response = await axios.get(fetchUrl);
    console.log("랜덤 무비", response.data.results);

    const movie =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

    const movieDetails = await axios.get(`/movie/${movie}`, {
      params: { append_to_Response: "videos" },
    });
    console.log("무비디테일", movieDetails);
    setShowMovie(movieDetails.data);
  };

  useEffect(() => {
    movieBanner();
  }, []);

  return (
    <Container>
      <header
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${showMovie.backdrop_path}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      ></header>

      <div>
        <h1>{showMovie.title}</h1>
        <section>
          <h3>
            <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
            {showMovie.popularity}{" "}
          </h3>
          <h4>
            <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
            {showMovie.vote_average}
          </h4>
          <h2>{showMovie.adult ? "Adult" : "Under18"}</h2>
        </section>

        <p>
          {showMovie?.overview?.length > 250
            ? showMovie.overview.substring(0, 250) + "..."
            : showMovie.overview}
        </p>
      </div>
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 0;

  header {
    position: absolute;
  }

  header::before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, black, transparent);
  }

  div {
    position: absolute;
    bottom: 3.125em;
    width: 40%;
    margin-left: 3.125em;
    font-family: "Bebas Neue", sans-serif;

    h1 {
      color: white;
      font-size: 4.375rem;
      z-index: 1;
    }

    section {
      display: flex;
      vertical-align: middle;

      h2 {
        color: #ff1493;
        font-size: 1.875rem;
      }

      h4 {
        color: white;
        font-size: 1.875rem;
        margin: 0 1.25em;
      }

      h3 {
        color: white;
        margin-left: 0.625em;
        font-size: 1.875rem;
      }
    }

    p {
      color: white;
      z-index: 1;
      font-size: 1.875rem;
      word-break: keep-word;
    }
  }

  @media (max-width: 1000px) {
    height: 50em;

      div {
        height: 50%;
        bottom: 0.313em;

        h1 {
          font-size: 3rem;
          margin-bottom: 0.7em;
        }

        section {
          width: 120%;
          vertical-align: middle;
          margin-bottom: 0.4em;

          h2 {
            font-size: 1.1rem;
          }

          h4 {
            font-size: 1.1rem;
          }

          h3 {
            font-size: 1.1rem;
          }
        }

        p {
          width: 120%;
          font-size: 1.4rem;
        }
      }
    
  }

  @media (max-width: 740px) {
    height: 40em;
    div {
      height: 43%;

      p {
        font-size: 1rem;
        line-height: 1.8em;
      }
    }
  }
`;
