import {createContext,useState} from 'react'

export const postDetailsContext= createContext(null)

function Post({children}){
    const [postDetails,setPostDetails]=useState()


    return(
        <postDetailsContext.Provider value={{postDetails,setPostDetails}}>
            {children}
            </postDetailsContext.Provider>
    )
}
export default Post