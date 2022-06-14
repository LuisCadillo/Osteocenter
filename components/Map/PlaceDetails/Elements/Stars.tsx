import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';
import {TOTAL_STARS} from '../../../../static/js/constants';

const ImgWrap = tw.div`w-4 h-4`
const Container = tw.div`flex`

const Stars = ({score}) => (
  <Container>
    {[...new Array(Math.trunc(score))].map((_, i) => (
      <ImgWrap key={i}>
        <Image
          src='/img/stars/star_rate.png'
          alt='star rate'
          layout='responsive'
          size='1vw'
          height='1'
          width='1'
        /> </ImgWrap>
    ))}
    {[...new Array(TOTAL_STARS - Math.trunc(score))].map((_, i) => {
      if (`${score}`.slice(2) >= 8) {
        return (
          <ImgWrap key={i}>
            <Image
              src='/img/stars/star_rate.png'
              alt='star rate'
              layout='responsive'
              size='1vw'
              height='1'
              width='1'
            />
          </ImgWrap>
        )
      }
      if (`${score}`.slice(2) >= 3) {
        return (
          <ImgWrap key={i}>
            <Image
              src='/img/stars/star_rate_half.png'
              alt='star rate half'
              layout='responsive'
              size='1vw'
              height={1}
              width={1}
            />
          </ImgWrap>
        )
      }
      return (
        <ImgWrap key={i}>
          <Image
            src='/img/stars/star_rate_empty.png'
            alt='star rate empty'
            layout='responsive'
            size='1vw'
            height='1'
            width='1'
          />
        </ImgWrap>
      )
    })}
  </Container>
)

export default Stars