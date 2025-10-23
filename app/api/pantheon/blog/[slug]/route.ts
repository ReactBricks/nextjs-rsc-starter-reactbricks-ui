// app/api/pantheon/blog/[slug]

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!slug) {
      return Response.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const token = process.env.PANTHEON_TOKEN
    const siteId = process.env.PANTHEON_BLOG_SITE_ID

    if (!siteId || !token) {
      return Response.json(
        { error: 'Missing required enviroments parameters' },
        { status: 400 }
      )
    }

    const response = await fetch('https://gql.content.pantheon.io/query', {
      method: 'POST',
      headers: {
        accept: '*/*',
        origin: '*',
        'Content-Type': 'application/json',
        'pcc-site-id': siteId,
        'pcc-token': token,
      },
      body: JSON.stringify({
        query: `{
          article(
            slug: "${slug}"
            contentType: TEXT_MARKDOWN
          ) {
            id
            title
            publishedDate
            metadata
            content
            tags
          }
        }`,
        variables: {},
      }),
    })
    // console.log('called fetch with slug:', slug) // TODO: remove --- IGNORE ---
    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
