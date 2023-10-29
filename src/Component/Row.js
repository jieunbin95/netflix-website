import "./Row.css";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";
import Badge from 'react-bootstrap/Badge';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useNavigate} from "react-router-dom";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [genre, setGenres] = useState([]);
  const navigate=useNavigate()

  const fetchMovie = async () => {
    try {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const fetchGenres=async()=>{
    try{
      const request=await axios.get('/genre/movie/list')
      setGenres(request.data.genres);
      setError(false);
    }catch(e){
      setError(true);
    }
  }

  useEffect(() => {
    fetchMovie();
    fetchGenres()
  }, []);

  if (error) {
    return <ErrorPage message="에러가 발생했습니다" />;
  } else {
    return (
      <>
        <Container>
          <h2>{title}</h2>
          <Swiper
            style={{ overflow: "visible" }}
            modules={[Navigation,Scrollbar]}
            loop={true}
            navigation={true}
            breakpoints={{
              1378: {
                slidesPerView: 6,
                slidesPerGroup: 6,
              },
              998: {
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
              625: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              0: {
                slidesPerView: 0,
                slidesPerGroup: 0,
              }
            }}
          >
            <Contain>
              {movies.map((item) => (
                <SwiperSlide>
                  <Wrap onClick={()=>navigate(`/movies/${item.id}`)}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${item?.backdrop_path}`}
                    />

                    <section>
                      <h1>{item.title}</h1>
                      <hr/>
                      <div className="btn-genre" style={{margin:'10px 0'}}>{item.genre_ids.map(id=>(<Badge bg="danger">{genre?.find(item=>item.id===id)?.name}</Badge>))}</div>
                      <div>
                        <h2>
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{ color: "white" }}
                          />
                          {item.popularity}{" "}
                        </h2>
                        <h3>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "yellow" }}
                          />
                          {item.vote_average}
                        </h3>
                        <h2 style={{color:'#ff1493'}}>{item.adult ? "Adult" : "Under18"}</h2>
                      </div>
                    </section>
                  </Wrap>
                </SwiperSlide>
              ))}
            </Contain>
          </Swiper>
        </Container>
      </>
    );
  }
};

export default Row;

const Container = styled.div`
  font-family: "Bebas Neue", sans-serif;
  margin: 1.875em;

  h2 {
    font-size: 2.5rem;
  }

  @media(max-width:1000px){
    margin:1em;
    h2{
      font-size: 2rem;
    }
  }
`;

const Contain = styled.div``;

const Wrap = styled.div`
  width: 95%;
  height: 95%;
  position: relative;
  cursor: pointer;
  transition: all 0.5s;
  margin-right: .625em;
  border-radius: 5px;
  overflow: hidden;

  section {
    color: white;
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50% );
    background: linear-gradient(to right, #000000, transparent);
    padding: 1.875em;
    text-align:center;

    h1{
      width: 12.5em;
      font-size:.9rem;
      padding-top:.625em;
    }

    div{
      display: flex;
      vertical-align: middle; 
    }

    h2{
      font-size:.8rem;
      margin-right:0.625em;
    }

    h3{
      font-size:.8rem;
      margin-right:0.625em;
    }
  }

  img{
    width: 100%;
    height: 100%;
    position:relative;
  }

  &:hover {
    transform: scale(1.2);
    z-index: 1;
  }


  @media (max-width:1100px) {
    section {

      h1{
        width: 13em;
        font-size:.8rem;
        padding-top:.5em;
      }

      h2{
        
        font-size:.8rem;
        margin-right:.6em;
      }

      h3{
        font-size:.8rem;
        margin-right:.6em;
      }
    }


    @media (max-width:850px) {
      section {
        
        h1{
          width: 10em;
          font-size:.9rem;
          padding-top:5em;
        }
  
        div{
          opacity:0;
        }
      }
  }
`;
