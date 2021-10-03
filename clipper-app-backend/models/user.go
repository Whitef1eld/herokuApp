package models

type User struct {
	Id        uint        `json:"id"`
	Name      string      `json:"name"`
	Lastname  string      `json:"lastname"`
	Email     string      `json:"email" gorm:"unique"`
	Password  []byte      `json:"-"`
	Answers   string      `json:"answers"`
	Questions []Questions `json:"questions" gorm:"many2many:user_questions"`
}
