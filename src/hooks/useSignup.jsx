import { useState, useEffect } from 'core-js/library/fn/reflect/es7/metadata'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    // For avoiding unmount component
    const [isCancelled, setIsCancelled] = useState(false)

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            // Signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error("Could not complete signup")
            }

            // Add display name to user
            await res.user.updateProfile({ displayName })

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })
            
            // Update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } 
        catch (err){
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

    return { error, isPending, signup }
}