import Nav from "../layouts/Nav";
import Chart from "../../components/Chart";
import Button from "../../components/Button";
import Selection from "../../components/Selection";
import { useState, useRef } from "react";
import WebSocketProvider from "../../components/WebSocketProvider";

const asset_names = ['P.O.REEL', '#1-1 BRIDLE ROLL', 'ENTRY ACCUMULATOR', '#2-3 BRIDLE ROLL', '#3-1 BRIDLE ROLL', 'EXIT ACCUMULATOR',
  '#4-1 BRIDLE ROLL', 'TENSION REEL', '#1 P.O.REEL', '#2 P.O.REEL', '#1-1 BRIDLE ROLL', 'INLET SEAL ROLL UPPER', '#2-1 BRIDLE ROLL',
  '#3-2 BRIDLE ROLL', 'OUTLET SEAL ROLL UPPER', '#4-2 BRIDLE ROLL', 'TENSION REEL', '#1-2 BRIDLE ROLL', 'ENTRY ACCUMULATOR',
  '#2-1 BRIDLE ROLL', '#3-3 BRIDLE ROLL', '#4-1 BRIDLE ROLL', 'EXIT ACCUMULATOR', '#5-2 BRIDLE ROLL', 'TENSION REEL',
  'LEFT REEL', 'MILL', 'RIGHT REEL', 'DCM COOLING BLOWER', 'LEFT REEL', 'MILL', 'RIGHT REEL', 'DCM COOLING BLOWER',
  'UNCOILER', 'ENTRY BRIDLE ROLL', 'RECOILER', 'EXIT BRIDLE ROLL', 'DECOILER', '1-1 S-ROLL', '1-2 S-ROLL', '1-3 S-ROLL',
  '1-4 S-ROLL', '2-1 S-ROLL', '2-2 S-ROLL', '2-3 S-ROLL', '2-4 S-ROLL', 'RECOILER']


export default function MainPage() {

  const [message, setMessage] = useState('');
  const [assetName, setAssetName] = useState('P.O.REEL')

  const sendingMessage = (e) => {
    setAssetName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setMessage(assetName)
  }

  return (
    <>
      <header className='bg-black p-3'>
        <Nav />
      </header>
      <div className='flex justify-center p-3'>
      <div className='border-4 rounded-full border-black w-2/3 flex justify-center'>
        <form className='flex items-center p-5' onSubmit={handleSubmit}>
          <label className="flex text-xl font-bold p-3 items-center" > <span>Asset:</span> &nbsp;
            <Selection choices={asset_names} text={'font-normal text-lg'} 
            func={sendingMessage}
             />
          </label>
          <Button type='submit' name='START' text='bg-blue-500 text-white px-4 py-1 rounded-full shadow
                                           hover:bg-blue-600 focus:outline-none focus:ring-2
                                           focus:ring-blue-400 focus:ring-opacity-75 mr-4'/>
          <Button type='click' name='STOP' text='bg-blue-500 text-white px-4 py-1 rounded-full shadow
                                           hover:bg-blue-600 focus:outline-none focus:ring-2
                                           focus:ring-blue-400 focus:ring-opacity-75'/>
        </form>
      </div>
      </div>
      <WebSocketProvider message = {message}/>
    </>

  )
}
