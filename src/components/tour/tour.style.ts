import styled from 'styled-components';

export const TourContainer = styled.article`
    background-color: white;
    border-radius: 0.4em;
    overflow: hidden;
    position: relative;
  `,
  Image = styled.img`
    background-color: black;
    width: 100%;
  `,
  TextArea = styled.div`
    padding: 2.4em;
  `,
  Title = styled.h4`
    line-height: 1.6;
    margin: 0 0 1.2em;
    text-align: center;
    font-weight: bold;
    font-size: 2.1em;
  `,
  Text = styled.p`
    color: #64748b;
    font-size: 1.7em;
  `,
  Button = styled.button`
    border: 1px solid #10b981;
    background-color: transparent;
    width: 100%;
    padding: 0.4em;
    text-transform: capitalize;
    font-size: 1.4em;
    color: #10b981;
    cursor: pointer;
    border-radius: 0.4em;
  `,
  Price = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.4em 1em;
    background-color: #10b981;
    letter-spacing: 0.1em;
    font-size: 1.4em;
  `;
