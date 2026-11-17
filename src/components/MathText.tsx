import React, {useMemo} from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
}

interface Segment {
  type: 'text' | 'inline' | 'display';
  content: string;
}

function parseMathSegments(input: string): Segment[] {
  const segments: Segment[] = [];
  // Match $$...$$ (display) or $...$ (inline), avoiding escaped \$
  const regex = /(\$\$[\s\S]+?\$\$|\$(?!\$)(?:\\.|[^$\\])+\$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: input.slice(lastIndex, match.index),
      });
    }
    const token = match[0];
    if (token.startsWith('$$') && token.endsWith('$$')) {
      segments.push({
        type: 'display',
        content: token.slice(2, -2).trim(),
      });
    } else {
      segments.push({
        type: 'inline',
        content: token.slice(1, -1).trim(),
      });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < input.length) {
    segments.push({
      type: 'text',
      content: input.slice(lastIndex),
    });
  }

  return segments;
}

export const MathText: React.FC<MathTextProps> = ({text, className = ''}) => {
  const rendered = useMemo(() => {
    const segments = parseMathSegments(text);
    return segments.map((seg, idx) => {
      if (seg.type === 'text') {
        return <React.Fragment key={idx}>{seg.content}</React.Fragment>;
      }
      try {
        const html = katex.renderToString(seg.content, {
          displayMode: seg.type === 'display',
          throwOnError: false,
          strict: false,
        });
        if (seg.type === 'display') {
          return (
            <span
              key={idx}
              className="block my-2 overflow-x-auto"
              dangerouslySetInnerHTML={{__html: html}}
            />
          );
        }
        return (
          <span
            key={idx}
            className="inline-block align-baseline mx-0.5"
            dangerouslySetInnerHTML={{__html: html}}
          />
        );
      } catch {
        return <code key={idx}>{seg.content}</code>;
      }
    });
  }, [text]);

  return <span className={className}>{rendered}</span>;
};

export default MathText;
