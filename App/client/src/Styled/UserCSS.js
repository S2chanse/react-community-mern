import styled from '@emotion/styled';

const LoginDiv = styled.div`
  width: 50%;
  max-width: 360px;
  margin: 0 auto;
  margin-top: 5rem;
  shadow: 0 0 0 0.5;
  form {
    width: 70%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    label {
      font-weight: bold;
    }
    input {
      border-radius: 10px;
      border: 1px solid #c6c6c6;
      padding: 5px;
      margin-bottom: 10px;

      &:active,
      &focus {
        outline: none;
      }
    }
    button {
      border-radius: 15px;
      padding: 5px 10px;
      background-color: black;
      color: white;
      border: 1px solid black;
      margin-top: 10px;
      &:hover {
        background-color: white;
        color: black;
      }
      @media (max-width: 756px) {
        width: 100%;
      }
    }
  }
`;

export default LoginDiv;
