import { types } from 'react-bricks/rsc'
import { fetchBlogPost } from './external-api'

const pageTypes: types.IPageType[] = [
  {
    name: 'page',
    pluralName: 'pages',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
  },
  {
    name: 'template',
    pluralName: 'templates',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    getExternalData: async (page, args: { slug: string }) => {
      if (!args || !args.slug) {
        return {}
      }

      const post = await fetchBlogPost(args.slug)
      if (!post) {
        return {}
      }

      // Missing Author Metadata
      // if (!post.metadata.author && post.tags.length > 0) {
      //   post.metadata.author = post.tags[post.tags.length - 1].replace(
      //     'author:',
      //     ''
      //   )
      //   post.tags.pop()
      // }

      return post
    },
    isEntity: true,
    template: [
      {
        slotName: 'blog-header',
        label: 'Blog Header',
        editable: true,
      },
      {
        slotName: 'content-publisher',
        label: 'Content Publisher',
        allowedBlockTypes: ['blog-details'],
        min: 1,
        max: 1,
        editable: true,
      },
      {
        slotName: 'blog-footer',
        label: 'Blog Footer',
        editable: true,
      },
    ],
  },
  {
    name: 'layout',
    pluralName: 'layout',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    isEntity: true,
    allowedBlockTypes: ['header', 'footer'],
  },
]

export default pageTypes
