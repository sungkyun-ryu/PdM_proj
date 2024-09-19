import Nav from "../layouts/Nav";
import Chart from "../../components/Chart";
import Button from "../../components/Button";
import Selection from "../../components/Selection";
import { useState, useRef } from "react";
import WebSocketProvider from "../../components/WebSocketProvider";
import { asset_names, ids_assets } from "../../components/Assets";

export default function MainPage() {

  const [message, setMessage] = useState('');
  const [assetName, setAssetName] = useState('P.O.REEL')
  const [assetId, setAssetId] = useState('471e8e21-9649-4405-8da7-ad8900ad0b49');


  const sendingMessage = (e) => {
    setAssetName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(assetName)
  }

  const handleIdChange = (e) => {
    setAssetId(e.target.value);
  };

  const availableIds = ids_assets[assetName] || [];

  // const handleDisconnect = () => {
  //   if (socket) {
  //     socket.close();
  //   }
  // };

  return (
    <>
      <header className='bg-black p-3'>
        <Nav />
      </header>
      <div className='flex justify-center p-3'>
        <div className='border-4 rounded-full border-black w-2/3 flex justify-between'>
          <form className='flex items-center justify-between py-5 px-8 w-full' onSubmit={handleSubmit}>
            <div className='flex'>
              <label className="flex text-xl font-bold py-3 pr-8 items-center" > <span>Asset :</span> &nbsp;
                <Selection choices={asset_names} text={'font-normal text-lg'}
                  func={sendingMessage}
                />
              </label>

              <label className="flex text-xl font-bold items-center" > <span>Asset ID :</span> &nbsp;
                <Selection choices={availableIds} text={'font-normal text-lg'}
                  func={handleIdChange} />
              </label>
            </div>

            <Button type='submit' name='START' text='bg-blue-500 text-white px-4 py-1 rounded-full shadow
                                           hover:bg-blue-600 focus:outline-none focus:ring-2
                                           focus:ring-blue-400 focus:ring-opacity-75 mr-4'/>

          </form>
        </div>
      </div>
      <WebSocketProvider message={message} />
    </>

  )
}
