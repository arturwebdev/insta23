import { useCallback, useState } from "react"

export const withShowComments = (Component) => {
    return (props) => {
        const [isShow, setIsShow] = useState(false)

        const openComments = useCallback(() => {
            setIsShow(true)
        }, [])

        return <Component {...{isShow, openComments}}  {...props}/>
    }
}