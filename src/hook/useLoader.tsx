import { useEffect, useState } from "react"

export const useLoader = ()=>{
    const [loader, setLoader] = useState<boolean>(true)

    useEffect(()=>{
        setTimeout(()=>{
            setLoader(false)
        }, 3000)
    }, [])

    return loader
}