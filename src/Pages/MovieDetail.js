import './moviedetail.css'
import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar} from "@fortawesome/free-solid-svg-icons";
import Badge from 'react-bootstrap/Badge';
import styled from "styled-components";

const MovieDetail = () => {
  let { id } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [isClicked,setIsClicked] = useState(false)
  const [videolist,setVideoList] = useState([]);

  const getMovie = async () => {
    const response = await axios.get(`/movie/${id}`);
    setMovieDetail(response.data);

    const video_player=await axios.get(`/movie/${id}/videos`)
    setVideoList(video_player.data)
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  if(isClicked){
    return(
      <div>
       <Container className="videoscreen"> 
         <button className="btn-close" onClick={()=>setIsClicked(false)}></button>
        <Row>
          <Col>
          <iframe src={`https://www.youtube.com/embed/${videolist?.results[0]?.key}?autoplay=true`}
           width='1000'
           height='600'
           frameborder='0'
           allow='autoplay;'>         
          </iframe>
          </Col>  
        </Row>         
      </Container>
    </div>
    )
  }else{
    return (
      <Container className="container">
        <Row>
          <Col lg={6}>
            <img
              style={{width:'100%',height:'100%'}}
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieDetail?.poster_path}`}
            />
          </Col>
          <Col lg={6}>
            <h1 className='title'>{movieDetail.title}</h1>
            <h2>{movieDetail.tagline && movieDetail.tagline}</h2>
            <hr />
            <h3 className="overview">{movieDetail.overview}</h3>
  
            <hr />
            <div className="movie__detail">
              <h2 className="movie_popularity">
                <FontAwesomeIcon icon={faUser} style={{ color: "black" }} />
                {movieDetail.popularity}{" "}
              </h2>
              <h3 className="movie_average">
                <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                {movieDetail.vote_average}
              </h3>
              <h2 className="movie_adult" style={{ color: "#ff1493" }}>
                {movieDetail.adult ? "Adult" : "Under18"}
              </h2>
            </div>
  
            
            <div className="movie__detail2">
              <div className="movie__status">
                <Badge bg="danger">
                  Status
                </Badge>{' '}
                {movieDetail?.status}
              </div>
              <div className="movie__data">
                <Badge bg="danger">
                  Release Date
                </Badge>{' '}
                  {movieDetail?.release_date}
              </div>
              <div className="movie__budget">
                <Badge bg="danger">
                  Budget
                </Badge>{' '}
                  ${movieDetail?.budget}
              </div>
              <div className="movie__runtime">
                <Badge bg="danger">
                  Runtime
                </Badge>{' '}
                  {movieDetail?.runtime}min
              </div>
            </div>
            <hr />
          
            <div>
            {videolist?.results?.length=== 0 ? "" :<div onClick={()=>setIsClicked(true)} className="video__play">▶Play Trailer</div>}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default MovieDetail;

const Iframe=styled.div`

`