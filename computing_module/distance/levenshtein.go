package distance

import (
	"inc-nlp-service-echo/computing_module/hashing"
	"inc-nlp-service-echo/core_module/nlprecord/dao"
	"math"

	"github.com/agnivade/levenshtein"
	"github.com/aryahadii/ngram"
	"github.com/dgryski/go-metro"
	"github.com/dgryski/go-spooky"
)

// Distance Distance
type Distance struct{}

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
	minWise := hashing.NewMinWise(spooky.Hash64, MHash, 10)
	for _, s := range result {
		minWise.Push([]byte(s))
	}

	return uint32(minWise.Minimums[0])
}

// FindMinDistanceFromNlpModels find minimum distance from nlp model
func FindMinDistanceFromNlpModels(nlpReplyModels []dao.ReadNlpReplyDao, incomingKeyword string) dao.ReadNlpReplyDao {

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
