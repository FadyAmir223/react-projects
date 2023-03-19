import styled from 'styled-components';

export const Container = styled.main`
    background-color: #f8fafc;
    min-height: 100vh;
    padding: 3em 0;
  `,
  TourList = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30em, 1fr));
    gap: 3em;
    padding: 0 5em;
  `,
  NoTour = styled.p`
    font-weight: bold;
    font-size: 3em;
    text-transform: capitalize;
    text-align: center;
  `,
  NoTourButton = styled.button`
    font-size: 2em;
    padding: 0.4em 1em;
    border-radius: 0.4em;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    text-transform: capitalize;
    background-color: #10b981;
    border: none;
  `;
