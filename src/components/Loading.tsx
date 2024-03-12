import React from 'react'
import { Triangle } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#B95AFF"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loading