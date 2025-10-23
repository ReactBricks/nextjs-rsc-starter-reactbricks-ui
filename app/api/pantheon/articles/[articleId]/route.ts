// app/api/pantheon/articles/[articleId]

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const { articleId } = await params

    if (!articleId) {
      return Response.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const token = process.env.PANTHEON_TOKEN
    const siteId = process.env.PANTHEON_PAGES_SITE_ID

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
            id: "${articleId}"
            contentType: TEXT_MARKDOWN
          ) {
            id
            title
            metadata
            content
            tags
          }
        }`,
        variables: {},
      }),
    })
    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
