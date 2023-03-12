import React, { ReactNode, useState } from "react";

interface Message {
    error: boolean,
    showMessage: boolean,
    title: string,
    messageHandler: (error: boolean, title: string) => void
}

const defaultValue: Message = {
    error: false,
    showMessage: false,
    title: '',
    messageHandler: (error: boolean, title: string) => {}
}

export const MessageContext = React.createContext(defaultValue)

const MessageContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [error, setError] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [title, setTitle] = useState('Working')

    const messageHandler = (error: boolean, title: string) => {
        setError(error)
        setTitle(title)
        setShowMessage(true)
        setTimeout(() => {
            setShowMessage(false)
        }, 5000)
    }

    return ( 
        <MessageContext.Provider 
        value={{
            error: error, 
            showMessage: showMessage, 
            title: title,
            messageHandler: messageHandler
        }} >
            {children}
        </MessageContext.Provider>
     );
}
 
export default MessageContextProvider;