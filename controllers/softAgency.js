import { response, request } from "express";
import { Op } from "sequelize";
import { SoftAgency } from "../models/SoftAgency.js";

const softAgencyGet = async (req = request, res = response) => {
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
    const softAgencys = await SoftAgency.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_softagency: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        pk_postagency: {
          [Op.like]: '%'+search+'%'
        }
      },
    
      
      attributes: ["pk_softagency", "pk_postagency","pk_software","key"
      
      ],
    });

    const count = await SoftAgency.count(
      {
        where: {
          pk_softagency: {
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
      softAgencys, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const softAgencyPost = async (req, res = response) => {
  //const body = req.body;
  const { pk_softagency, pk_postagency, pk_software, key  } = req.body;

  try {
    const softAgencys = new SoftAgency({
        pk_softagency,
        pk_postagency,
        pk_software,
        key
    

    });

    //guardar paciente en la BD
    await softAgencys.save();
    res.json({
      msg: "software creado correctamente",
      softAgencys,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};


export {
  softAgencyGet,
  softAgencyPost,
};
