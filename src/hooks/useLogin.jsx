import { useState, useEffect } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    // For avoiding unmount component
    const [isCancelled, setIsCancelled] = useState(false)

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        // Sign the user in
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            
            if (!res) {
                throw new Error("Could not complete login")
            }

            // Change online to true in user document
            const { uid } = res.user
            await projectFirestore.collection("users").doc(uid).update({ online: true })

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

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

    return { error, isPending, login }
}