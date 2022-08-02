import Image from "next/image";
import tw, { styled } from "twin.macro";
import { Button, Heading } from "../Elements";
import { BaseContainer } from "../BaseStyle";

import withScrollMotion from "@/components/HOCS/withScrollMotion";

const BackColor = styled(BaseContainer)(() => [
  tw`max-w-none bg-primary-tint-2 py-28`,
]);
const Text = () => (
  <div tw="flex flex-col items-center md:items-start">
    <Heading
      primary
      as="h1"
      tw="text-[2.75rem] md:text-[3.2rem] xl:text-[3.5rem] md:max-w-[20ch]"
    >
      Tu salud en las mejores manos.
    </Heading>
    <p tw="mb-5 text-lg max-w-[50ch] text-accent-555">
      Reserva tu cita hoy mismo y nos comunicaremos contigo para darte la
      atencion que mereces lo antes posible.
    </p>
    <Button elType="text" cta href="#">
      Pide una cita
    </Button>
  </div>
);

const CallToAction = (): JSX.Element => {
  const AnimatedText = withScrollMotion({ Element: Text });

  return (
    <BackColor>
      <div tw="max-w-screen-xl flex justify-center flex-col md:flex-row text-center md:text-left items-center gap-8 md:gap-14 mx-auto">
        <AnimatedText />
        <div tw="w-3/5 max-w-[230px] h-auto md:w-1/3 md:max-w-[300px] md:h-1/3">
          <Image
            src="/img/cta-health.svg"
            alt="corazon junto con equipo medico"
            layout="responsive"
            width="1"
            height="1"
            sizes="50vw"
          />
        </div>
      </div>
    </BackColor>
  );
};

export default CallToAction;
