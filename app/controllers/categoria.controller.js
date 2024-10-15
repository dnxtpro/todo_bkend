
const db = require("../models");

const Category = db.category;


exports.addCategory  = async(req, res) => {
    const catname = req.body.name
    const catcolor = req.body.color
    const userId = req.userId
    console.log(req.body,userId)
try{
    const cat = await Category.create({
        name: catname,
        color: catcolor,
        userId: userId
    });
    if(cat){
        res.status(200).json(cat);
    }else {
        res.status(500).json({ error: 'No se pudo crear la categoria' });
    }
}
catch(error){res.status(500).json({ error: 'Error del servidor', detalle: error.message });}
  };
exports.getCategory  = async(req, res) => {
    const userId = req.userId
   
try{
    const cat = await Category.findAll({
        where:{userId:userId},
    });
    if(cat){
        res.status(200).json(cat);
    }else {
        res.status(500).json({ error: 'No se pudo obtener cateogrias' });
    }
}
catch(error){res.status(500).json({ error: 'Error del servidor', detalle: error.message });}
  };
  exports.deleteCategory = async(req,res)=>{
    const catId = req.params.id
    try{
        const categoria = await Category.findOne({
            where:{id:catId}
        });
        if(categoria){
            await categoria.destroy();
            res.status(200).json('Borrado Con EXITO')
        }
        else{
            res.status(500).json({error:'No existe tal categoria'})
          }

    }
    catch(error){res.status(500).json({ error: 'Error del servidor', detalle: error.message });

    }
  }