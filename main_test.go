package main_test

import (
	"inc-nlp-service-echo/commons"
	"testing"

	"github.com/smartystreets/goconvey/convey"
)

func TestENV(t *testing.T) {
	config := commons.NewFillChat12Factor()

	convey.Convey("Subject: TestENV", t, func() {

		convey.So(config.Env, convey.ShouldEqual, "development")
		convey.So(config.AppName, convey.ShouldEqual, "AppName-DEV")

	})

}
