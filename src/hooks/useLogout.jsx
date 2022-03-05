import { useState, useEffect } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    // For avoiding unmount component
    const [isCancelled, setIsCancelled] = useState(false)

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch, user } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // Sign the user out
        try {
            
            // Change online to false in user document
            const { uid } = user
            await projectFirestore.collection("users").doc(uid).update({ online: false })

            await projectAuth.signOut()

            // Dispatch logout action
            dispatch({ type: 'LOGOUT' })

            // Update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
      return () => setIsCancelled(true)
    }, [])   

    return { error, isPending, logout }
}