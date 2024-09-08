import { response, request } from "express";
import { Op } from "sequelize";
import { PostAgency } from "../models/PostAgency.js";

const postAgencyGet = async (req = request, res = response) => {
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
    const postAgencys = await PostAgency.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_postagency: {
          [Op.like]: '%'+search+'%'
        }
      },
      attributes: ["pk_postagency", "namepostagency","pk_agency"
      
      ],
    });

    const count = await PostAgency.count(
      {
        where: {
          pk_postagency: {
            [Op.like]: '%'+search+'%'
          }
        },
      }
    )
    res.json({
      postAgencys, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const postAgencyPost = async (req, res = response) => {
  //const body = req.body;
  const { namepostagency, pk_agency } = req.body;

  try {
    const postAgencys = new PostAgency({
        namepostagency,
        pk_agency
    

    });

    //guardar paciente en la BD
    await postAgencys.save();
    res.json({
      msg: "puesto de agencia creado correctamente",
      postAgencys,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};


export {
  postAgencyGet,
  postAgencyPost,
};
