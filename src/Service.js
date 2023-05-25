

class Service {
  #mysql;
  constructor(mysql) {
    this.#mysql = mysql
  }

  addBid(userName, userEmail, userDescription) {
    if (userName === '' || userEmail === '' || userDescription === '') {
      return new Error('userName or Email or Description was not received')
    }

    const sqlQueryInsert = 'INSERT INTO `resume` (user_name, user_email, user_description) VALUES (?, ?, ?);'
    const sqlQueryGetResult = 'SELECT * FROM `resume` WHERE id = (SELECT MAX(id) FROM `resume`);'

    this.#mysql.query(sqlQueryInsert, [userName, userEmail, userDescription], function (error, results, fields) {
      if (error) throw new Error(error);
    });

    this.#mysql.query(sqlQueryGetResult, function (error, results, fields) {
      if (error) throw new Error(error);

      return results
    });
  }
}

export default Service