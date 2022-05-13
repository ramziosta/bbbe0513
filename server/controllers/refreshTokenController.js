const clientDB = {
  clients: require("../data/clients.json"),
  setClients: function (data) {
    this.clients = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401);
  console.log("🍪 " + cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundClient = clientDB.clients.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundClient) return res.sendStatus(403); //Forbidden
  console.log(foundClient);
  //evaluate jwt token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundClient.email !== decoded.email) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    res.json({ accessToken });
    console.log(accessToken);
  });
};

module.exports = { handleRefreshToken };
