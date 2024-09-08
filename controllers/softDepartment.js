import { response, request } from "express";
import { Op } from "sequelize";
import { SoftDepartment } from "../models/SoftDepartment.js";

const softDepartmentGet = async (req = request, res = response) => {
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
    const softDepartments = await SoftDepartment.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_softdepartment: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        pk_postdepartment: {
          [Op.like]: '%'+search+'%'
        }
      },
    
      
      attributes: ["pk_softdepartment", "pk_postdepartment","pk_software","key"
      
      ],
    });

    const count = await SoftDepartment.count(
      {
        where: {
          pk_softdepartment: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          pk_postdepartment: {
            [Op.like]: '%'+search+'%'
          }
        },
      }
    )
    res.json({
      softDepartments, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const softDepartmentPost = async (req, res = response) => {
  //const body = req.body;
  const { pk_softdepartment, pk_postdepartment, pk_software, key  } = req.body;

  try {
    const softDepartments = new SoftDepartment({
        pk_softdepartment,
        pk_postdepartment,
        pk_software,
        key
    

    });

    //guardar paciente en la BD
    await softDepartments.save();
    res.json({
      msg: "software creado correctamente",
      softDepartments,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};


export {
  softDepartmentGet,
  softDepartmentPost,
};
