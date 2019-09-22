package services_test

import (
	"inc-nlp-service-echo/services"
	"testing"

	"github.com/smartystreets/goconvey/convey"
)

func TestNlpService(t *testing.T) {

	convey.Convey("Subject: NlpService testcase", t, func() {
		svc := services.NlpRecordService{}

		convey.Convey("GetNlpModelReply", func() {
			actual := svc.GetNlpModelReply("123", "123")
			expect := "123"
			convey.So(actual, convey.ShouldEqual, expect)
		})
	})

}
