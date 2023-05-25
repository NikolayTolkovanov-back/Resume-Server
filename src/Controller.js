class Controller {
  #service;

  constructor(service) {
    this.#service = service;
  }

  addBid(req, res) {
    
    const contentType = req.get("Content-Type");

    if (contentType === "application/json") {
      const dataFromForm = req.body;

      if (Object.keys(dataFromForm).length === 0) {
        return res.status(400).send("Bad request");
      }

      const { userName, userEmail, userDescription } = dataFromForm;

      const addedUserBid = this.#service.addBid(
        userName,
        userEmail,
        userDescription
      );

      return res
        .set("Access-Control-Allow-Origin", "*")
        .set("Content-Type", "application/json")
        .status(200)
        .json(addedUserBid);
    }

    return res.status(400).send("Bad request");
  }
}

export default Controller