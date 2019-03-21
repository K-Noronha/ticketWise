'use strict';
module.exports = (sequelize, DataTypes) => {
  const tickets = sequelize.define('tickets', {
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {});
  tickets.associate = function(models) {
    // associations can be defined here
  };
  return tickets;
};