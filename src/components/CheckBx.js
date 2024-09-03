// import { Checkbox, Box } from "@mui/material"
import { useState } from "react"

export default function CheckBx({ cols, text, selectedCheckboxes, setSelectedCheckboxes, isVisible, setIsVisible }) {

  // const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  const handleCheckboxChange = (label) => {
    setSelectedCheckboxes(prev => {
      if (prev.includes(label)) {
        return prev.filter(item => item !== label);
      } else {
        return [...prev, label];
      }
    });
  };
 
  return (
    <div>
      <button onClick={handleToggleVisibility} className='bg-blue-500 text-white px-4 py-1 rounded-full shadow
                                           hover:bg-blue-600 focus:outline-none focus:ring-2
                                           focus:ring-blue-400 focus:ring-opacity-75 '>
        {isVisible ? 'Hide Checkbox' : 'Show Checkbox'}
      </button>

      {isVisible && (
        <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {cols.map((label, index) => (
            <div key={index} className="flex items-center p-2 border border-gray-300 rounded">              
                <input type="checkbox" id={`checkbox-${index}`} className="mr-2"
                checked={selectedCheckboxes.includes(label)}
                onChange={() => handleCheckboxChange(label)}/>
                <label htmlFor={`checkbox-${index}`}>{label}</label>
            </div>
          ))
          }
        </div>
      )}
    </div>
  )
}
