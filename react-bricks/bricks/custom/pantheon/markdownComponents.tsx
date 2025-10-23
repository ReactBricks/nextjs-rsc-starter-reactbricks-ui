import type { Components } from 'react-markdown'

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export const markdownComponents: Components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cx(
        'mt-12 mb-6 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100',
        'leading-tight scroll-mt-28',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cx(
        'mt-10 mb-4 text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100',
        'leading-snug scroll-mt-28',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cx(
        'mt-8 mb-3 text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100',
        'leading-snug scroll-mt-28',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cx(
        'mt-6 mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cx(
        'my-4 leading-7 text-slate-700 dark:text-slate-300',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cx(
        'text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300',
        'underline underline-offset-2 decoration-sky-400/40 hover:decoration-sky-500',
        className
      )}
      target={props.href?.startsWith('#') ? undefined : '_blank'}
      rel={props.href?.startsWith('#') ? undefined : 'noopener noreferrer'}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong
      className={cx(
        'font-semibold text-slate-900 dark:text-slate-100',
        className
      )}
      {...props}
    />
  ),
  em: ({ className, ...props }) => (
    <em
      className={cx('italic text-slate-800 dark:text-slate-200', className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cx(
        'my-6 border-l-4 border-slate-300 dark:border-slate-700 pl-4',
        'text-slate-700/90 dark:text-slate-300/90 italic',
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr
      className={cx('my-8 border-slate-200 dark:border-slate-700', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cx(
        'my-4 ml-6 list-disc space-y-2 marker:text-slate-400',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cx(
        'my-4 ml-6 list-decimal space-y-2 marker:text-slate-400',
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cx('pl-2 text-slate-700 dark:text-slate-300', className)}
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    // If code has a language class from remark/rehype (e.g. language-js)
    const language = /language-(\w+)/.exec(className || '')?.[1]

    if (language) {
      return (
        <pre
          className={cx(
            'my-6 overflow-x-auto rounded-lg bg-slate-900 text-slate-100',
            'p-4 leading-relaxed',
            className
          )}
        >
          <code
            className={cx(
              'font-mono text-sm',
              language ? `language-${language}` : undefined
            )}
            {...props}
          >
            {children}
          </code>
        </pre>
      )
    }

    return (
      <code
        className={cx(
          'font-mono text-sm',
          language ? `language-${language}` : undefined
        )}
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ className, ...props }) => (
    <pre
      className={cx(
        'my-6 overflow-x-auto rounded-lg bg-slate-900 p-4 text-slate-100',
        className
      )}
      {...props}
    />
  ),
  img: ({ className, ...props }) => (
    // Wrap in a figure-like style
    <img
      className={cx(
        'my-6 max-w-full border',
        //'border border-slate-200 dark:border-slate-800',
        className
      )}
      loading="lazy"
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-x-auto">
      <table
        className={cx(
          'w-full border-collapse text-left text-sm',
          'border border-slate-200 dark:border-slate-700',
          className
        )}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }) => (
    <thead
      className={cx('bg-slate-50 dark:bg-slate-800/50', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cx(
        'border-b border-slate-200 dark:border-slate-700 px-3 py-2',
        'font-semibold text-slate-900 dark:text-slate-100',
        className
      )}
      {...props}
    />
  ),
  tbody: ({ className, ...props }) => (
    <tbody
      className={cx(
        'divide-y divide-slate-200 dark:divide-slate-700',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cx(
        'px-3 py-2 align-top text-slate-700 dark:text-slate-300',
        className
      )}
      {...props}
    />
  ),
  del: ({ className, ...props }) => (
    <del className={cx('opacity-80', className)} {...props} />
  ),
  sup: ({ className, ...props }) => (
    <sup className={cx('text-xs align-super', className)} {...props} />
  ),
  sub: ({ className, ...props }) => (
    <sub className={cx('text-xs align-sub', className)} {...props} />
  ),
  // You can also override <br/>, <span/>, etc., if needed.
}
