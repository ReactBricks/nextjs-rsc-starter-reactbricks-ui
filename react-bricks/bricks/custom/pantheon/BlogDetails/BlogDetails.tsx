import {
  LayoutProps,
  containerWidthSideGroup,
} from '@/react-bricks/bricks/react-bricks-ui/LayoutSideProps'
import { isAdmin, types } from 'react-bricks/rsc'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import Container from '../../../react-bricks-ui/shared/components/Container'
import Section from '../../../react-bricks-ui/shared/components/Section'
import { markdownComponents } from '../markdownComponents'

import ImgBrick from './pantheon-blog-brick.png'

interface BlogDetailsProps extends LayoutProps {
  title: string
  markdownContent: string
}

const BlogDetails: types.Brick<BlogDetailsProps> = ({
  title,
  markdownContent,
  width,
}) => {
  if (isAdmin() && !markdownContent) {
    return (
      <Section>
        <Container>
          <p className="text-lg text-center italic">
            Content Publisher content will appear here
          </p>
        </Container>
      </Section>
    )
  }
  return (
    <Section>
      <Container size={width} paddingTop="0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {markdownContent}
        </ReactMarkdown>
      </Container>
    </Section>
  )
}

BlogDetails.schema = {
  name: 'blog-details',
  label: 'Pantheon Blog Details',
  previewImageUrl: ImgBrick.src,
  getDefaultProps: () => ({}),
  mapExternalDataToProps: (article) => {
    const markdown = article?.content || ''
    const markdownCleaned = markdown.replace(/\s*\{#h\.[^}]+\}/g, '')

    return {
      markdownContent: markdownCleaned,
    }
  },

  // Sidebar Edit controls for props
  sideEditProps: [containerWidthSideGroup],
}

export default BlogDetails
