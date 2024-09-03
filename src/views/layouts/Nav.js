import Button from "../../components/Button";

export default function Nav() {
    return (
        <>
            <div className="p-5">
                <h1 className='flex justify-between items-center'>
                    <div className='flex'>
                    <a href='/home' className= 'mr-10 text-5xl text-white'>
                        PREDICTIVE MAINTENANCE 
                    </a>
                    <a href='/charts' className= 'mr-10 text-2xl text-white'>
                        Charts 
                    </a>
                    <a href='#' className= 'mr-10 text-2xl text-white'>
                        Bookmark 
                    </a>               
                    <a href='#' className= 'mr-10 text-2xl text-white'>
                        Anomaly 
                    </a>             
                    </div>         
                    <div className="items-center justify-center">
                        <Button name="LOGOUT" 
                         
                                text={"bg-white text-black text-xl font-bold px-3 py-1 rounded-full shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"}/>
                    </div>
                </h1>
            </div>
        </>
    )
}
