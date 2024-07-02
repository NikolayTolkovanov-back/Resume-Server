class Controller {
  #service;

  constructor(service) {
    this.#service = service;
  }

  async addBid(req, res) {
    const contentType = req.get("Content-Type");

    if (contentType === "application/json") {
      const dataFromForm = req.body;
      // console.log('dataFromForm', dataFromForm);

      if (Object.keys(dataFromForm).length === 0) {
        return res.status(400).send("Bad request");
      }

      const { userName, userEmail, userPhone, userMessage } = dataFromForm;

      const addedUserBid = await this.#service.addBid(
        userName,
        userEmail,
        userPhone,
        userMessage
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

export default Controller;
