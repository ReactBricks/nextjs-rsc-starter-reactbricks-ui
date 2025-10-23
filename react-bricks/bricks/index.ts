import { types } from 'react-bricks/rsc'

import HeroUnit from './custom/MyHeroUnit'
import Pokemon from './custom/Pokemon'
import PantheonBlogDetails from './custom/pantheon/BlogDetails/BlogDetails'
import PantheonBlogTitle from './custom/pantheon/BlogTitle/BlogTitle'
import Pantheon from './custom/pantheon/Pantheon'
// import RegisterBrick from './custom/RegisterBrick/RegisterBrick'
import reactBricksUITheme from './react-bricks-ui'

const bricks: types.Theme[] = [
  reactBricksUITheme, // React Bricks UI
  {
    themeName: 'Default',
    categories: [
      {
        categoryName: 'Custom bricks',
        bricks: [
          HeroUnit,
          Pokemon,
          Pantheon,
          PantheonBlogDetails,
          PantheonBlogTitle,
        ], // Custom Bricks
      },
    ],
  },
]

// const bricks = [HeroUnit]

export default bricks
