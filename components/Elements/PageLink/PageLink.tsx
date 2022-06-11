import Link from 'next/link';
import tw, {css, styled} from 'twin.macro';
import {BaseLink} from '../../BaseStyle';

const StyledNavLink = styled(BaseLink)((props: {}) => [
  tw`text-lg font-medium`,
])

interface Props {
  nextLink?: boolean
  custom?: boolean
  destination: string
  children: React.ReactNode
}

const PageLink = ({nextLink, custom, destination, children}: Props) => {
  if (nextLink && custom) {
    return (
      <Link href={destination} passHref>
        {children}
      </Link>
    )
  }

  return (
    nextLink ? (
      <Link href={destination} passHref>
        <StyledNavLink>{children}</StyledNavLink>
      </Link>
    ) : (
      <StyledNavLink href={destination}>{children}</StyledNavLink>
    )
  )
}

export default PageLink