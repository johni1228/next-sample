import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons"
import { Scenario } from "@iaf/api"
import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import styled from "styled-components"

import StepCard from "../components/StepCard"
import Arrow, { ARROW_HEAD_WIDTH } from "../components/Arrow"
import Input from '../components/Input';

export const getServerSideProps: GetServerSideProps<
  Pick<Scenario, "name" | "steps">
> = async () => {
  const res = await fetch(`http://localhost:8080/scenario`)
  const { name, steps } = (await res.json()) as Scenario
  return { props: { name, steps } }
}

export default function Home({
  name,
  steps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [inputAddInPosition, setInputAddInPosition] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const both_padding = 160;
  const cardLength = 13.75 * 16;
  const onSelectCard = (index) => {
    setSelectedIndex(index);
    setInputValue(steps[index].value);
    const columnCountPerRow = Math.floor((window.innerWidth - both_padding) / cardLength);
    const rowCount = Math.floor(index / columnCountPerRow) + 1;
    setInputAddInPosition(Math.min(rowCount * columnCountPerRow - 1, steps.length - 1));
  };
  const inputValueChanged = (value) => {
    steps[selectedIndex].value = value;
    setInputValue(value);
  }
  return (
    <>
      <Head>
        <title>Autify - Frontend Interview Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <h1>{name}</h1>
        <p>Total steps: {steps.length}</p>
        <Wrapper>
          {steps.map((step, idx) => (
            <>
              <StepCardWrapper
                className={selectedIndex === idx ? 'selected' : ''}
                key={step.id}
                onClick={() => {onSelectCard(idx)}}
              >
                <StepCard step={step} stepNumber={idx + 1} />
                <ArrowWrapper>
                  <Arrow />
                </ArrowWrapper>
              </StepCardWrapper>
              {idx === inputAddInPosition && inputAddInPosition !== (steps.length - 1) && (<Input defaultValue={inputValue} onClose={() => {setInputAddInPosition(-1); setSelectedIndex(-1);}} onChange={inputValueChanged} />)}
            </>
          ))}
          <FinishCardWrapper>
            <FinishCard>
              <FontAwesomeIcon icon={faFlagCheckered} />
              Finish
            </FinishCard>
          </FinishCardWrapper>
          {inputAddInPosition === (steps.length - 1) && (<Input defaultValue={inputValue} onClose={() => {setInputAddInPosition(-1); setSelectedIndex(-1);}} onChange={inputValueChanged} />)}
        </Wrapper>
      </Main>
    </>
  )
}

const Main = styled.main`
  padding: 2.5rem 5rem;
`
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ARROW_WIDTH = "3.25rem"
const StepCardWrapper = styled.div`
  position: relative;
  margin: calc(1.25rem - 3px) calc(${ARROW_WIDTH} - ${ARROW_HEAD_WIDTH} - 3px) -3px -3px;
  display: flex;
  border: 3px solid transparent;
  cursor: pointer;
  &.selected {
    border: 3px solid rgba(0,0,0,0.2);
    border-radius: 0.25rem;
    &:after {
      content: '';
      position: absolute;
      bottom: -32px;
      left: calc(50% - 21px);
      border-top: 0 solid transparent;
      border-right: 21px solid transparent;
      border-left: 21px solid transparent;
      border-bottom: 22px solid white;
      flex: none;
    }
  }
`
const ArrowWrapper = styled.div`
  position: absolute;
  right: 0;
  transform: translate(100%, -50%);
  top: 50%;
  width: ${ARROW_WIDTH};
`
const FinishCardWrapper = styled(StepCardWrapper)`
  display: flex;
  align-items: center;
`
const FinishCard = styled.div`
  background: #ffffff;
  padding: 0.5rem 0.75rem;
`
