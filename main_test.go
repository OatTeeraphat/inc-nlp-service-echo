package main_test

import (
	"inc-nlp-service-echo/common_module/commons"
	"testing"

	"github.com/smartystreets/goconvey/convey"
)

func TestENV(t *testing.T) {
	config := commons.NewSelectENV()

	convey.Convey("Subject: TestENV", t, func() {

		convey.So(config.Env, convey.ShouldEqual, "development")
		convey.So(config.EchoAppName, convey.ShouldEqual, "EchoApp-DEV")

	})

}
