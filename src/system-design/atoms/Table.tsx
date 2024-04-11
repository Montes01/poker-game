import "../../assets/components/table.scss"
interface Props {
  children?: React.ReactNode
}
export default function Table({ children }: Props) {
  return <div className="game-table" role="game-table">{children}</div>
}
