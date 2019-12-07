export const nlpRecordPage = Vue.component('nlp-record-page', {    
    template: `
    <div class="warp" >
        <nav-component></nav-component>
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col-12 col-md-9">
                        <div class="">
                            <h2 class="">NLP Training Set</h2>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 text-right">
                        <div class="from-search">
                            <input v-on:input="$nlpRecordPresenter.searchNlpRecordByKeyword($event)" v-model="$nlpRecordPresenter.view.searchKeyword" type="text" class="form-control-plaintext p-0 mt-2" placeholder="Search Here">
                            <i class="fe fe-search"></i>
                        </div>
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col-12 col-md-9">
                        <div class="">
                            <div class="btn-group mr-1">
                                <button type="button" class="btn btn-primary btn-purple dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Bulk Action
                                </button>
                                <div class="dropdown-menu">
                                    <button @click="$nlpRecordPresenter.selectAllNlpRecord($event)" class="dropdown-item">Select All</button>
                                    <button @click="$nlpRecordPresenter.deselectAllNlpRecord($event)" class="dropdown-item">Deselect All</button>
                                    <!-- <button @click="" class="dropdown-item">Save All</button> -->
                                    <div class="dropdown-divider"></div>
                                    <button @click="$nlpRecordPresenter.bulkDeleteNlpRecord($event)" class="dropdown-item text-danger">Delete All</button>
                                </div>
                            </div>
                            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                <div class="btn-group" role="group">
                                    <button id="btnGroupDrop" type="button" class="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fe fe-upload mr-1"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-file" aria-labelledby="btnGroupDrop">
                                        <strong>Upload Training Set</strong>
                                        <form enctype="multipart/form-data" class="custom-file mt-2 mb-1">
                                            <label class="custom-file-label" for="customFile">Choose file</label>
                                            <input class="custom-file-input" name="xlsx" type="file" id="file" ref="file" @change="$nlpRecordPresenter.uploadXlSXNlpRecord($event.target.name, $event.target.files); fileCount = $event.target.files.length">
                                        </form>
                                        <small class="text-muted">XLSX file max size 20 mb</small>
                                        </form>
                                    </div>
                                </div>
                                <div class="btn-group" role="group">
                                    <button id="btnGroupDrop1" type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fe fe-download mr-1"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                        <a class="dropdown-item" href="#">Export All</a>
                                        <a class="dropdown-item" href="#">Export Selected</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 text-right">
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-fixed">
                        <thead>
                            <tr>
                                <th class="col-1" scope="col">#</th>
                                <th class="col-4" scope="col">Sentence</th>
                                <th class="col-4" scope="col">Intent</th>
                                <th class="col-2" scope="col">Story</th>
                                <th class="col-1 text-center" scope="col">Action</th>
                            </tr>
                            
                        </thead>
                        <tbody class="table-panael">
                            <tr class="tr-add " v-bind:class="{ 'd-none': $nlpRecordPresenter.view.addRow.toggleRow }">
                                <td colspan="5" class="col-12"><strong class="hover-cursor table-panael-button" 
                                    @click=" $nlpRecordPresenter.view.addRow.toggleRow = !$nlpRecordPresenter.view.addRow.toggleRow ">
                                    <i class="fe fe-plus-circle mr-1"></i> Add Row</strong>
                                </td>
                            </tr>
                            <tr class="tr-input faster"
                                v-bind:class="{ 
                                'd-none': !$nlpRecordPresenter.view.addRow.toggleRow,
                                'fadeIn' : $nlpRecordPresenter.view.addRow.toggleRow,
                                'animated' : $nlpRecordPresenter.view.addRow.toggleRow
                            }">
                                <th scope="row" class="col-1">
                                    <button type="button" class="btn btn-table btn-link hover-danger" title="hidden add row bar" 
                                            @click="
                                                $nlpRecordPresenter.view.addRow.toggleRow = !$nlpRecordPresenter.view.addRow.toggleRow;
                                                $nlpRecordPresenter.onToggleAddRows();
                                            " >
                                        <i class="fe fe-minimize-2"></i>
                                    </button>
                                </th>
                                <!-- // TODO: add one new keyword, intent, story -->
                                <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Sentence Here" v-model="$nlpRecordPresenter.view.addRow.keyword" @keyup.enter="$nlpRecordPresenter.insertNlpRecordsRow($refs.keyword)" ref="keyword" autofocus></td>
                                <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="$nlpRecordPresenter.view.addRow.intent" @keyup.enter="$nlpRecordPresenter.insertNlpRecordsRow($refs.keyword)" ref="intent"></td>
                                <td class="col-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control-plaintext p-0 input-dropdown-event" placeholder="Story Here" data-toggle="dropdown" :disabled="true" v-model="$nlpRecordPresenter.view.addRow.story" @focus="$nlpRecordPresenter.view.addRow.toggleStory = true" ref="story_name" >
                                        <div class="input-group-append" v-bind:class="{ show : $nlpRecordPresenter.view.addRow.toggleStory }" >
                                            <button class="btn dropdown-toggle p-0 box-shadow-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                            <div class="dropdown-menu dropdown-menu-right dropdown-event" v-bind:class="{ show : $nlpRecordPresenter.view.addRow.toggleStory }">
                                                <button class="dropdown-item" @click="$nlpRecordPresenter.view.addRow.story = '----'; $nlpRecordPresenter.view.addRow.toggleStory = false">----</button>
                                                <button v-for="item in $nlpRecordPresenter.view.allStory" 
                                                        @click="
                                                        
                                                            $nlpRecordPresenter.view.addRow.story = item.name;
                                                            $nlpRecordPresenter.view.addRow.toggleStory = false;
                                                            
                                                            $nlpRecordPresenter.view.addRow.keyword !== '' ||
                                                            $nlpRecordPresenter.view.addRow.intent !== '' 
                                                            ? $nlpRecordPresenter.insertNlpRecordsRow($refs.keyword) 
                                                            : true

                                                        " 
                                                        class="dropdown-item" href="#">{{ item.name }}</button>
                                                <div class="dropdown-divider"></div>
                                                <router-link class="dropdown-item" href="#" :to="{ path: '/story'}">Add New Story</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="col-1 text-center">
                                    <!-- // TODO: update one keyword, intent, story -->
                                    <button @click="$nlpRecordPresenter.insertNlpRecordsRow($refs.keyword)" type="button" class="btn btn-link btn-table hover-success" title="Add Row">
                                        <i class="fe fe-plus-circle"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if="searchNlpRecordByKeywordComputed === '' " @scroll="$nlpRecordPresenter.getMoreNlpRecordByInfiniteScroll($event)" v-bind:class="{ 'highlight' : $nlpRecordPresenter.view.addRow.highlight }" >
                            <tr v-for="item in $nlpRecordPresenter.view.nlpRecords">
                                <th scope="row" class="col-1">
                                    <input :value="item.id" v-model="$nlpRecordPresenter.view.nlpRecordsCheckedList.ids" type="checkbox">
                                </th>
                                <td class="col-4"><input @keyup.enter="$nlpRecordPresenter.updateNlpRecordRow(item)" type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" v-model="item.keyword"></td>
                                <td class="col-4"><input @keyup.enter="$nlpRecordPresenter.updateNlpRecordRow(item)" type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.intent"></td>
                                <td class="col-2"><input @keyup.enter="$nlpRecordPresenter.updateNlpRecordRow(item)" type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.story_name"></td>
                                <td class="col-1 text-center"> 
                                    <button @click="$nlpRecordPresenter.deleteNlpRecordByID(item.id)" type="button" class="btn btn-link btn-table hover-danger" title="cancel">
                                        <i class="fe fe-delete"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <tbody v-else v-bind:class="{ 'highlight' : $nlpRecordPresenter.view.addRow.highlight }" >
                            <tr v-for="item in $nlpRecordPresenter.view.nlpRecordsByKeyword">
                                <th scope="row" class="col-1">
                                    <input :value="item.id" v-model="$nlpRecordPresenter.view.nlpRecordsByKeywordCheckedList.ids" type="checkbox">
                                </th>
                                <!-- // TODO: update one keyword, intent, story -->
                                <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" v-model="item.keyword"></td>
                                <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.intent"></td>
                                <td class="col-2"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.story_name"></td>
                                <td class="col-1 text-center">
                                    <button @click="$nlpRecordPresenter.deleteNlpRecordByID(item.id)" type="button" class="btn btn-link btn-table hover-danger" title="cancel">
                                        <i class="fe fe-delete"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row" v-show="$nlpRecordPresenter.view.isShowLoadingIndicator">
                        <div class="col-12 dot-flashing-center">
                            <div class="dot-flashing"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            view: this.$nlpRecordPresenter.view,
        }
    },
    mounted: function () {
        this.$nlpRecordPresenter.onMounted(this.$refs)
    },
    computed: {
        searchNlpRecordByKeywordComputed: function(e) {  return this.$nlpRecordPresenter.searchNlpRecordByKeywordComputed() }
    },
    beforeDestroy: function () {
        this.$nlpRecordPresenter.beforeDestroy()
        this.$nlpRecordPresenter.onToggleAddRows()
    }
})