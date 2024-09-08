import { response, request } from "express";
import { Op } from "sequelize";
import { Software } from "../models/Software.js";

const softwareGet = async (req = request, res = response) => {
  let { search, pagina = 1, limite = 50 } = req.query;

  const pageAsNumber = Number.parseInt(pagina);
  const limitAsNumber = Number.parseInt(limite);

  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 5;
  if (!Number.isNaN(limitAsNumber) && limitAsNumber > -1 ) {
    size = limitAsNumber;
  }

  if (search === undefined) {
    search = "";
  } else {
    search = search.trim();
  }

  try {
    const softwares = await Software.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_software: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        namesoftware: {
          [Op.like]: '%'+search+'%'
        }
      },
      
      attributes: ["pk_software", "namesoftware","details"
      
      ],
    });

    const count = await Software.count(
      {
        where: {
          pk_software: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          namesoftware: {
            [Op.like]: '%'+search+'%'
          }
        },
      }
    )
    res.json({
      softwares, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const softwarePost = async (req, res = response) => {
  //const body = req.body;
  const { namesoftware, details } = req.body;

  try {
    const softwares = new Software({
        namesoftware,
        details
    

    });

    //guardar paciente en la BD
    await softwares.save();
    res.json({
      msg: "software creado correctamente",
      softwares,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};


export {
  softwareGet,
  softwarePost,
};
