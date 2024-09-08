import { response, request } from "express";
import { Op } from "sequelize";
import { Hardware } from "../models/Hardware.js";

const hardwareGet = async (req = request, res = response) => {
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
    const hardwares = await Hardware.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_hardware: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        accounting_code: {
          [Op.like]: '%'+search+'%'
        }
      },
      
      attributes: [
                    "pk_hardware", 
                    "accounting_code",
                    "brand",
                    "desk_laptop",
                    "storage",
                    "motherboard",
                    "proccesor",
                    "frequency",
                    "nuclei",
                    "threads",
                    "architecture",
                    "gpu",
                    "ram",
                    "HDD",
                    "SSD"
      
      ],
    });

    const count = await Hardware.count(
      {
        where: {
          pk_hardware: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          accounting_code: {
            [Op.like]: '%'+search+'%'
          }
        },
      }
    )
    res.json({
      hardwares, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const hardwarePost = async (req, res = response) => {
  //const body = req.body;
  const { accounting_code,
         brand,
         desk_laptop,
         storage,
         motherboard,
         proccesor,
         frequency,
         nuclei,
         threads,
         architecture,
         gpu,
         ram,
         HDD,
         SSD
         } = req.body;

  try {
    const hardwares = new Hardware({
        accounting_code,
        brand,
        desk_laptop,
        storage,
        motherboard,
        proccesor,
        frequency,
        nuclei,
        threads,
        architecture,
        gpu,
        ram,
        HDD,
        SSD
    });

    //guardar paciente en la BD
    await hardwares.save();
    res.json({
      msg: "hardware creado correctamente",
      hardwares,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
    console.log("hola ", error);
  }
};


export {
  hardwareGet,
  hardwarePost,
};
