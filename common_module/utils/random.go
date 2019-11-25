package utils

import (
	"math/rand"
)

// NewRandomIDBetween NewRandomIDBetween
func NewRandomIDBetween(min int, max int) uint32 {
	return uint32(rand.Intn(max-min) + min)
}
