package database

import (
	"myapp/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// b2ca8f94b1c948:f885ad87@tcp(eu-cdbr-west-01.cleardb.com)/heroku_38e9cde3a9f4547
//mysql://b2ca8f94b1c948:f885ad87@eu-cdbr-west-01.cleardb.com/heroku_38e9cde3a9f4547?reconnect=true
func Connect() {
	connection, err := gorm.Open(mysql.Open("root:password@tcp(127.0.0.1:3307)/clipperapp"), &gorm.Config{}) //connect with database
	if err != nil {
		panic("could not connect to the database")
	}
	DB = connection
	connection.AutoMigrate(&models.User{}, &models.Questions{}) //automigrate users
}
