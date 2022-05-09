// export default (sequelize, DataTypes) => {

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    id: { type: DataTypes.STRING, primaryKey: true },
    bookDetail: { type: DataTypes.JSON, required: true },
    authorDetail: { type: DataTypes.JSON, required: true },
    userId: { type: DataTypes.STRING, required: true },
  });
  return Book;
};
