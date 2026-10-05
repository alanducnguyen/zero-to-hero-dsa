import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from '@/lib/useTheme';

export function Markdown({ children }: { children: string }) {
  const { dark } = useTheme();
  return (
    <div className="prose-dsa">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const m = /language-(\w+)/.exec(className ?? '');
            const text = String(children).replace(/\n$/, '');
            if (!m) return <code {...props}>{children}</code>;
            return (
              <Highlight code={text} language={m[1]} theme={dark ? themes.nightOwl : themes.github}>
                {({ tokens, getLineProps, getTokenProps }) => (
                  <code>{tokens.map((line, i) => (<div key={i} {...getLineProps({ line })}>{line.map((t, k) => <span key={k} {...getTokenProps({ token: t })} />)}</div>))}</code>
                )}
              </Highlight>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
