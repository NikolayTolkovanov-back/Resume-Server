class Service {
  #mysql;

  constructor(mysql) {
    this.#mysql = mysql;
  }

  async addBid(userName, userEmail, userPhone, userMessage) {
    // console.log(...arguments);
    if (
      userName === "" ||
      userEmail === "" ||
      userPhone === "" ||
      userMessage === ""
    ) {
      return new Error(
        "userName or Email or Phone or Message was not received"
      );
    }

    const sqlQueryInsert =
      "INSERT INTO `bids` (user_name, user_email, user_phone, user_message) VALUES (?, ?, ?, ?);";
    const sqlQueryGetResult =
      "SELECT * FROM `bids` WHERE id = (SELECT MAX(id) FROM `bids`);";

    try {
      await this.#mysql.execute(sqlQueryInsert, [
        userName,
        userEmail,
        userPhone,
        userMessage,
      ]);

      const [rows] = await this.#mysql.query(sqlQueryGetResult)
      // console.log('rows', rows[0]);

      return rows[0]
    } catch (error) {
      throw new Error("error of insert " + error);
    }
  }
}

export default Service;
