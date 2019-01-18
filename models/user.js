"use strict";

module.exports = function(sequelize, DataTypes,models) {
    var User = sequelize.define("User", {
            User_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Name: DataTypes.STRING,
            Email:DataTypes.STRING,
            Uphold_id: DataTypes.STRING,
            Access_token:DataTypes.STRING,
            Refresh_token:DataTypes.STRING,

        },
        {underscored: true},
        );
    //User.belongsTo(models.Company,{foreignKey:'Company_id'});

    return User;
};
