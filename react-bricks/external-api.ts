export interface Article {
  id: string
  title: string
  metadata: {
    image: string
    slug: string
    description: string
  }
  tags: string[]
}

export interface ArticleDetails {
  id: string
  title: string
  metadata: {
    image: string
    slug: string
    description: string
  }
  tags: string[]
  content: string
}

export interface Post {
  id: string
  title: string
  metadata: {
    image: string
    slug: string
    description: string
    author: string
  }
  tags: string[]
}

export interface PostDetails {
  id: string
  title: string
  publishedDate: number
  metadata: {
    image: string
    slug: string
    description: string
    author: string
  }
  tags: string[]
  content: string
}

export async function fetchBlogPosts(): Promise<Post[] | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pantheon/blog?q=&pageSize=20`
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  if (!data?.data?.articlesv3?.articles) {
    return null
  }

  return data?.data?.articlesv3?.articles
}

export async function fetchBlogPost(slug: string): Promise<PostDetails | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pantheon/blog/${slug}`
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  if (!data?.data?.article) {
    return null
  }

  return data?.data?.article
}

export async function fetchArticles(
  searchText: string
): Promise<Article[] | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pantheon/articles?q=${searchText}&pageSize=5`
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  if (!data?.data?.articlesv3?.articles) {
    return null
  }

  return data?.data?.articlesv3?.articles
}

export async function fetchArticle(
  articleId: string
): Promise<ArticleDetails | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pantheon/articles/${articleId}`
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  if (!data?.data?.article) {
    return null
  }

  return data?.data?.article
}
