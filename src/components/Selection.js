import { useState, useEffect } from "react"

export default function Selection({choices, func, text, d_value}) {

  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(choices)
  }, [choices])

  return (
    <div>
      <select onChange= {func} className={text} >
      {/* <option selected>{d_value}</option> */}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
