import Image from "next/image";
import tw, { styled, css } from "twin.macro";
import { motion } from "framer-motion";

interface Props {
  src: string;
  name: string;
  num: string;
  children: React.ReactNode;
}

const Container = styled.div((props: { position: any }) => [
  tw`flex items-center gap-12`,
  props.position % 2 == 0 ? tw`flex-row` : tw`flex-row-reverse`,
  css`
    @media (max-width: 544px) {
      ${tw`flex-col`}
    }
  `,
]);
const Number = tw.p`text-7xl md:text-[4.75rem] blog-lg:text-[5.375rem] font-semibold text-[#ddd] mb-3`;
const ImgWrap = styled.div(() => [tw`flex justify-center w-full h-full`]);
const Img = styled.div(() => [
  tw`justify-self-center w-[clamp(200px, 80%, 400px)]`,
  tw`rounded-[9px] overflow-hidden`,
]);
const Text = styled.div(() => [tw`w-full`]);
const Step = ({ src, name, num, children }: Props): JSX.Element => {
  return (
    <Container position={+num}>
      <motion.div
        initial={{ opacity: 0, x: +num % 2 == 0 ? 40 : -40 }}
        whileInView={{
          opacity: [0, 0, 1],
          x: +num % 2 == 0 ? [40, 20, 0] : [-40, -20, 0],
        }}
        transition={{ delay: 0.8, duration: 1 }}
        tw="w-full md:w-1/2"
        viewport={{ once: true }}
      >
        <ImgWrap>
          <Img>
            <Image
              src={`/img/steps/${src}`}
              alt={`${name} ilustración`}
              layout="responsive"
              sizes="90vw"
              width="1"
              height="1"
            />
          </Img>
        </ImgWrap>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: [0, 0, 1], y: [40, 20, 0] }}
        transition={{ duration: 1 }}
        tw="mob-me:w-4/5 md:w-1/2"
        viewport={{ once: true }}
      >
        <Text>
          <Number>{num}</Number>
          {children}
        </Text>
      </motion.div>
    </Container>
  );
};

export default Step;
