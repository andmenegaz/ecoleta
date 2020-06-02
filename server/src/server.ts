import express from 'express'

const app = express()

app.get('/users', () => {
    console.log('Listagem de Usuários!')
})


app.listen(3333)
