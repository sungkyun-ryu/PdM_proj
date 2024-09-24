
export const ProduceCols = (cols) => {
    return [
        { field: 'local_time', headerName: 'time', width: 200 },
        { field: 'asset_id', headerName: 'asset_ID', width: 350 },
        ...cols.map((item) => ({
             field: item , headerName: item, width: 150
        }))
    ];
};

export const BookmarkCols = [
        { field: 'asset_id', headerName: 'asset_id', width: 400 },
        { field: 'cols', headerName: 'features', width: 400 },
        { field: 'startTime', headerName: 'start_at', width: 200 },
        { field: 'endTime', headerName: 'end_at', width: 200 },
        { field: 'bookmark_name', headerName: 'comment', width: 200 },
        { field: 'regidate', headerName: 'regidate', width: 200 },
    ]

