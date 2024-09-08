import { response, request } from "express";
import { Op } from "sequelize";
import { Department } from "../models/Department.js";

const departmentGet = async (req = request, res = response) => {
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
    const departments = await Department.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_department: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        namedepartment: {
          [Op.like]: '%'+search+'%'
        }
      },
      
      attributes: ["pk_department", "namedepartment"
      
      ],
    });

    const count = await Department.count(
      {
        where: {
          pk_department: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          namedepartment: {
            [Op.like]: '%'+search+'%'
          }
        },
      }
    )
    res.json({
      departments, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const departmentPost = async (req, res = response) => {
  //const body = req.body;
  const { namedepartment } = req.body;

  try {
    const departments = new Department({
        namedepartment,
    

    });

    //guardar paciente en la BD
    await departments.save();
    res.json({
      msg: "departamento creado correctamente",
      departments,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};


export {
  departmentGet,
  departmentPost,
};
