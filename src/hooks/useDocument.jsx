import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // Realtime data for the document
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsub = ref.onSnapshot((snapshot) => {
            setDocument({...snapshot.data(), id: snapshot.id})
            setError(null)
        }, (error) => {
            console.log(err.message)
            setError("Failed to get document")
        })

        return () => unsub()

    }, [collection, id])
    
    return { document, error }
}