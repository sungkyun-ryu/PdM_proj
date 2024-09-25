import React from 'react'
import { useState, useEffect } from 'react';
import RealtimeStaticChart from './RealtimeStaticChart';


export default function WebSocketStatic({ message, dataon, style }) {
    console.log('websocket', message, dataon, style)
    const [socket, setSocket] = useState(null);
    const [data, setData] = useState({
        x: [],
        y: [],
        z: [],
    })
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        const userid = sessionStorage.getItem('userid');
        const ws = new WebSocket(`ws://192.168.0.126:8080/realtimews?auth=${userid}`);

        ws.onopen = () => {
            console.log('WebSocket connection established.');
            setIsOpen(true);
        };

        ws.onmessage = (event) => {
            try {
                const realTimeData = JSON.parse(event.data);
                // console.log('Received data:', realTimeData);

                // console.log('wave_x', realTimeData.x)
                const newData = {
                    x: realTimeData.x,
                    y: realTimeData.y,
                    z: realTimeData.z,
                }

                const nowTime = new Date().toISOString();

                setData(newData);
            } catch (error) {
                console.error('WebSocket error:', error);
                console.error('Error message:', error.message);
                console.error('Error type:', error.type);
                console.error('Error target:', error.target);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
            setIsOpen(false);
        };

        setSocket(ws);

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    useEffect(() => {
        if (socket && message && isOpen) {
            console.log('===> readyState', socket.readyState)
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(message);
                console.log('Message sent:', message);
            } else {
                console.log('Empty message not sent');
            }
        }
    }, [message, socket, isOpen])

    console.log('message', message)
    console.log('data', data)

    return (
        <div className="p-20 w-full">
            {data && (data.x.length > 0 || data.y.length > 0 || data.z.length > 0) ? (
                <>
                    {data.x.length > 0 && (
                        <RealtimeStaticChart data={data.x} axis='waveform_x' colour='#6f63b9' />
                    )}
                    {data.y.length > 0 && (
                        <RealtimeStaticChart data={data.y} axis='waveform_y' colour='#ADD8E6' />
                    )}
                    {data.z.length > 0 && (
                        <RealtimeStaticChart data={data.z} axis='waveform_z' colour='#aadd80' />
                    )}
                </>
            ) : null}
        </div>
    )
}
