
import express from 'express'
import { signUp , Login , logout , getAuthenticatedUser } from '../controller/user'

const router = express.Router()

router.get('/',getAuthenticatedUser)
router.post('/signup',signUp)
router.post('/signin' , Login)
router.get('/logout' , logout)
export default router