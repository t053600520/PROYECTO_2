//CRUD : Create, Read, Update, Delete
const express = require("express")
const mongoose = require("mongoose")
const Pais = require('./models/Pais')

const app = express()

const DB_USER = "TEST"
const DB_PASSWORD = "TEST"

app.use(express.json())

app.get("/", (req, res) => {//"/* es ENDPOINT"
    res.render('index.ejs')
})

//crear(CREATE)
app.post("/pais", async (req, res) => {
    const{PAIS,CAPITAL,MONEDA,IDIOMA,GOBIERNO,PRESIDENTE,POBLACION}=req.body
    if(!PAIS){//nombre no existe
        res.status(422).json({error: "ERROR AL CARGAR EL PAIS"})
        return//finaliza la ejecucion de la funcion
    }
    const pais = {
        PAIS,
        CAPITAL,
        MONEDA,
        IDIOMA,
        GOBIERNO,
        PRESIDENTE,
        POBLACION,
    }
    
    try {
        await Pais.create(pais)
        res.status(201).json({message:"PAIS CARGADO A LA BASE DE DATOS CORRECTAMENTE"})
    } catch (error) {
        res.status(500).json({error:error})//la mejor alternativa

    }
})

//retornar paisas(READ)
app.get('/pais',async (req,res) => {
   try {
    const pais = await Pais.find()
    res.status(200).json(pais)
   } catch (error) {
    res.status(500).json({error:error})
   }
   
})
//retornar una unica identidad
app.get('/pais/:id',async(req,res) => {
  console.log(req)
  const id = req.params.id//extraer el id del dato
  try {
      const pais = await Pais.findOne({_id:id})//devuelve un documento con los criterios dados
      if(!pais){
            res.status(422).json({message:'Uauario no encontrado'})
            return
        }
        res.status(200).json(pais)
   } catch (error) {
        res.status(500).json({error:error})
  }

})
//UPDATE(Actualizar)
app.patch('/pais/:id', async(req,res) => {
  const id = req.params.id
  const{PAIS,CAPITAL,MONEDA,IDIOMA,GOBIERNO,PRESIDENTE,POBLACION} = req.body
  const pais = {
     PAIS,
     CAPITAL,
     MONEDA,
     IDIOMA,
     GOBIERNO,
     PRESIDENTE,
     POBLACION,
   }
   try {
        const updatePais = await Pais.updateOne({ _id : id },pais)
        //console.log(updatePais)
        if (updatePais.matchedCount==0){//validacion antes de actualizar
          res.status(422).json({message:'Usuario no encontrado'})
          return
   }res.status(200).json(pais)
   } catch (error) {
      res.status(500).json({error:error})
   }
 
})
//DELETE(Borrar)
app.delete('/pais/:id', async (req,res) => {
    const id = req.params.id
    const pais = await Pais.findOne({_id:id})
    if(!pais){//validacion antes de remover
        res.status(422).json({message:'PAIS REMOVIDO DE LA BASE DE DATOS'})
        return
    }
    try {
        await Pais.deleteOne({_id:id})
        res.status(200).json({message:'PAIS REMOVIDO DE LA BASE DE DATOS'})
        
    } catch (error) {
        res.status(500).json({error:error})
    }

})

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@myapi.qxxj1ll.mongodb.net/?retryWrites=true&w=majority`

     ).then(() => {//then= luego si la coneccion se da que hago luego
     console.log('Conectado a MongoDB')
     app.listen(5000)
    }) 
    .catch((err) => {//si np
     console.log(err)
    })


