import React from 'react';
import styled from "styled-components";
import Card from '../components/Card'

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #fffffe;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  margin: 3em;
  padding: 4em;
  background: #1b1b1b;
`;

// Use Title and Wrapper like any other React component – except they're styled!

const Home = () => {
    return (
        <Wrapper>
            <Card />
        </Wrapper>
    );
};

export default Home;
