import React from 'react'
import Nav from '../layouts/Nav'
import BookmarkTable from '../../components/BookmarkTable'
import Button from '../../components/Button'
import axios from 'axios'
import { BookmarkCols } from '../../functions/ProduceCols'
import { useState, useEffect } from 'react'
import { addingUniqueId } from '../../functions/ProduceRows'


export default function Bookmark() {

    const [bookmarkColumns, setBookmarkColumns] = useState([]);
    const [bookmarkRows, setBookmarkRows] = useState([]);
    const [isBookmarkTableVisible, setIsBookmarkTableVisible] = useState(false);
    const userid = sessionStorage.getItem('userid')

    const loadBookmark = async () => {
        const token = sessionStorage.getItem('Token')
        console.log(token)
        try { 
            const response = await axios.get(
                'http://192.168.0.126:8080/charts/loadbookmark', {
                    headers: {
                        'Authorization': `${token}`, 
                        'Content-Type': 'application/json', 
                    },
                })
                .then(result => {
                    const uniqueData = addingUniqueId(result.data);
                    setBookmarkRows(uniqueData);
                    setBookmarkColumns(BookmarkCols);

                    if (uniqueData.length > 0) {
                      setIsBookmarkTableVisible(true);            
                    } else {
                      setIsBookmarkTableVisible(false);                  
                      alert('No data available'); 
                    }        
                    return uniqueData; 
                  }                )          

        } catch (error) {
            console.log('loading bookmark error', error)
        }
    };   

    useEffect(() => {
        loadBookmark(); 
    },[]);

    return (
        <div>
            <header className='bg-black p-3'>
                <Nav />
            </header>
            <div className='px-10 pb-24'>
                <div className='py-10'>
                    {/* <Button type='submit' name='Load' text='bg-blue-500 text-white px-4 py-1 rounded-full shadow
                                           hover:bg-blue-600 focus:outline-none focus:ring-2
                                           focus:ring-blue-400 focus:ring-opacity-75'
                                           func = {loadBookmark}/> */}
                </div>
                <div className='flex justify-center mb-10 '>
                <span className='font bold text-5xl p-3 border-b-4 w-auto border-b-slate-600'>{userid}'s BookMark</span>
                </div>
                {isBookmarkTableVisible && <BookmarkTable columns={bookmarkColumns} rows={bookmarkRows} text='mb-20' />}
            </div>
        </div>
    )
}
