import connect from "../../../utils/database";

export default async (req, res) => {
    /**
     *  Método GET 
     *  Mostra usuário
     **/ 
    if (req.method === "GET") {
      const { email } = req.query;

      // Caso email não exista
      if (!email) {
        res.status(400).json({ error: "Missing user e-mail on request body" });
        return;
      }

      const { db } = await connect();

      const response = await db
        .collection("user")
        .findOne({ email });

      if (!response) {
        res.status(400).json({ error: "User not found" });
        return;
      }
      res.status(200).json(response);
    } else {
    // Caso não seja o método correto, exibe erro
    res.status(400).json({ error: "Wrong request method" });
  }
};
