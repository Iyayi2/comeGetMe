const userDetails = (user) => {
  const { _id, username, email } = user;
  return { _id, username, email };
};

module.exports = { userDetails };
