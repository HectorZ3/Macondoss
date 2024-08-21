import { Request, Response, query } from "express";
import pool from "../database";

class LoginControllers {
  public async userExists(req: Request, resp: Response) {
    let idTipoUsuario=0;
    let claveUsuario='';
    const { idUsuario, passwd } = req.body;
    try {
      const queryResult = await pool.query('SELECT idUsuario,idTipoUsuario FROM usuarios WHERE idUsuario = ? AND passwd = ?', [idUsuario, passwd]);
      if (queryResult.length > 0) {
        claveUsuario=queryResult[0].cveUsuario;
        idTipoUsuario=queryResult[0].idTipoUsuario;
        resp.json({ usuarioExiste: true, idTipoUsuario, idUsuario});
      } else {
        resp.json({ usuarioExiste: false, idTipoUsuario });
      }
    } catch (error) {
      resp.json({ usuarioExiste: false, idTipoUsuario });
    }
  }
}
const loginControllers = new LoginControllers();
export default loginControllers;
