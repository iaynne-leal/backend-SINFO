import { response, request } from "express";
import { Op } from "sequelize";
import { PostDepartment } from "../models/PostDepartment.js";

const postDepartmentGet = async (req = request, res = response) => {
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
    const postDepartments = await PostDepartment.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_postdepartment: {
          [Op.like]: '%'+search+'%'
        }
      },
      
      
      attributes: ["pk_postdepartment", "namepostdepartment","pk_department"
      
      ],
    });

    const count = await PostDepartment.count(
      {
        where: {
          pk_postdepartment: {
            [Op.like]: '%'+search+'%'
          }
        },
      }
    )
    res.json({
      postDepartments, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const postDepartmentPost = async (req, res = response) => {
  //const body = req.body;
  const { namepostdepartment, pk_department } = req.body;

  try {
    const postDepartments = new PostDepartment({
        namepostdepartment,
        pk_department
    

    });

    //guardar paciente en la BD
    await postDepartments.save();
    res.json({
      msg: "puesto de agencia creado correctamente",
      postDepartments,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};


export {
  postDepartmentGet,
  postDepartmentPost,
};
