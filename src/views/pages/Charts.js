import Chart from "../../components/Chart";
import Selection from "../../components/Selection";
import Nav from "../layouts/Nav";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { DataFetch, RowDataFetch } from "../../functions/DataFetching";
import { generateUniqueId, addingUniqueId } from "../../functions/ProduceRows";
import { useState, useEffect } from "react";
import CheckBx from "../../components/CheckBx";
import ProduceCols from "../../functions/ProduceCols";


const asset_names = ['P.O.REEL', '#1-1 BRIDLE ROLL', 'ENTRY ACCUMULATOR', '#2-3 BRIDLE ROLL', '#3-1 BRIDLE ROLL', 'EXIT ACCUMULATOR',
  '#4-1 BRIDLE ROLL', 'TENSION REEL', '#1 P.O.REEL', '#2 P.O.REEL', '#1-1 BRIDLE ROLL', 'INLET SEAL ROLL UPPER', '#2-1 BRIDLE ROLL',
  '#3-2 BRIDLE ROLL', 'OUTLET SEAL ROLL UPPER', '#4-2 BRIDLE ROLL', 'TENSION REEL', '#1-2 BRIDLE ROLL', 'ENTRY ACCUMULATOR',
  '#2-1 BRIDLE ROLL', '#3-3 BRIDLE ROLL', '#4-1 BRIDLE ROLL', 'EXIT ACCUMULATOR', '#5-2 BRIDLE ROLL', 'TENSION REEL',
  'LEFT REEL', 'MILL', 'RIGHT REEL', 'DCM COOLING BLOWER', 'LEFT REEL', 'MILL', 'RIGHT REEL', 'DCM COOLING BLOWER',
  'UNCOILER', 'ENTRY BRIDLE ROLL', 'RECOILER', 'EXIT BRIDLE ROLL', 'DECOILER', '1-1 S-ROLL', '1-2 S-ROLL', '1-3 S-ROLL',
  '1-4 S-ROLL', '2-1 S-ROLL', '2-2 S-ROLL', '2-3 S-ROLL', '2-4 S-ROLL', 'RECOILER']

const col_names = ['rms_x', 'rms_y', 'rms_z', 'rms_xyz', 'vel_rms_x', 'vel_rms_y', 'vel_rms_z', 'vel_rms_xyz',
  'skewness_x', 'skewness_y', 'skewness_z', 'vel_skewness_x', 'vel_skewness_y', 'vel_skewness_z', 'kurtosis_x', 'kurtosis_y', 'kurtosis_z',
  'vel_kurtosis_x', 'vel_kurtosis_y', 'vel_kurtosis_z', 'crest_factor_x', 'crest_factor_y', 'crest_factor_z', 'vel_crest_factor_x',
  'vel_crest_factor_y', 'vel_crest_factor_z', 'peak_x', 'peak_y', 'peak_z', 'vel_peak_x', 'vel_peak_y', 'vel_peak_z', 'peak2peak_x',
  'peak2peak_y', 'peak2peak_z', 'vel_peak2peak_x', 'vel_peak2peak_y', 'vel_peak2peak_z','temperature', 'voltage', ]

export default function Charts() {

  const [asset, setAsset] = useState('P.O.REEL');
  const [sDate, setSDate] = useState('');
  const [sTime, setSTime] = useState('');
  const [eDate, setEDate] = useState('');
  const [eTime, setETime] = useState('');
  const [tableRows, setTableRows] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isChartsVisible, setIsChartsVisible] = useState(false);
  const [columns, setColumns] = useState([])
  const [selectedRow, setSelectedRow] = useState(null);
  const [waveData, setWaveData] = useState([]);

  useEffect(() => {
    const now = new Date();
    const defaultDate = now.toISOString().split('T')[0];
    const defaultTime = now.toTimeString().split(' ')[0].substring(0, 5);

    setEDate(defaultDate);
    setETime(defaultTime);
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setShowCheckboxes(false);

    if (selectedCheckboxes.length === 0) {
      alert('Please select at least one checkbox.');
      setShowCheckboxes(true);
      return;
    }

    let eUnixTime;
    let sUnixTime;

    if (eDate && eTime) {
      const eDateTimeString = `${eDate}T${eTime}`;
      const eDateTime = new Date(eDateTimeString);
      eUnixTime = Math.floor(eDateTime.getTime() / 1000);
    }

    if (sDate && sTime) {
      const sDateTimeString = `${sDate}T${sTime}`;
      const sDateTime = new Date(sDateTimeString);
      sUnixTime = Math.floor(sDateTime.getTime() / 1000);
    }
    else {
      sUnixTime = eUnixTime - (7 * 24 * 60 * 60);
    }

    await DataFetch(asset, sUnixTime, eUnixTime, selectedCheckboxes)
      .then(result => addingUniqueId(result))
      .then(result => setTableRows(result))
      .then(() => setIsTableVisible(true))
      .then(generateUniqueId.reset())


    setColumns(ProduceCols(selectedCheckboxes));
    setIsChartsVisible(true);
    // console.log('===> selectedcheck', selectedCheckboxes)
    // console.log('===> tablerows', tableRows)
  }

  const handleSelectionChange = (e) => {
    setAsset(e.target.value);
  };

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
        <div className=' w-5/6 justify-center items-center p-10 mb-36 border-b-4 border-gray-800 py-2'>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between">
              <label className="flex text-xl font-bold p-3 items-center" > <span>Asset:</span> &nbsp;
                <Selection choices={asset_names} text={'font-normal text-lg'} func={handleSelectionChange} />
              </label>

              <div className="flex px-10 justify-center items-center">
                <label htmlFor='date' className="text-xl block font-bold px-5">Start:</label>
                <input type='date' id='sDate' name='sDate' className='w-full text-lg'
                  onChange={(e) => setSDate(e.target.value)} />
                <input type='time' id='sTime' name='sTime' className='w-full text-lg'
                  onChange={(e) => setSTime(e.target.value)} />
              </div>

              <div className="flex px-10 items-center">
                <label htmlFor='time' className="text-xl block font-bold px-5">End:</label>
                <input type='date' id='eDate' name='sDate' className='w-full text-lg' value={eDate}
                  onChange={(e) => setEDate(e.target.value)} />
                <input type='time' id='eTime' name='sTime' className='w-full text-lg' value={eTime}
                  onChange={(e) => setETime(e.target.value)} />
              </div>

              <div className='flex items-center'>
                <Button type='submit' name='SUBMIT' text='bg-blue-500 text-white px-4 py-1 rounded-full shadow
                                           hover:bg-blue-600 focus:outline-none focus:ring-2
                                           focus:ring-blue-400 focus:ring-opacity-75'/>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='px-10'>
        <div className="mb-3">
          <CheckBx text='font-bold text-xl' cols={col_names}
            selectedCheckboxes={selectedCheckboxes} setSelectedCheckboxes={setSelectedCheckboxes}
            isVisible={showCheckboxes} setIsVisible={setShowCheckboxes} />
        </div>
        {isTableVisible && <Table rows={tableRows} columns={columns} text='mb-20'
        // onRowSelect={handleRowSelect} 
        />}
        {isChartsVisible && selectedCheckboxes.map((item) => (
          <Chart key={item} cols={selectedCheckboxes} vis={item} data={tableRows} />
        ))}

        {/* {isChartsVisible && <Chart cols={selectedCheckboxes} vis={'rms_y'} data={tableRows}/>} */}
        {/* {isChartsVisible && <Chart vis='Y-Axis' />}
        {isChartsVisible && <Chart vis='Z-Axis' />} */}
      </div>
    </div>
  )
};
