import Image from "next/image";
import { useState } from "react";
import tw, { css, styled } from "twin.macro";
import { v4 } from "uuid";

import { loader } from "./helpers";
import withCarousel from "@/components/HOCS/withCarousel";

import { Button } from "../../../Elements";
import { Title } from "./Elements";

const Container = tw.div`w-full h-auto`;
const ImgWrap = styled.div`
  ${tw`overflow-hidden rounded-[9px]`}
  flex-shrink: 0;
  flex-basis: 100%;
`;

const StyledCarousel = styled.div(({ showBttns }: { showBttns: boolean }) => [
  tw`relative w-full`,
  css`
    button {
      display: ${showBttns ? "flex" : "none"};
    }
    .swiper {
      position: static;
    }
  `,
]);

const CarouselWrap = (props: {
  children: React.ReactNode;
  showCarBttns: boolean;
  setShowCarBttns: any;
}) => {
  return (
    <StyledCarousel
      onMouseEnter={() => props.setShowCarBttns(true)}
      onMouseLeave={() => props.setShowCarBttns(false)}
      showBttns={props.showCarBttns}
    >
      {props.children}
    </StyledCarousel>
  );
};
const CarouselImg = (props: { data: any }) => (
  <ImgWrap key={v4()}>
    <Image
      loader={loader}
      src={props.data.getUrl()}
      alt="Zona cercana al 'Faro La Marina'"
      layout="responsive"
      objectFit="cover"
      width="1"
      height="1"
    />
  </ImgWrap>
);

const ArrowButton = styled(Button)(
  ({ prev, next }: { prev?: boolean; next?: boolean }) => [
    tw`w-[40px] h-[40px] text-xl`,
    tw`absolute z-[1] top-1/2 translate-y-[-50%]`,
    prev && tw`left-0 translate-x-[-25%]`,
    next && tw`right-0 translate-x-[25%]`,
  ]
);

const Photos = ({
  imgs,
}: {
  imgs: google.maps.places.PlacePhoto[] | [];
}): JSX.Element => {
  const [showCarBttns, setShowCarBttns] = useState(false);
  const Carousel = withCarousel(
    ({ children }: { children: React.ReactNode }) => (
      <CarouselWrap
        showCarBttns={showCarBttns}
        setShowCarBttns={setShowCarBttns}
      >
        {children}
      </CarouselWrap>
    ),
    imgs,
    CarouselImg,
    null,
    1,
    10,
    ArrowButton,
    true
  );

  return (
    <Container>
      <Title>Photos</Title>
      <Carousel />
    </Container>
  );
};

export default Photos;

