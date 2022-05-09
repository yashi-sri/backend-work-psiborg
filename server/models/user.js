// export default (sequelize, DataTypes) => {

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.STRING, primaryKey: true },
    fullName: { type: DataTypes.STRING, required: true },
    email: { type: DataTypes.STRING, required: true },
    password: DataTypes.STRING,
  });
  return User;
};
