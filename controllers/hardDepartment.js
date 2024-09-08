import { response, request } from "express";
import { Op } from "sequelize";
import { HardDepartment } from "../models/HardDepartment.js";

const hardDepartmentGet = async (req = request, res = response) => {
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
    const hardDepartments = await HardDepartment.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_harddepartment: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        pk_postdepartment: {
          [Op.like]: '%'+search+'%'
        }
      },
    
      
      attributes: ["pk_harddepartment", "pk_postdepartment","pk_hardware"
      
      ],
    });

    const count = await HardDepartment.count(
      {
        where: {
          pk_harddepartment: {
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
      hardDepartments, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const hardDepartmentPost = async (req, res = response) => {
  //const body = req.body;
  const { pk_harddepartment, pk_postdepartment, pk_hardware  } = req.body;

  try {
    const hardDepartments = new HardDepartment({
        pk_harddepartment,
        pk_postdepartment,
        pk_hardware,
    });

    //guardar paciente en la BD
    await hardDepartments.save();
    res.json({
      msg: "hardware creado correctamente",
      hardDepartments,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};


export {
  hardDepartmentGet,
  hardDepartmentPost,
};
