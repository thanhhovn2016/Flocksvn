import * as React from "react"

const SvgComponent = (props) => (
  <svg
    
    xmlns="http://www.w3.org/2000/svg"
    x={0}
    y={0}
    viewBox="0 0 296 296"
    style={{
      enableBackground: "new 0 0 296 296",
    }}
    xmlSpace="preserve"
    id={props.id}
    {...props}
    onClick={props.onClick}
    
  >
    <style>{".st1{fill:#a50064}"}</style>
    <path
      d="M276 0H20C9 0 0 9 0 20v256c0 11 9 20 20 20h256c11 0 20-9 20-20V20c0-11-9-20-20-20z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#fff",
      }}
    />
    <path
      className="st1"
      d="M58.2 245.6c-.5 0-.9.2-1.2.6l-3.3 5-3.3-5c-.3-.4-.6-.6-1.1-.6h-.1c-.7 0-1.2.5-1.2 1.2v9.6c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2v-6l2.3 3.4c.5.7 1.5.7 2 0l2.3-3.4v5.9c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2v-9.6c0-.5-.5-1.1-1.2-1.1zM93.8 251.3c.6-.6 1-1.4 1-2.4 0-.8-.3-1.6-.9-2.1-.7-.7-1.9-1.1-3.2-1.1h-3.9c-.7 0-1.2.5-1.2 1.2v9.5c0 .7.5 1.2 1.2 1.2h4.1c2.7 0 4.5-1.4 4.5-3.6 0-1.2-.6-2.1-1.6-2.7zM88 248h2.6c.8 0 1.7.2 1.7 1.2 0 1.1-1 1.3-1.8 1.3H88V248zm2.9 7.2h-3v-2.5h2.8c1.5 0 2.2.4 2.2 1.3 0 1.1-1.2 1.2-2 1.2zM72.5 245.5c-3.4 0-6.1 2.7-6.1 6.2s2.6 6.1 6 6.1 6.1-2.7 6.1-6.2-2.6-6.1-6-6.1zm3.6 6.1c0 2.1-1.5 3.8-3.6 3.8-2 0-3.6-1.6-3.6-3.8 0-2.1 1.5-3.8 3.6-3.8 2 0 3.6 1.6 3.6 3.8zM205.3 123.3c23.6 0 42.7-19.1 42.7-42.7s-19.1-42.7-42.7-42.7-42.7 19.1-42.7 42.7c.1 23.6 19.2 42.7 42.7 42.7zm0-60.8c10 0 18.1 8.1 18.1 18.1s-8.1 18.1-18.1 18.1-18.1-8.1-18.1-18.1c0-9.9 8.1-18.1 18.1-18.1zM103.6 245.6c-.7 0-1.2.5-1.2 1.2v9.6c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2v-9.6c0-.7-.5-1.2-1.2-1.2zM213 245.6c-.7 0-1.2.5-1.2 1.2v6.3l-5.4-6.8c-.2-.3-.5-.6-1.1-.6h-.2c-.7 0-1.2.5-1.2 1.2v9.6c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2V250l5.5 7c.2.3.6.6 1.2.6s1.2-.5 1.2-1.2v-9.6c0-.7-.5-1.2-1.2-1.2zM229.2 255.2h-5.5v-2.5h4.7c.6 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2h-4.7V248h5.4c.6 0 1.2-.5 1.2-1.2 0-.6-.5-1.2-1.2-1.2h-6.6c-.7 0-1.2.5-1.2 1.2v9.5c0 .7.5 1.2 1.2 1.2h6.7c.6 0 1.2-.5 1.2-1.2-.1-.6-.6-1.1-1.2-1.1zM246.8 245.6c-.6 0-.9.4-1.1.6l-3 4.4-3-4.4c-.2-.2-.5-.6-1.1-.6-.7 0-1.2.5-1.2 1.2 0 .3.1.5.3.8l3.8 5.4v3.5c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2V253l3.9-5.4c.1-.2.3-.4.3-.8-.1-.7-.6-1.2-1.3-1.2zM205.3 141.7c-23.6 0-42.7 19.1-42.7 42.7s19.1 42.7 42.7 42.7S248 208 248 184.4s-19.1-42.7-42.7-42.7zm0 60.8c-10 0-18.1-8.1-18.1-18.1s8.1-18.1 18.1-18.1 18.1 8.1 18.1 18.1c.1 10-8.1 18.1-18.1 18.1zM190.9 245.5c-3.4 0-6.1 2.7-6.1 6.2s2.6 6.1 6 6.1 6.1-2.7 6.1-6.2c.1-3.5-2.5-6.1-6-6.1zm3.6 6.1c0 2.1-1.5 3.8-3.6 3.8-2 0-3.6-1.6-3.6-3.8 0-2.1 1.5-3.8 3.6-3.8 2 0 3.6 1.6 3.6 3.8zM176.6 245.6h-.1c-.4 0-.8.2-1.1.6l-3.3 5-3.3-5c-.3-.4-.6-.6-1.1-.6h-.1c-.7 0-1.2.5-1.2 1.2v9.6c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2v-6l2.3 3.3c.3.4.6.6 1 .6.2 0 .7-.1 1-.6l2.3-3.4v5.9c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2v-9.6c0-.4-.5-1-1.2-1zM118.4 141.7c-7.2 0-13.9 2.4-19.2 6.4-5.3-4-12-6.4-19.2-6.4-17.7 0-32 14.3-32 32V227h24.5v-53.6c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2V227h24.5v-53.6c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2V227h24.5v-53.3c.1-17.6-14.2-32-31.9-32zM135.3 255.2h-5.5v-2.5h4.7c.6 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2h-4.7V248h5.4c.6 0 1.2-.5 1.2-1.2 0-.6-.5-1.2-1.2-1.2h-6.6c-.7 0-1.2.5-1.2 1.2v9.5c0 .7.5 1.2 1.2 1.2h6.7c.6 0 1.2-.5 1.2-1.2 0-.6-.6-1.1-1.2-1.1zM118.4 38c-7.2 0-13.9 2.4-19.2 6.4-5.3-4-12-6.4-19.2-6.4-17.7 0-32 14.3-32 32v53.3h24.5V69.7c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2v53.6h24.5V69.7c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2v53.6h24.5V70c.1-17.7-14.2-32-31.9-32zM119.2 255.2h-4.9v-8.4c0-.7-.5-1.2-1.2-1.2s-1.2.5-1.2 1.2v9.5c0 .7.5 1.2 1.2 1.2h6.1c.6 0 1.2-.5 1.2-1.2 0-.6-.6-1.1-1.2-1.1z"
    />
  </svg>
)

export default SvgComponent
