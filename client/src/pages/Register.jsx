import styled from 'styled-components';
import { mobile } from '../responsive';
import { useState } from 'react';
import { signUp } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fG9ubGluZSUyMHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
export default function NewUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');

  const dispatch = useDispatch();
  // const { isFetching, error } = useSelector((state) => state.user);

  const handleSignup = (e) => {
    e.preventDefault();
    signUp({ name, email, password, passwordConfirm }, dispatch);
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            name="name"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            name="passwordConfirm"
            placeholder="confirm password"
            onChange={(e) => setpasswordConfirm(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSignup}>CREATE</Button>
          {/* {error && <Error>Something went wrong</Error>} */}
        </Form>
      </Wrapper>
    </Container>
  );
}
