import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { PostDataFetch } from '../functions/DataFetching';
// import { useNavigate } from 'react-router-dom';


export default function AnomalyTable({ rows, columns, text }) {
    // const [selectedRow, setSelectedRow] = useState(null);
    // const navigate = useNavigate()

    // const handleRowSelection = (newSelectionModel) => {
    //     const newSelectedRow = newSelectionModel.length > 0 ? newSelectionModel[0] : null;
    //     setSelectedRow(newSelectedRow);
    // };  

    // const getSelectedRowData = () => {
    //     if (selectedRow === null) {
    //         return null; 
    //     }
    //     const row = rows.find(row => row.id === selectedRow);

    //     const bookmarkParams = {
    //         asset_id: row.asset_id,
    //         start_at: row.startTime,
    //         end_at: row.endTime,
    //         cols: row.cols,
    //     };
    //     // console.log('bookmarkParmas===>', bookmarkParams)
    //     navigate('/charts', { state: { bookmarkParams } });
    // };

    
    // useEffect(() => {
    //     const selectedRowData = getSelectedRowData();
    //     if (selectedRowData) {
    //         console.log('Selected Row Data:', selectedRowData);
    //     }
    // }, [selectedRow, rows]);

    return (
        <div>
            <Paper sx={{
                height: 400, width: '100%',
                border: '4px solid black',
            }} className={text}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    // initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection={false}
                    // selectionModel={selectedRow}
                    // onRowSelectionModelChange={handleRowSelection}
                    // onRowClick={handleRowSelection}
                    disableSelectionOnClick ={true}   
                    selectionModel={[]}
                    sx={{
                        border: 0,
                        '& .MuiDataGrid-columnHeaders': {
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            color: 'black',
                        }
                    }}
                />
            </Paper>
        </div>
    )
}

