package entity

import (
	"time"

	"gorm.io/gorm"
)

type Movie struct {
	gorm.Model
	Title       string `gorm:"uniqueIndex" valid:"required~Title is required"`
	Duration    string 
	Description string
	ReleaseDate time.Time
	Director    string
	Cast        string
	Image       string `gorm:"type:longtext"`
	Video       string

	CategoriesID *uint `valid:"required~Categories is required"`
	Categories   Categories `gorm:"references:id"`

	SoundtrackID *uint `valid:"required~Soundtrack is required"`
	Soundtrack   Soundtrack `gorm:"references:id"`

	TargetID *uint `valid:"required~Target is required"`
	Target   Target `gorm:"references:id"`

	Review         []Review         `gorm:"foreignKey:MovieID"`
	History        []History        `gorm:"foreignKey:MovieID"`
	Download       []Download       `gorm:"foreignKey:MovieID"`
	WatchlistMovie []WatchlistMovie `gorm:"foreignKey:MovieID"`
}

type Target struct {
	gorm.Model
	Target string `gorm:"uniqueIndex"`

	Movie []Movie `gorm:"foreignKey:TargetID"`
}

type Soundtrack struct {
	gorm.Model
	Soundtrack string `gorm:"uniqueIndex"`

	Movie []Movie `gorm:"foreignKey:SoundtrackID"`
}

type Categories struct {
	gorm.Model
	Categories string `gorm:"uniqueIndex"`

	Movie []Movie `gorm:"foreignKey:CategoriesID"`
}
