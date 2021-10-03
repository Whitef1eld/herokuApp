package models

type Questions struct {
	Id       uint      `gorm:"primary_key, AUTO_INCREMENT" json:"id"`
	Question string    `json:"question"`
	ThumbsUp string    `json:"thumbsup"`
	Answers  []Answers `gorm:"many2many:questions_answers" json:"answers"`
}

type Answers struct {
	Id     uint   `gorm:"primary_key, AUTO_INCREMENT" json:"id"`
	Answer string `json:"Answer"`
}
