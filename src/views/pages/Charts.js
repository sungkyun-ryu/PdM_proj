import Chart from "../../components/Chart";
import Selection from "../../components/Selection";
import Nav from "../layouts/Nav";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { DataFetch, RowDataFetch } from "../../functions/DataFetching";
import { generateUniqueId, addingUniqueId } from "../../functions/ProduceRows";
import { useState, useEffect, useRef } from "react";
import CheckBx from "../../components/CheckBx";
import ProduceCols from "../../functions/ProduceCols";
import { asset_names, col_names, ids_assets } from "../../components/Assets";

export default function Charts() {

  const [asset, setAsset] = useState('P.O.REEL');
  const [assetId, setAssetId] = useState('471e8e21-9649-4405-8da7-ad8900ad0b49');
  // const [sDate, setSDate] = useState('');
  // const [sTime, setSTime] = useState('');
  const [defaultDate, setDefaultDate] = useState('');
  const [defaultTime, setDefaultTime] = useState('');
  const sDate = useRef('')
  const sTime = useRef('')
  const eDate = useRef('')
  const eTime = useRef('')


  const [tableRows, setTableRows] = useState([]);
  const checkboxesRef = useRef([]);
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isChartsVisible, setIsChartsVisible] = useState(false);
  const [columns, setColumns] = useState([])
  // const [selectedRow, setSelectedRow] = useState(null);
  // const [waveData, setWaveData] = useState([]);

  useEffect(() => {
    const now = new Date();
    const nowDate = now.toISOString().split('T')[0];
    const nowTime = now.toTimeString().split(' ')[0].substring(0, 5);
 
    setDefaultDate(nowDate);
    setDefaultTime(nowTime);

    eDate.current = nowDate; 
    eTime.current = nowTime; 
    
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setShowCheckboxes(false);

    if (checkboxesRef.current.length === 0) {
      alert('Please select at least one checkbox.');
      setShowCheckboxes(true);
      return;
    }

    let eUnixTime;
    let sUnixTime;

    

    if (eDate.current && eTime.current) {
      const eDateTimeString = `${eDate.current}T${eTime.current}`;
      const eDateTime = new Date(eDateTimeString);
      eUnixTime = Math.floor(eDateTime.getTime() / 1000);
    }

    if (sDate.current && sTime.current) {
      const sDateTimeString = `${sDate.current}T${sTime.current}`;
      const sDateTime = new Date(sDateTimeString);
      sUnixTime = Math.floor(sDateTime.getTime() / 1000);
    }
    else {
      sUnixTime = eUnixTime - (7 * 24 * 60 * 60);
    }
 
    
    await DataFetch(asset, sUnixTime, eUnixTime, checkboxesRef.current)
      .then(result => addingUniqueId(result))
      .then(result => setTableRows(result))
      .then(() => setIsTableVisible(true))
      .then(generateUniqueId.reset())

    setColumns(ProduceCols(checkboxesRef.current));
    setIsChartsVisible(true);
  }

  const handleSelectionChange = (e) => {
    setAsset(e.target.value);

    const associated_ids = ids_assets[asset];
    if (associated_ids) {
      if (associated_ids.length === 1) {
        setAssetId(associated_ids[0])
      } else {
        setAssetId(null)
      }
    } else {
      setAssetId(null)
    }
  };

  const handleIdChange = (e) => {
    setAssetId(e.target.value);
  };

  const availableIds = ids_assets[asset] || [];

  // const handleRowSelect = ((selectedRowData) => {
  //   setSelectedRow(selectedRowData)
  //   // console.log(selectedRow['created_at'])
  //   // const created_at_row= selectedRow['created_at']
  //   // const asset_id_row = selectedRow['asset_id']
  //   // console.log(created_at_row, asset_id_row)
  //   // RowDataFetch({
  //   //   "asset_id": selectedRow['asset_id'],
  //   //   "created_at": selectedRow['created_at'],
  //   // })
  // });

  // useEffect(() => {
  //   if(selectedRow) {
  //   const created_at_row= selectedRow['created_at']
  //   const asset_id_row = selectedRow['asset_id']
  //   // console.log(created_at_row, asset_id_row)


  //   RowDataFetch({
  //     "asset_id":asset_id_row, 
  //     "created_at":created_at_row,
  //   })
  //   .then(resp => setWaveData(resp[0]))    
  //   .then(setIsChartsVisible(true))
  //   .catch(error => console.log('===> row fetching error', error))

  //   console.log('===> waveData::', waveData )
  // }
  // },[selectedRow]);

  // console.log('===> waveData::', waveData['created_at'])

  return (
    <div>
      <header className='bg-black p-3'>
        <Nav />
      </header>
      <div className="flex justify-center items-center p-3">
        <div className=' w-5/6 justify-center items-center p-10 mb-10 border-b-4 border-gray-800 py-2'>
          <form onSubmit={handleSubmit}>
            <div>
              <div className='flex justify-center items-center py-2'>
                <label className="flex text-xl pr-24 font-bold items-center" > <span>Asset :</span> &nbsp;
                  <Selection choices={asset_names} text={'font-normal text-lg'}
                    func={handleSelectionChange}
                  />
                </label>

                <label className="flex text-xl font-bold items-center" > <span>Asset ID :</span> &nbsp;
                  <Selection choices={availableIds} text={'font-normal text-lg'}
                    func={handleIdChange} />
                </label>
              </div>

              <div className='flex justify-center items-center py-2'>
                <div className='flex justify-start '>
                  <div className="flex items-center pr-24">
                    <label htmlFor='date' className="text-xl block font-bold">Start :</label> &nbsp;
                    <input type='date' id='sDate' name='sDate' className=' text-lg'
                      // onChange={(e) => setSDate(e.target.value)} 
                      onChange={(e) => (sDate.current = e.target.value)}
                      />
                    <input type='time' id='sTime' name='sTime' className=' text-lg'
                      // onChange={(e) => setSTime(e.target.value)} 
                      onChange={(e) => (sTime.current = e.target.value)}
                      />
                  </div>

                  <div className="flex pr-20 items-center ">
                    <label htmlFor='time' className="text-xl block font-bold pl-1 ">End :</label>
                    
                    <input type='date' id='eDate' name='eDate' className='text-lg' defaultValue={defaultDate}
                      // onChange={(e) => setEDate(e.target.value)} 
                      onChange={(e) => (eDate.current = e.target.value)}
                      />
                    <input type='time' id='eTime' name='eTime' className=' text-lg' defaultValue={defaultTime}
                      // onChange={(e) => setETime(e.target.value)} 
                      onChange={(e) => (eTime.current = e.target.value)}
                      />              
                  </div>

                </div>
                <div className='flex items-center'>
                  <Button type='submit' name='SUBMIT' text='bg-blue-500 text-white px-4 py-1 rounded-full shadow
                                           hover:bg-blue-600 focus:outline-none focus:ring-2
                                           focus:ring-blue-400 focus:ring-opacity-75'/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='px-10 pb-24'>
        <div>
          <CheckBx text='font-bold text-xl' cols={col_names}
                   isVisible={showCheckboxes} setIsVisible={setShowCheckboxes}
                   ref = {checkboxesRef}
          />
        </div>
        {isTableVisible && <Table rows={tableRows} columns={columns} text='mb-20'
        // onRowSelect={handleRowSelect} 
        />}
        {isChartsVisible && checkboxesRef.current.map((item) => (
          <div key={item} className='mb-5 border-b pb-10 border-gray-300'>
          <Chart key={item} cols={checkboxesRef.current} vis={item} data={tableRows} />
          </div>
        ))}
      </div>
    </div>
  )
};

