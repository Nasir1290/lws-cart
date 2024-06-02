import { Types } from 'mongoose'

interface ObjectId {
   _id: Types.ObjectId
}

export const objectIdToString = <T extends ObjectId>(docs: T[]) => {
   return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
   }))
}
