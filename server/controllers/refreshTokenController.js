const Client = require('../models/client.model')
const jwt = require("jsonwebtoken");

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401);
  console.log("🍪 " + cookies.jwt); 
  const refreshToken = cookies.jwt;

  const foundClient = Client.findOne({ refreshToken }).exec();
  if (!foundClient) return res.sendStatus(403); //Forbidden
  console.log(foundClient);
  //evaluate jwt token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundClient.email !== decoded.email) return res.sendStatus(403);
    const roles = Object.values(foundClient.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "user": decoded.user,
                        "roles": roles
                    }
                },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ roles, accessToken });
    console.log(accessToken);
  });
};

module.exports = { handleRefreshToken };
