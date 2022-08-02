import tw from "twin.macro";
import { BaseContainer } from "../BaseStyle";

import { Button, Heading } from "../Elements";
import CustomerPictures from "./CustomerPictures";
import HeroImage from "./HeroImage";
import withScrollMotion from "@/components/HOCS/withScrollMotion";

const Container = tw(
  BaseContainer
)`max-w-screen-2xl grid grid-cols-2 gap-2.5 items-center justify-items-end`;

const Hero = (): JSX.Element => {
  return (
    <Container tw="grid grid-cols-1 text-center blog-lg:text-left blog-lg:grid-cols-2 gap-16 blog-lg:gap-12">
      <div>
        <Heading primary>
          {" "}
          Cirugía ortopédica y traumatología con las mejores garantías.
        </Heading>
        <p tw="text-xl text-accent-555 leading-relaxed mb-12">
          Médico traumatólogo con amplia experiencia en el manejo quirúrgico de
          fracturas, reconstrucciones óseas, Prótesis de caderas, tumores óseos
          y músculo esquelético.
        </p>
        <Button elType="text" cta hero href="#" tw="mr-4 text-lg">
          Pide una cita
        </Button>
        <Button elType="text" outline href="#biography">
          Más sobre mí &darr;
        </Button>
        <CustomerPictures />
      </div>
      <HeroImage />
    </Container>
  );
};

export default withScrollMotion({ Element: Hero });
