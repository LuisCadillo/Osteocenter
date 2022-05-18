import tw, {css, styled} from 'twin.macro';
import {Fragment} from "react";
import Hero from '../Hero';
import Values from '../Values';
import Biography from '../Biography';

const Section = styled.section(props => [
  tw`py-24`,
  props.hero && tw`bg-primary-tint-3`,
  props.valueSection && tw`text-center`,
  props.biography && tw`p-0 mx-16`,
])

const Main = () => {
  return (
    <Fragment>
      <Section hero>
        <Hero />
      </Section>
      <Section valueSection>
        <Values />
      </Section>
      <Section biography>
        <Biography />
      </Section>
      {/*
      */}

    </Fragment>
  )
}
export default Main;
