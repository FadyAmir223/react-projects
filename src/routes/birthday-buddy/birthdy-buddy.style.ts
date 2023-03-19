import styled from 'styled-components';

export const Main = styled.main`
    background-color: hsl(131.71deg 100% 12.75% / 57%);
    min-height: 100vh;
    display: grid;
    align-content: center;
  `,
  Section = styled.section`
    padding: 3em 20em;
  `,
  Container = styled.div`
    padding: 2em;
    background-color: white;
    border-radius: 1em;
    overflow: hidden;
  `,
  Title = styled.h3`
    text-transform: capitalize;
    font-size: 2.5em;
    font-weight: 400;
    margin: 0 0 1.1em;
  `,
  Button = styled.button`
    width: 100%;
    background-color: #d946ef;
    border: none;
    padding: 0.4em;
    font-size: 1.6em;
    border-radius: 0.4em;
    cursor: pointer;
  `;
