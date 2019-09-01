import File from '../models/File';

class FileController {
  async store(req, res) {
    // O originalname vou salvar no banco como name e filename como path
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
