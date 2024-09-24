import Nav from "../layouts/Nav";
import Button from "../../components/Button";
import Selection from "../../components/Selection";
import Gauge from "../../components/Gauge";
import { useState, useRef, useEffect } from "react";
import WebSocketProvider from "../../components/WebSocketProvider";
import { asset_names, ids_assets } from "../../components/Assets";
import { PostDataFetch } from "../../functions/DataFetching";

export default function MainPage() {

  const [message, setMessage] = useState('');
  const [assetName, setAssetName] = useState('')
  const [assetId, setAssetId] = useState('');
  const [isChartsVisible, setIsChartsVisible] = useState(false)
  const [chartStyle, setChartStyle] = useState('')
  const availableIds = ids_assets[assetName] || [];
  // const temp = useRef('')
  // const volt = useRef('')
  const [temp, setTemp] = useState('')
  const [volt, setVolt] = useState('')
  const handleNameChange = (e) => {
    setAssetName(e.target.value)
    setAssetId('')
  }

  const handleIdChange = (e) => {
    setAssetId(e.target.value);
  };

  const handleStyleChange = (e) => {
    setChartStyle(e.target.value)
    console.log(chartStyle)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsChartsVisible(true)
    const param = { 'asset_id': assetId }
    if (chartStyle === 'DYNAMIC') { setMessage(assetId); }
    else {
      PostDataFetch(param, 'http://192.168.0.126:8080/waveform')
        .then(result => console.log(result))
    }
    PostDataFetch(param, 'http://192.168.0.126:8080/tempvolt')
      .then(result => {    
        setVolt(result.voltage);
        setTemp(result.temperature)
      })
  }

  console.log(temp.current, volt.current)

  return (
    <>
      <header className='bg-black p-3'>
        <Nav />
      </header>
      <div className='flex justify-center p-3'>
        <div className='border-4 rounded-full border-black w-auto flex justify-between'>

          <form className='flex items-center justify-between py-5 px-8 w-full' onSubmit={handleSubmit}>
            <div className='flex mr-10'>
              <label className="flex text-xl font-bold py-3 pr-8 items-center" > <span>Asset :</span> &nbsp;
                <Selection choices={asset_names} text={'font-normal text-lg'}
                  func={handleNameChange} d_value={'Please Select Asset Name'}
                />
              </label>

              <label className="flex text-xl font-bold py-3 pr-8 items-center" > <span>Asset ID :</span> &nbsp;
                <Selection choices={availableIds} text={'font-normal text-lg'}
                  func={handleIdChange} d_value={'Please Select Asset Id '}
                  selectedValue={assetId} />
              </label>

              <label className="flex text-xl font-bold items-center" > <span>Chart Style :</span> &nbsp;
                <Selection choices={['DYNAMIC', 'STATIC']} text={'font-normal text-lg'}
                  func={handleStyleChange} d_value={'Chart Style '} />
              </label>
            </div>

            <Button type='submit' name='START' text='bg-blue-500 text-white px-4 py-1 rounded-full shadow
                                           hover:bg-blue-600 focus:outline-none focus:ring-2
                                           focus:ring-blue-400 focus:ring-opacity-75 mr-4'/>
            {/* <Button type='submit' name='END' text='bg-blue-500 text-white px-4 py-1 rounded-full shadow
                                           hover:bg-blue-600 focus:outline-none focus:ring-2
                                           focus:ring-blue-400 focus:ring-opacity-75 mr-4'/> */}
          </form>
        </div>
      </div>

      <div className="flex w-full p-10 ">

        <div className="w-2/3 flex flex-col justify-center items-center">
          {isChartsVisible && <span className='font-bold text-3xl border-b-4 border-black'>
            RealTime Waveform Charts
          </span>}
          {/* {isChartsVisible && <WebSocketProvider message={message} />} */}
          {/* {message && <WebSocketProvider message={message} />} */}
          <WebSocketProvider message={message} />
        </div>
        <div className='w-1/3 justify-start'>
          <div className='h-1/2' >
            {isChartsVisible && (
            <>
            <div className='pb-16'><span className='font-bold text-3xl border-b-4 border-black'>
              Temperature
            </span></div>
            <Gauge opt={'temp'} val={temp}/>
            </>)}
          </div>
          <div className='h-1/2 mt-20'>
            {isChartsVisible && (
              <>
              <div className='pb-16'><span className='font-bold text-3xl border-b-4 border-black '>
              Voltage
            </span></div>
            <Gauge opt={'volt'} val={volt} /></>)}
          </div>
        </div>
      </div>

    </>
  )
}
