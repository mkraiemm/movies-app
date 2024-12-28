import { cn } from '@/lib/utils';

const typographyStyles = [
  {
    name: 'h1',
    className: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    example: 'Heading 1',
  },
  {
    name: 'h2',
    className: 'scroll-m-20 text-3xl font-semibold tracking-tight',
    example: 'Heading 2',
  },
  {
    name: 'h3',
    className: 'scroll-m-20 text-2xl font-semibold tracking-tight',
    example: 'Heading 3',
  },
  {
    name: 'h4',
    className: 'scroll-m-20 text-xl font-semibold tracking-tight',
    example: 'Heading 4',
  },
  {
    name: 'p',
    className: 'leading-7 [&:not(:first-child)]:mt-6',
    example: 'This is a paragraph of text that spans multiple lines to demonstrate the line height and spacing.',
  },
  {
    name: 'blockquote',
    className: 'mt-6 border-l-2 pl-6 italic',
    example: 'This is a blockquote that stands out from the rest of the text.',
  },
  {
    name: 'code',
    className: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    example: 'console.log("Hello World")',
  },
];

export function Typography() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Typography</h2>
      <div className="space-y-8">
        {typographyStyles.map((style) => (
          <div key={style.name} className="space-y-2">
            <div className="flex items-center gap-4">
              <code className="text-sm text-muted-foreground">{style.name}</code>
              <code className="text-xs text-muted-foreground">{style.className}</code>
            </div>
            <div className={cn(style.className)}>{style.example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}