import axios from 'axios';

const DataFetch = async (asset_name, sUnix, eUnix, columns) => {
  try {
    const params = {
      "asset_name": asset_name,
      "start_at": sUnix,
      "end_at": eUnix,
      "cols": columns,
    };
    console.log('===> params', params);
    const token = sessionStorage.getItem('Token');
    console.log('===> token', token)
    

    const response = await axios.post('http://192.168.0.126:8080/charts', params
      , { headers: { Authorization: token } }
    );
    // console.log("===> response", response.data)
    return response.data

  } catch (error) {
    console.error("===> Error occured while fetching data", error)
  }
};


const RowDataFetch = async (params) => {
  try {
    const token = sessionStorage.getItem('Token');
    const response = await axios.post('http://192.168.0.126:8080/charts/detail', params
      , { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    console.error("===> Error occured while ROW fetching data", error);
  }
};

export { RowDataFetch, DataFetch };
