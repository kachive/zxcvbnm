import { FC } from 'react'

interface BoxProps {
  title: string;
  content: string;
  year: string;
}

export const Box: FC<BoxProps> = ({ title, content, year }) => {
  return (
    <div className="box">
      <h1>{title}</h1>
      <p>{content}</p>
      <footer>© {year}</footer>
    </div>
  )
} 