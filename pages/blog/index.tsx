// libraries
import { GetStaticProps } from "next";
import tw, { styled, css } from "twin.macro";
import { QueryClient, dehydrate, useQuery } from "react-query";

// helpers
import {
  allPosts,
  allCategories,
  allPostsByCategory,
} from "../../utils/sanity/queries";

// components
import withCarousel from "@/components/HOCS/withCarousel";
import { Heading } from "../../components/Elements";
import Post from "../../components/Blog/Post";
import IndexLayout from "../../components/Blog/IndexLayout";

// styled components
const StyledCarousel = styled.div(() => [
  tw`blog-lg:relative`,
  css`
    .swiper {
      ${tw`blog-lg:h-[minmax(380px, 600px)]`}
      .swiper-wrapper {
        height: 100%;
        .swiper-slide {
          --webkit-transform: translateZ(0);
          height: 100%;
        }
      }
    }
  `,
]);

export interface PostType {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: any;
  featured: boolean;
  slug: string;
}

export interface BlogProps {
  allPosts: PostType[] | [];
  allCategories: Array<Record<string, string>>;
  allPostsByCategory: any;
}

const StyledButtons = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 blog-lg:absolute blog-lg:left-[55%] blog-lg:bottom-0 blog-lg:pl-24 blog-lg:mb-5 blog-lg:z-10">
    {children}
  </div>
);
const CarouselPost = ({ data }: { data: any }) => <Post top post={data} />;

const Blog = (): JSX.Element => {
  const posts = useQuery<PostType[]>(["allPosts"], allPosts);
  const categories = useQuery(["allCategories"], allCategories);
  const postsByCategory = useQuery(["allPostsByCategory"], () =>
    allPostsByCategory(categories.data)
  );
  const isLoading =
    posts.isLoading || categories.isLoading || postsByCategory.isLoading;
  const isError =
    posts.isError || categories.isError || postsByCategory.isError;

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  if (isError) {
    return <p>Oh oh algo salio mal :c</p>;
  }
  const Carousel = withCarousel(
    StyledCarousel,
    posts?.data?.filter((post) => post.featured),
    CarouselPost,
    StyledButtons
  );

  return (
    <IndexLayout
      allPosts={posts.data || []}
      allCategories={categories.data}
      allPostsByCategory={postsByCategory.data}
    >
      {/*Carousel */}
      <div className="mb-20">
        <Heading subHeading>Lo ultimo</Heading>
        <Carousel />
      </div>
    </IndexLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["allPosts"], allPosts);

  const categories = await allCategories();
  await queryClient.setQueryData(["allCategories"], categories);

  await queryClient.prefetchQuery(["allPostsByCategory"], () =>
    allPostsByCategory(categories)
  );

  console.log("getStaticProps index");
  console.log("is this getting executed after webhook?", allPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Blog;
