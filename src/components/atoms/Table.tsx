interface Props {
  children?: React.ReactNode
}
export default function Table({ children }: Props) {
  return <div className="game-table">{children}</div>
}
