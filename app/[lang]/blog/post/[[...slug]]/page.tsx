import type { Metadata } from 'next'
import {
  JsonLd,
  PageViewer,
  cleanPage,
  fetchPage,
  getBricks,
  getMetadata,
  types,
} from 'react-bricks/rsc'
import { ClickToEdit } from 'react-bricks/rsc/client'

import ErrorNoKeys from '@/components/errorNoKeys'
import ErrorNoPage from '@/components/errorNoPage'
import config from '@/react-bricks/config'
import { fetchBlogPost } from '@/react-bricks/external-api'

export const dynamic = 'force-dynamic'

const getData = async (
  slug: any,
  locale: string
): Promise<{
  page: types.Page | null
  errorNoKeys: boolean
  errorPage: boolean
}> => {
  let errorNoKeys: boolean = false
  let errorPage: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true

    return {
      page: null,
      errorNoKeys,
      errorPage,
    }
  }

  let cleanSlug = ''

  if (!slug) {
    cleanSlug = '/'
  } else if (typeof slug === 'string') {
    cleanSlug = slug
  } else {
    cleanSlug = slug.join('/')
  }

  const page = await fetchPage({
    slug: 'blog-template',
    language: locale,
    config,
    getExternalDataArgs: { slug: cleanSlug },
    // fetchOptions: { next: { revalidate: 3 } },
  }).catch(() => {
    errorPage = true
    return null
  })

  return {
    page,
    errorNoKeys,
    errorPage,
  }
}

// export async function generateStaticParams({
//   params,
// }: {
//   params: { lang: string }
// }) {
//   if (!config.apiKey) {
//     return []
//   }

//   const posts = await fetchBlogPosts()
//   if (!posts) {
//     return []
//   }

//   const pages = posts.map((post) => ({
//     slug: post.metadata.slug.split('/'),
//   }))

//   return pages
// }

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>
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

  let cleanSlug = ''

  if (!params.slug) {
    cleanSlug = '/'
  } else if (typeof params.slug === 'string') {
    cleanSlug = params.slug
  } else {
    cleanSlug = params.slug.join('/')
  }

  const post = await fetchBlogPost(cleanSlug)
  metadata.title = post?.title || cleanSlug
  metadata.description = post?.metadata.description || ''

  return metadata
}

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>
}) {
  const params = await props.params
  const { page, errorNoKeys, errorPage } = await getData(
    params.slug?.join('/'),
    params.lang
  )

  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks()
  const pageOk = page ? cleanPage(page, config.pageTypes || [], bricks) : null

  return (
    <>
      {page?.meta && <JsonLd page={page}></JsonLd>}
      {pageOk && !errorPage && !errorNoKeys && (
        <PageViewer page={pageOk} main />
      )}
      {errorNoKeys && <ErrorNoKeys />}
      {errorPage && <ErrorNoPage />}
      {pageOk && config && (
        <ClickToEdit
          pageId={pageOk?.id}
          language={params.lang}
          editorPath={config.editorPath || '/admin/editor'}
          clickToEditSide={config.clickToEditSide}
        />
      )}
    </>
  )
}
