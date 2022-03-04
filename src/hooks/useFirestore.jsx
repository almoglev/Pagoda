import { useReducer, useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch(action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        default:
            return state
    }
}

// useFirestore hook
export const useFirestore = (collection) => {
    // For avoiding unmount component
    const [isCancelled, setIsCancelled] = useState(false)

    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    // Collection ref
    const ref = projectFirestore.collection(collection)

    // Only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // Add document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const addedDocument = await ref.add(doc)
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument})
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message})
        }
    }

    // Delete document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT'})
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete'})
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    
    return { addDocument, deleteDocument, response }
}