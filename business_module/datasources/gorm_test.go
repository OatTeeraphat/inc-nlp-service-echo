package datasources_test

import (
	"testing"

	"github.com/smartystreets/goconvey/convey"
)

func TestDatasource(t *testing.T) {
	convey.Convey("Subject: Datasource testcase", t, func() {
		convey.Convey("GORM", func() {

			// data := datasources.SyncORM()
			// nlpRecordDomain := domains.NlpRecordDomain{AppID: 1, Keyword: "x", KeywordMinhash: 1, Intent: "1"}
			// result := data.Create(&nlpRecordDomain)

			// t.Log(result, nlpRecordDomain)

			// actual := nlpRecordDomain
			// expect := nlpRecordDomain

			convey.So("", convey.ShouldEqual, "")
		})
	})
}
