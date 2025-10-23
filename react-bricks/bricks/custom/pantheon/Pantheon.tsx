import { isAdmin, types } from 'react-bricks/rsc'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { fetchArticle, fetchArticles } from '@/react-bricks/external-api'
import {
  LayoutProps,
  containerWidthSideGroup,
} from '../../react-bricks-ui/LayoutSideProps'
import Container from '../../react-bricks-ui/shared/components/Container'
import Section from '../../react-bricks-ui/shared/components/Section'
import { markdownComponents } from './markdownComponents'

import ImgBrick from './pantheon-brick.png'

interface PantheonProps extends LayoutProps {
  article: { title: string; id: string }
  markdownContent: string
}

const Pantheon: types.Brick<PantheonProps> = ({ markdownContent, width }) => {
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

Pantheon.schema = {
  name: 'pantheon',
  label: 'Pantheon',
  previewImageUrl: ImgBrick.src,
  getDefaultProps: () => ({
    width: 'medium',
  }),
  getExternalData: (page, brickProps) => {
    return fetchArticle(brickProps?.article?.id || '')
      .then((article) => {
        const markdown = article?.content || ''
        const markdownCleaned = markdown.replace(/\s*\{#h\.[^}]+\}/g, '')

        return {
          markdownContent: markdownCleaned,
        }
      })
      .catch((error) => {
        return {
          markdownContent: '',
        }
      })
  },

  // Sidebar Edit controls for props
  sideEditProps: [
    {
      name: 'article',
      label: 'Article',
      type: types.SideEditPropType.Autocomplete,
      autocompleteOptions: {
        getOptions: (input: string) => {
          if (!input || input.length < 2) {
            return Promise.resolve([])
          }

          return fetchArticles(input)
            .then((articles) => {
              if (!articles) {
                return []
              }

              return articles as Array<{ id: string; title: string }>
            })
            .catch((error) => {
              return []
            })
        },
        getKey: (option: any) => option.id,
        getLabel: (option: any) => option.title,
        debounceTime: 200,
        // getNoOptionsMessage?: (input?: string) => string
      },
      helperText: 'Select the article and save.',
    },
    containerWidthSideGroup,
  ],
}

export default Pantheon
