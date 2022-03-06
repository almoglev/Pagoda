import { useReducer, useEffect, useState } from 'react'
import { projectFirestore, timestamp } from '../firebase/config'

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
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        case 'UPDATED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
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
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({ ...doc, createdAt })
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

    // Update document
    const updateDocument = async (id, updates) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const updatedDocument = await ref.doc(id).update(updates)
            dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument})
            return updatedDocument
        } 
        catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not update'})
            return null
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    
    return { addDocument, deleteDocument, updateDocument, response }
}