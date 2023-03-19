import styled from 'styled-components';

export const Title_ = styled.h3`
  text-transform: capitalize;
  font-size: 3em;
  margin: 0 0 1.5em;
  letter-spacing: 0.1em;
  font-weight: 400;
  position: relative;
  text-align: center;

  &:before {
    content: '';
    width: 4em;
    height: 0.12em;
    background-color: #60dbfb;
    position: absolute;
    left: 50%;
    top: calc(100% + 0.2em);
    transform: translateX(-50%);
  }
`;
