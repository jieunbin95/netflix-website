import React from "react";
import styled from "styled-components";
import Banner from "../Component/Banner";
import Row from "../Component/Row";
import request from "../api/request";


const Home = () => {
    return (
      <Container>
        <Banner title="NowPlaying" fetchUrl={request.fetchNowPlaying} />
        <Row title="Top Rated" fetchUrl={request.fetchTopRated}></Row>
        <Row title="Popular" fetchUrl={request.fetchPopular}></Row>
        <Row title="UpComing" fetchUrl={request.fetchUpcoming}></Row>
      </Container>
    );
};

export default Home;

const Container = styled.div``;
