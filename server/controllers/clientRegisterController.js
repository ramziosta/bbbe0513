const Client = require('../models/client.model')
const bcrypt = require("bcrypt");

const handleNewClient = async (req, res) => {
  const { user, email, pwd, accountType } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const duplicate = await Client.findOne({email: email}).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newClient = await Client.create(
      { user: user, 
        email: email, 
        pwd: hashedPwd , 
        accountType: accountType
      });

    console.log(newClient);
    res.status(201).json({ success: `New user ${newClient.user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewClient };
