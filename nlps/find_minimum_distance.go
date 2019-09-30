package nlps

import (
	"inc-nlp-service-echo/models"
	"math"

	"github.com/agnivade/levenshtein"
	"github.com/aryahadii/ngram"
	"github.com/dgryski/go-metro"
	"github.com/dgryski/go-spooky"
)

const (
	// InitialInfinityPositiveValue InitialInfinityPositiveValue
	InitialInfinityPositiveValue = 0

	// InitialMinimumIndex InitialMinimumIndex
	InitialMinimumIndex = 0
)

// MHash MHash
func MHash(b []byte) uint64 { return metro.Hash64(b, 0) }

// GenerateKeywordMinhash GenerateKeywordMinhash
func GenerateKeywordMinhash(keyword string) uint32 {

	result, _ := ngram.Get(keyword, 2)
	minWise := NewMinWise(spooky.Hash64, MHash, 10)
	for _, s := range result {
		minWise.Push([]byte(s))
	}

	return uint32(minWise.minimums[0])
}

// FindMinDistanceFromNlpModels find minimum distance from nlp model
func FindMinDistanceFromNlpModels(nlpReplyModels []models.NlpReplyModel, incomingKeyword string) models.NlpReplyModel {

	minDistance := float32(math.Inf(InitialInfinityPositiveValue))
	minIDX := InitialMinimumIndex

	for index, item := range nlpReplyModels {

		distance := float32(levenshtein.ComputeDistance(item.Keyword, incomingKeyword))

		nlpReplyModels[index].Distance = distance

		if distance <= minDistance {
			minDistance = distance
			minIDX = index
		}
	}

	nlpReplyModels[minIDX].Keyword = incomingKeyword
	return nlpReplyModels[minIDX]
}
