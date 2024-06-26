interface Props {
  width: string
  height: string
  title: string
}
export default function WarningIcon({ width, height, title }: Props) {
  return (
    <picture title={title} className="warning-icon">
      <svg
        className="svg-icon"
        fill="red"
        height={width}
        width={height}
        viewBox="0 0 489.418 489.018"
      >
        <g>
          <path
            d="M244.709,389.496c18.736,0,34.332-14.355,35.91-33.026l24.359-290.927c1.418-16.873-4.303-33.553-15.756-46.011
		C277.783,7.09,261.629,0,244.709,0s-33.074,7.09-44.514,19.532C188.74,31.99,183.022,48.67,184.44,65.543l24.359,290.927
		C210.377,375.141,225.973"
          />
          <path
            d="M244.709,410.908c-21.684,0-39.256,17.571-39.256,39.256c0,21.683,17.572,39.254,39.256,39.254
          s39.256-17.571,39.256-39.254C283.965,428.479,266.393,410.908,244.709,410.908z"
          />
        </g>
      </svg>
    </picture>
  )
}
