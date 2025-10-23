import classNames from 'classnames'
import dayjs from 'dayjs'
import { isAdmin, types } from 'react-bricks/rsc'

import TagListItem from '@/components/TagListItem'
import { textColors } from '../../../react-bricks-ui/colors'
import {
  LayoutProps,
  sectionDefaults,
} from '../../../react-bricks-ui/LayoutSideProps'
import Container from '../../../react-bricks-ui/shared/components/Container'
import Section from '../../../react-bricks-ui/shared/components/Section'

export interface BlogTitleProps extends LayoutProps {
  title: string
  description: string
  author?: {
    name: string
    avatarUrl?: string
  }
  publishedAt?: Date
  tags: string[]
}

const BlogTitle: types.Brick<BlogTitleProps> = ({
  backgroundColor,
  borderTop,
  borderBottom,
  paddingTop,
  paddingBottom,
  title,
  description,
  author,
  publishedAt,
  tags,
}) => {
  return (
    <Section
      backgroundColor={{ color: '#fff', className: 'bg-sky-50' }}
      borderTop={borderTop}
      borderBottom="full"
    >
      <Container
        size="small"
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
      >
        <div className="flex items-center space-x-2">
          {
            author?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={author?.avatarUrl}
                alt="Author"
                className="rounded-full w-10 h-10"
              />
            ) : null
            // <DefaultAvatar className="rounded-full w-10 h-10" />
          }
          <div className="flex items-center space-x-1">
            <div
              className={classNames('leading-4 font-bold', textColors.GRAY_800)}
            >
              {author?.name || 'John Doe'}
            </div>
            <div>·</div>
            <div
              className={classNames('leading-4 mt-0.5', textColors.GRAY_600)}
            >
              {dayjs(publishedAt || new Date()).format('MMMM DD, YYYY')}
            </div>
          </div>
        </div>
        <ul className="mt-4 flex items-center flex-wrap gap-x-2">
          {tags?.map((tag) => (
            <TagListItem tag={tag} key={tag} />
          ))}
        </ul>
        <h1
          className={classNames(
            'mt-6 text-[40px] leading-tight font-bold',
            textColors.GRAY_800
          )}
        >
          {title}
        </h1>
        <p
          className={classNames(
            'text-[20px] mt-6 mb-6 border-l-6 border-sky-600/50 pl-4',
            textColors.GRAY_800
          )}
        >
          {description}
        </p>
      </Container>
    </Section>
  )
}

BlogTitle.schema = {
  name: 'pantheon-blog-title',
  label: 'Pantheon Blog Title',
  category: 'single column / blog',
  tags: ['blog', 'title', 'blog title'],
  playgroundLinkLabel: 'View source code on Github',
  previewImageUrl: `https://assets.reactbricks.com/68rj1q6frKY1SNB/images/master/UsRKmPU4TLpjd4n.png`,
  playgroundLinkUrl:
    'https://github.com/ReactBricks/react-bricks-ui/blob/master/src/blog/BlogTitle/BlogTitle.tsx',
  getDefaultProps: () => ({
    ...sectionDefaults,
    width: 'small',
    paddingTop: '12',
    paddingBottom: '8',
    title: 'A new fresh post',
    subtitle: 'With a beautiful subtitle',
  }),
  mapExternalDataToProps: (post) => {
    if (isAdmin() && !post.id) {
      return {
        title: 'Blog Post Title',
        description: 'This is a short description of the blog post.',
        tags: ['tag1', 'tag2', 'tag3'],
      }
    }

    return {
      title: post?.title,
      description: post?.metadata?.description,
      author: {
        name: post?.metadata?.author,
      },
      publishedAt: post?.publishedDate
        ? new Date(post.publishedDate)
        : undefined,
      tags: post?.tags || [],
    }
  },
}

// export default BlogTitle

// const BlogTitle: types.Brick<BlogTitleProps> = ({
//   title,
//   badgeColor,
//   maxNumber,
//   tags,
// }) => {
//   return (
//     <section className="py-8">
//       <div className="max-w-3xl mx-auto">
//         <Text
//           propName="title"
//           value={title}
//           placeholder="Type a title..."
//           renderBlock={({ children }) => (
//             <h3 className="text-sm text-blue-900/70 uppercase tracking-widest font-bold mb-2">
//               {children}
//             </h3>
//           )}
//         />

//         <div className="">
//           <ul className="flex items-center flex-wrap gap-x-2">
//             {tags?.slice(0, maxNumber).map((move) => (
//               <li
//                 className={`mt-2 py-0.5 px-2 font-semibold rounded-lg ${badgeColor?.className}`}
//                 key={move}
//               >
//                 {move}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   )
// }

// BlogTitle.schema = {
//   name: 'pantheon-blog-post-tags',
//   label: 'Pantheon Blog Post tags',
//   getDefaultProps: () => ({
//     title: 'tags',
//     badgeColor: {
//       color: 'blue',
//       className: 'bg-blue-200 text-blue-950',
//     },
//     maxNumber: 200,
//   }),
//   mapExternalDataToProps: (article) => {
//     return { tags: article?.tags || [] }
//   },

//   // Sidebar Edit controls for props
//   sideEditProps: [
//     {
//       name: 'badgeColor',
//       label: 'Badges Color',
//       type: types.SideEditPropType.Select,
//       selectOptions: {
//         display: types.OptionsDisplay.Color,
//         options: [
//           {
//             value: {
//               color: '#bfdbfe',
//               className: 'bg-blue-200 text-blue-950',
//             },
//             label: 'Blue',
//           },
//           {
//             value: {
//               color: '#a5f3fc',
//               className: 'bg-cyan-400/50 text-cyan-950',
//             },
//             label: 'Cyan',
//           },
//           {
//             value: {
//               color: '#fde68a',
//               className: 'bg-amber-200 text-amber-950',
//             },
//             label: 'Amber',
//           },
//           {
//             value: {
//               color: '#f5d0fe',
//               className: 'bg-fuchsia-200 text-fuchsia-950',
//             },
//             label: 'Fuchsia',
//           },
//         ],
//       },
//     },
//     {
//       name: 'maxNumber',
//       label: 'Max number of tags',
//       type: types.SideEditPropType.Range,
//       rangeOptions: {
//         min: 20,
//         max: 200,
//         step: 20,
//       },
//     },
//   ],
// }

export default BlogTitle
