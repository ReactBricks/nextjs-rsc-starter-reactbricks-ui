import type { Metadata } from 'next'
import { fetchPage, getMetadata } from 'react-bricks/rsc'

import PostListItem from '@/components/PostListItem'
import TagListItem from '@/components/TagListItem'
import ErrorNoKeys from '@/components/errorNoKeys'
import config from '@/react-bricks/config'
import { fetchBlogPosts, Post } from '@/react-bricks/external-api'

export const dynamic = 'force-dynamic'

const getData = async (
  locale: string
): Promise<{
  posts: Post[] | null
  tags: string[] | null
  errorNoKeys: boolean
  errorPage: boolean
}> => {
  let errorNoKeys: boolean = false
  let errorPage: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true

    return {
      posts: null,
      tags: null,
      errorNoKeys,
      errorPage,
    }
  }

  const posts = await fetchBlogPosts()
  if (!posts) {
    errorPage = true
    return {
      posts: null,
      tags: null,
      errorNoKeys,
      errorPage,
    }
  }

  // tags contains all the tags in the posts array
  const tags = Array.from(
    new Set(posts.reduce((acc, post) => acc.concat(post.tags), [] as string[]))
  ).sort()

  return {
    posts,
    tags,
    errorNoKeys,
    errorPage,
  }
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = await fetchPage({
    slug: 'blog-template',
    language: params.lang,
    config,
    // fetchOptions: { next: { revalidate: 3 } },
  }).catch(() => {
    return null
  })

  if (!page?.meta) {
    return {}
  }

  const metadata = getMetadata(page)
  metadata.title = 'Our latest articles'
  metadata.description = 'React Bricks  - Our latest articles'

  return metadata
}

export default async function Page(props: {
  params: Promise<{ lang: string }>
}) {
  const params = await props.params
  const { tags, posts, errorNoKeys } = await getData(params.lang)

  return (
    <>
      {!errorNoKeys && (
        <>
          <div className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h1 className="max-w-2xl text-4xl sm:text-6xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white pb-4 mt-10 sm:mt-12 mb-4">
                Our latest articles
              </h1>

              <div className="flex flex-wrap items-center">
                {tags?.map((tag) => (
                  <TagListItem tag={tag} key={tag} />
                ))}
              </div>

              <hr className="mt-6 mb-10 dark:border-gray-600" />

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:gap-12">
                {posts?.map((post) => {
                  return (
                    <PostListItem
                      key={post.id}
                      title={post.title}
                      href={post.metadata.slug}
                      content={post.metadata.description || ''}
                      author={null}
                      date={''}
                      featuredImg={{
                        src: post.metadata.image,
                        alt: post.title,
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {errorNoKeys && <ErrorNoKeys />}
    </>
  )
}
