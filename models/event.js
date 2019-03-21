'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    title: DataTypes.STRING,
    hostedBy: DataTypes.STRING,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    eDate: DataTypes.DATE,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    ages: DataTypes.STRING,
    time: DataTypes.STRING,
    numTickets: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    poster: DataTypes.STRING
  }, {});
  event.associate = function(models) {
    // associations can be defined here
  };
  return event;
};