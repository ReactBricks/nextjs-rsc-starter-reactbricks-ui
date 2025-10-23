// app/api/pantheon/articles?q=<searchTerm>

import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q')
    const pageSize = searchParams.get('pageSize') || '5'

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
          articlesv3(filter: {title: {contains: "${q}"}}, pageSize: ${pageSize}) {
            articles {
              id
              title
              metadata
              tags
            }
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
