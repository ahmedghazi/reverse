import type { ElementType } from "react";

type Props = {
  as?: ElementType;
  children: string;
  className?: string;
  layers?: number; // > 1: each char is a masked column of identical glyphs
  flip?: boolean; // each char is a 3D drum, back face = reversed word's char
};

export default function ReverseText({
  as: Tag = "span",
  children,
  className = "",
  layers = 1,
  flip = false,
}: Props) {
  const chars = Array.from(children);
  return (
    <Tag
      className={`reverse-text ${className}`}
      aria-label={children}
      data-reverse=''>
      {chars.map((c, i) =>
        flip ? (
          <span key={i} className='char char--flip' aria-hidden='true'>
            <span className='char-flip'>
              <span className='char-face char-face--front'>{c}</span>
              <span className='char-face char-face--back'>
                {chars[chars.length - 1 - i]}
              </span>
            </span>
          </span>
        ) : layers > 1 ? (
          <span key={i} className='char char--stacked' aria-hidden='true'>
            <span className='char-stack'>
              {Array.from({ length: layers }, (_, l) => (
                <span key={l} className='char-layer'>
                  {c}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} className='char' data-char={c} aria-hidden='true' />
        ),
      )}
    </Tag>
  );
}
