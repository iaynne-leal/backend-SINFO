import { response, request } from "express";
import { Op } from "sequelize";
import { HardAgency } from "../models/HardAgency.js";

const hardAgencyGet = async (req = request, res = response) => {
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
    const hardAgencys = await HardAgency.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_hardagency: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        pk_postagency: {
          [Op.like]: '%'+search+'%'
        }
      },
    
      
      attributes: ["pk_hardagency", "pk_postagency","pk_hardware"
      
      ],
    });

    const count = await HardAgency.count(
      {
        where: {
          pk_hardagency: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          pk_postagency: {
            [Op.like]: '%'+search+'%'
          }
        },
      }
    )
    res.json({
      hardAgencys, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const hardAgencyPost = async (req, res = response) => {
  //const body = req.body;
  const { pk_hardagency, pk_postagency, pk_hardware  } = req.body;

  try {
    const hardAgencys = new HardAgency({
        pk_hardagency,
        pk_postagency,
        pk_hardware,
    });

    //guardar paciente en la BD
    await hardAgencys.save();
    res.json({
      msg: "hardware creado correctamente",
      hardAgencys,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};


export {
  hardAgencyGet,
  hardAgencyPost,
};
