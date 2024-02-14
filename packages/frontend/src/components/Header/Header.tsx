import styled, { css } from '@styled/index'
import { IStyledComponent } from 'styled-components'
import { FastOmit } from 'styled-components/dist/types'
import { WrappedStyledComponent } from '@definitions'

const headerStyles = css`
  font-weight: bold;
  margin: 0;
  padding: 0;
`

const H1 = styled.h1`
  ${headerStyles}
`

const H2 = styled.h2`
  ${headerStyles}
`

const H3 = styled.h3`
  ${headerStyles}
`

const H4 = styled.h4`
  ${headerStyles}
`

const H5 = styled.h5`
  ${headerStyles}
`

const H6 = styled.h6`
  ${headerStyles}
`

type HtmlTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeaderProps extends WrappedStyledComponent {
  htmlTag?: HtmlTag
}

type Props = React.PropsWithChildren<HeaderProps>

const tagMap: {
  [key in HtmlTag]: IStyledComponent<
    'web',
    FastOmit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >,
      never
    >
  >
} = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6
}

const Header = ({ htmlTag = 'h2', ...rest }: Props) => {
  const StyledHeaderToUse = tagMap[htmlTag]

  return (
    <StyledHeaderToUse className={rest.className}>
      {rest.children}
    </StyledHeaderToUse>
  )
}

export default Header
