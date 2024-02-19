
import express from 'express'
import { getNotes , createNote , getNote , updateNote , deleteNote } from '../controller/note'

const noteRoutes  = express.Router()

noteRoutes.get('/',getNotes)
noteRoutes.post('/' , createNote)
noteRoutes.get('/:id',getNote)
noteRoutes.patch('/:id', updateNote)
noteRoutes.delete('/:id' , deleteNote)
export default noteRoutes