import tw from "twin.macro";
import { BaseContainer } from "../BaseStyle";
import { Heading } from "../Elements";
import Value from "./Value";

import withScrollMotion from "@/components/HOCS/withScrollMotion";

const Container = tw(BaseContainer)``;

const Values = (): JSX.Element => {
  return (
    <Container>
      <Heading as="h2" secondary>
        Cirugía ortopédica y traumatología.
      </Heading>
      <p tw="text-xl text-accent-555 mx-auto mb-20 max-w-prose">
        Con más de 5 años de experiencia y más de 500 cirugías realizadas, el
        Dr. Cadillo le ofrece: Confianza, humanidad, buenos resultados.
      </p>
      <div tw="flex flex-col md:flex-row gap-12 justify-center md:gap-16">
        <Value name="confianza" shapePosition="left" />
        <Value name="calidad" shapePosition="center" />
        <Value name="humanidad" shapePosition="right" />
      </div>
    </Container>
  );
};

export default withScrollMotion({ Element: Values });
