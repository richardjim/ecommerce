import dotenv, { config } from 'dotenv'

dotenv.config({path:'.env'})

export const PORT = process.env.PORT;