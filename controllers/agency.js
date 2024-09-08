import { response, request } from "express";
import { Op } from "sequelize";
import { Agency } from "../models/Agency.js";

const agencyGet = async (req = request, res = response) => {
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
    const agencys = await Agency.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_agency: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        nameagency: {
          [Op.like]: '%'+search+'%'
        }
      },
      
      attributes: ["pk_agency", "nameagency"
      
      ],
    });

    const count = await Agency.count(
      {
        where: {
          pk_agency: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          nameagency: {
            [Op.like]: '%'+search+'%'
          }
        },
      }
    )
    res.json({
      agencys, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const agencyPost = async (req, res = response) => {
  //const body = req.body;
  const { nameagency } = req.body;

  try {
    const agencys = new Agency({
        nameagency,
    

    });

    //guardar paciente en la BD
    await agencys.save();
    res.json({
      msg: "rol creado correctamente",
      agencys,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};


export {
  agencyGet,
  agencyPost,
};
