'use strict';
module.exports = (sequelize, DataTypes) => {
  const tickets = sequelize.define('tickets', {
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    underscored: true
  });
  tickets.associate = function(models) {
    // associations can be defined here
    tickets.belongsTo(models.event)
    tickets.belongsTo(models.user)
  };
  return tickets;
};