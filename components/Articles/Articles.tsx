import tw, { styled, css, theme } from "twin.macro";
import { useQuery } from "react-query";
import Image from "next/image";
import NextLink from "next/link";
import { getImageDimensions } from "@sanity/asset-utils";
import { LinkBox, LinkOverlay, Link } from "@chakra-ui/react";

import { urlForImage } from "@/utils/sanity/sanity";
import { sanityClient } from "@/utils/sanity/sanity.server";
import { featuredPostsQuery } from "@/utils/sanity/queries";

import withCarousel from "@/components/HOCS/withCarousel";
import useBreakPointChange from "@/components/hooks/useBreakPointChange";
import { BaseContainer, BaseLink } from "../BaseStyle";
import { Button, Heading, PageLink } from "../Elements";
import { PostType } from "pages/blog";

const Container = styled(BaseContainer)(() => [
  tw`relative`,
  tw`grid grid-cols-1 md:grid-cols-[37.5% 62.5%] blog-lg:grid-cols-[35% 65%] md:items-end gap-4`,
]);
const WrapLink = styled(BaseLink)(() => [
  tw`leading-7`,
  css`
    &:link,
    &:visited {
      ${tw`text-primary`}
      border-bottom: solid 2px ${theme<string>`colors.primary`}
    }
    &:hover,
    &:active {
      ${tw`text-primary-shade-1`}
      border-color: ${theme<string>`colors.primary.shade-1`}
    }
  `,
]);
const StyledCarousel = styled.div(() => [
  tw`flex w-full h-full`,
  css`
    .swiper {
      position: static;
    }
  `,
]);
const PlaceholderStyledButtons = tw.div`invisible md:pt-12 md:mb-2.5 blog-lg:mb-0 flex gap-2.5`;
const StyledButtons = styled.div(() => [
  tw`absolute md:bottom-0 left-8`,
  tw`md:pt-12 md:mb-2.5 blog-lg:mb-0 flex gap-2.5`,
]);
const StyledArticle = styled.div(() => [
  tw`flex flex-col`,
  tw`mb-6 md:h-full md:mb-0`,
]);
const ImgWrap = styled.div(() => [
  tw`relative w-full h-full`,
  css`
    height: clamp(250px, 25vh, 600px);
  `,
]);

const CarouselArticle = ({ data }: { data: any }) => {
  const { width, height } = getImageDimensions(data.coverImage);

  return (
    <LinkBox as="div" tw="h-full w-full">
      <StyledArticle>
        <ImgWrap tw="mb-4">
          <Image
            src={urlForImage(data.coverImage).size(width, height).url()}
            alt={data.title}
            layout="fill"
            objectFit="cover"
          />
        </ImgWrap>
        <Heading subHeading as="span" tw="text-xs mb-2">
          <NextLink href={`/blog/categorias/${data.categorySlug}`} passHref>
            <Link
              _hover={{
                textDecoration: "none",
              }}
              className="relative z-10 hover:text-primary-shade-1"
            >
              {data.category}
            </Link>
          </NextLink>
        </Heading>
        <Heading secondary as="h2" tw="text-3xl md:text-4xl mb-0 md:mb-1.5">
          <NextLink href={`/blog/${data.slug}`} passHref>
            <LinkOverlay>{data.title}</LinkOverlay>
          </NextLink>
        </Heading>
      </StyledArticle>
    </LinkBox>
  );
};
const Articles = (): JSX.Element => {
  const { isLoading, isError, data, error } = useQuery<
    PostType[],
    { message: string }
  >(["featuredPosts"], {
    queryFn: (): Promise<PostType[]> => sanityClient.fetch(featuredPostsQuery),
  });

  const matchesValue = useBreakPointChange<number>({
    initialValue: 1,
    defaultValue: 1,
    mobMdValue: 1,
    mdValue: 1,
    blogLgValue: 2,
  });

  if (isLoading) {
    return <span>Cargando articulos destacados</span>;
  }
  if (isError) {
    return (
      <p>
        <span>Error:</span>
        <span>{error.message}</span>
      </p>
    );
  }

  const Carousel = withCarousel(
    StyledCarousel,
    data,
    CarouselArticle,
    StyledButtons,
    matchesValue
  );

  return (
    <Container>
      <div tw="mb-10 md:mb-0 md:pr-5 blog-lg:pr-14 md:h-[max-content]">
        <Heading subHeading as="span">
          Artículos
        </Heading>
        <Heading secondary as="h2" tw="mb-6">
          Lo último de Osteocenter
        </Heading>
        <PageLink nextLink custom destination="/blog">
          <WrapLink tw="mb-0">Ver todos</WrapLink>
        </PageLink>
        <PlaceholderStyledButtons tw="hidden md:block">
          <Button elType="icon" top prev />
        </PlaceholderStyledButtons>
      </div>
      <Carousel />
      <PlaceholderStyledButtons tw="md:hidden">
        <Button elType="icon" top prev />
      </PlaceholderStyledButtons>
    </Container>
  );
};

export default Articles;
