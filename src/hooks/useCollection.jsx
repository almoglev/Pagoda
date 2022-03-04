import { useEffect, useRef, useState } from 'react'
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    /* 
     Shaun explanation:
        if we don't use a ref --> infinite loop in useEffect
        _query is an array and is "different" on every function call
     My explanation:
        To avoid infinite loop (because _query is an array so it's reference type so every evaluation changes the address in the memory).
        warpping _query in with useRef makes sure the address in memory doesnt change (the address of const query remains the same because its not reference type, unlike an array)
     */
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
      let ref = projectFirestore.collection(collection)

      if (query) {
          ref = ref.where(...query)
      }
      if (orderBy) {
        ref = ref.orderBy(...orderBy)
    }

      const unsub = ref.onSnapshot((snapshot) => {
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({ ...doc.data, id: doc.id })
        })

        // Update state
        setDocuments(results)
        setError(null)
      },(error) => {
          console.log(error)
          setError("Could not fetch the data")
      })

      // unsubscribe on unmount
      return () => unsub()

    }, [collection, query, orderBy])
    
    return { documents, error }
}