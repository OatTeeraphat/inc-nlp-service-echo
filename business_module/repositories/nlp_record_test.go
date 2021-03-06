package repositories_test

// func TestDatasource(t *testing.T) {
// 	convey.Convey("Subject: NewNlpRecordRepository testcase", t, func() {

// 		var mock *commons.GORM

// 		orm := datasources.NewGORM(mock)

// 		convey.Convey("Save 2 NlpRecordDomains", func() {
// 			nlpRecordRepo := repositories.NewNlpRecordRepository(orm)
// 			var nlpRecordDomain domains.NlpRecordDomain
// 			// nlpRecordDomain.AppID = 1
// 			nlpRecordDomain.Keyword = "mock_keyword"
// 			nlpRecordDomain.KeywordMinhash = 1
// 			nlpRecordDomain.Intent = "mock_intent"
// 			nlpRecordRepo.Save(&nlpRecordDomain)
// 			convey.So(nlpRecordDomain.ID, convey.ShouldEqual, 1)
// 			// convey.So(nlpRecordDomain.AppID, convey.ShouldEqual, 1)
// 			convey.So(nlpRecordDomain.Keyword, convey.ShouldEqual, "mock_keyword")

// 			var nlpRecordDomain2 domains.NlpRecordDomain
// 			// nlpRecordDomain2.AppID = 2
// 			nlpRecordDomain2.Keyword = "mock_keyword"
// 			nlpRecordDomain2.KeywordMinhash = 2
// 			nlpRecordDomain2.Intent = "mock_intent"
// 			nlpRecordRepo.Save(&nlpRecordDomain2)
// 			convey.So(nlpRecordDomain2.ID, convey.ShouldEqual, 2)
// 			// convey.So(nlpRecordDomain2.AppID, convey.ShouldEqual, 2)
// 			convey.So(nlpRecordDomain2.Keyword, convey.ShouldEqual, "mock_keyword")
// 		})

// 		convey.Convey("Save Another Domain", func() {
// 			nlpRecordRepo := repositories.NewNlpRecordRepository(orm)

// 			var nlpRecordDomain domains.NlpRecordDomain
// 			// nlpRecordDomain.AppID = 1
// 			nlpRecordDomain.Keyword = "mock_keyword"
// 			nlpRecordDomain.KeywordMinhash = 1
// 			nlpRecordDomain.Intent = "mock_intent"

// 			nlpRecordRepo.Save(&nlpRecordDomain)

// 			convey.So(nlpRecordDomain.ID, convey.ShouldEqual, 1)
// 			// convey.So(nlpRecordDomain.AppID, convey.ShouldEqual, 1)
// 			convey.So(nlpRecordDomain.Keyword, convey.ShouldEqual, "mock_keyword")
// 		})

// 		convey.Convey("FindByKeywordMinhash", func() {
// 			nlpRecordRepo := repositories.NewNlpRecordRepository(orm)

// 			for i := 1; i <= 10; i++ {
// 				var nlpRecordDomain domains.NlpRecordDomain
// 				// nlpRecordDomain.AppID = uint(i)
// 				nlpRecordDomain.Keyword = "mock_keyword" + strconv.Itoa(i)
// 				nlpRecordDomain.KeywordMinhash = uint32(i)
// 				nlpRecordDomain.Intent = "mock_intent" + strconv.Itoa(i)
// 				nlpRecordRepo.Save(&nlpRecordDomain)
// 			}

// 			resultByKeywordMinhash := nlpRecordRepo.FindByKeywordMinhash(1, 1)

// 			convey.So(resultByKeywordMinhash[0].Keyword, convey.ShouldEqual, "mock_keyword1")
// 		})

// 		convey.Convey("BulkNlpRecordInsert", func() {
// 			// nlpRecordRepo := repositories.NewNlpRecordRepository(data)

// 			// nlpRecordDomain := []interface{
// 			// 	{AppID: 0, Keyword: "mock_keyword_0", Intent: "mock_intent_0", KeywordMinhash: 0},
// 			// 	{AppID: 0, Keyword: "mock_keyword_1", Intent: "mock_intent_1", KeywordMinhash: 1},
// 			// 	{AppID: 0, Keyword: "mock_keyword_2", Intent: "mock_intent_2", KeywordMinhash: 2},
// 			// }

// 			// err := nlpRecordRepo.BulkCreateNlpRecords(1, nlpRecordDomain)

// 			// if err != nil {
// 			// 	t.Errorf(err.Error())
// 			// }

// 			// domain := nlpRecordRepo.FindByKeyword(0, "mock_keyword_1")

// 			// t.Fatal(domain)

// 			// convey.So(resultByKeywordMinhash[0].Keyword, convey.ShouldEqual, "mock_keyword1")
// 		})

// 		orm.DB.DropTableIfExists(&domains.NlpRecordDomain{})
// 	})
// }
