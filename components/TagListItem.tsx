import React from 'react'
import Link from 'next/link'

interface TagListItemProps {
  tag: string
}

const TagListItem: React.FC<TagListItemProps> = ({ tag }) => {
  return (
    <Link
      href={`/blog/tag/${tag}`}
      className="inline-block text-sm font-semibold mr-2 mb-2 transform transition-all duration-200 text-sky-800 hover:text-sky-900 dark:text-gray-100 bg-sky-600/10 dark:bg-white/20 hover:bg-sky-600/20 dark:hover:hover:bg-sky-500/40  dark:hover:text-white hover:-translate-y-0.5 rounded-md py-1 px-2.5 border border-sky-800/10"
    >
      {tag}
    </Link>
  )
}

export default TagListItem
