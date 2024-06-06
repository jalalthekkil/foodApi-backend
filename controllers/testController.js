const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "test user API data",
    });
  } catch (error) {
    console.log("Error in test user API", error);
  }
};

module.exports = { testUserController };
