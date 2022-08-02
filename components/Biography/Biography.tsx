import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import tw, { css, styled, theme } from "twin.macro";
import { BaseContainer } from "../BaseStyle";
import { Heading } from "../Elements";
import Tabs from "./Tabs";

import withScrollMotion from "@/components/HOCS/withScrollMotion";

const imgSize: number = 368;

const BackColor = tw(
  BaseContainer
)`max-w-none bg-primary-tint-2 rounded-[11px] p-8 pb-0 my-16`;

const Container = styled.div(({ height }: { height: number }) => [
  tw`max-w-screen-xl grid grid-rows-1 blog-lg:grid-cols-[1fr 2fr] items-start my-0 mx-auto overflow-hidden`,
  css`
    @media (min-width: ${theme<string>`screens.blog-lg`}) {
      height: ${height}px;
    }
  `,
]);

const ImgWrap = styled.span(() => [
  tw`w-full max-w-[370px] mx-auto blog-lg:mx-0 blog-lg:pl-8`,
  tw`hidden blog-lg:block`,
  css`
    transform: rotateY(180deg);
  `,
]);

const Biography = (): JSX.Element => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [imgHeight, setImgHeight] = useState<number>(
    imgRef?.current?.clientHeight || imgSize
  );

  useEffect(() => {
    setImgHeight(imgRef?.current?.clientHeight || imgSize);
    const onResize = () => {
      setImgHeight(imgRef?.current?.clientHeight || imgSize);
    };

    window.onresize = onResize;

    return window.removeEventListener("resize", onResize);
  }, [imgHeight]);

  return (
    <BackColor>
      <Container height={imgHeight}>
        <ImgWrap ref={imgRef}>
          <Image
            priority={true}
            src="/img/hero.png"
            alt="Doctor cirujano Ronal Cadillo"
            layout="responsive"
            sizes="20vw"
            width="375"
            height="574"
          />
        </ImgWrap>
        <div tw="w-full blog-lg:grid blog-lg:grid-rows-[30% 70%] blog-lg:h-full">
          <div tw="mb-12 blog-lg:mb-0">
            <Heading as="h2" secondary tw="mb-4 text-center md:text-left">
              Dr. Ronal Cadillo Medina.
            </Heading>
            <p tw="text-lg mb-8 text-accent-555 text-center md:text-left">
              Cirujano Ortopédico y traumatólogo.
            </p>
          </div>
          <Tabs />
        </div>
      </Container>
    </BackColor>
  );
};

export default withScrollMotion({Element: Biography});
