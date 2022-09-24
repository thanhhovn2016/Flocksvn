import * as React from "react"

const SvgComponent = (props) => (
  <svg
    width={90}
    height={90}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M45 0C20.18 0 0 20.18 0 45s20.18 45 45 45 45-20.18 45-45S69.82 0 45 0Z"
      fill="#A8C301"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M66.759 29.83a2.822 2.822 0 0 1 0 3.973L40.392 60.17a2.81 2.81 0 0 1-1.987.826 2.81 2.81 0 0 1-1.986-.826L23.235 46.986a2.822 2.822 0 0 1 0-3.972 2.822 2.822 0 0 1 3.973 0L38.405 54.21l24.381-24.38a2.79 2.79 0 0 1 3.973 0Z"
      fill="#fff"
    />
  </svg>
)

export default SvgComponent
