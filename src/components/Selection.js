import { useState, useEffect } from "react"

export default function Selection({choices, func, text}) {

  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(choices)
  }, [])

  return (
    <div>
      <select onChange= {func} className={text}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
