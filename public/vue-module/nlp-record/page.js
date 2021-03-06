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
                    <div class="col-12 col-md-12">
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
                                    <button @click="$nlpRecordPresenter.bulkDeleteNlpRecord($event)" class="dropdown-item text-danger">Delete
                                        All</button>
                                </div>
                            </div>
                            <div class="btn-group mr-1" role="group" aria-label="Button group with nested dropdown">
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
                                    <button id="btnGroupDrop1" type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <i class="fe fe-download mr-1"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                        <a class="dropdown-item" href="#">Export All</a>
                                        <a class="dropdown-item" href="#">Export Selected</a>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary btn-purple ml-4" @click="$nlpRecordPresenter.onToggleAddRows(); $nlpRecordPresenter.view.toggleType ='search' "
                                    aria-haspopup="true" aria-expanded="false">
                                    Search
                                </button>
                                <button type="button" class="btn btn-secondary pl-2" @click="$nlpRecordPresenter.onToggleAddRows(); $nlpRecordPresenter.view.toggleType ='add' "
                                    aria-haspopup="true" aria-expanded="false">
                                    <i class="fe fe-plus mr-1"></i> Add
                                </button>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-12 col-md-3 text-right">
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="table-responsive">
                            <table class="table table-fixed">
                                <thead>
                                    <tr>
                                        <th class="col-2" scope="col">#</th>
                                        <th class="col-6" scope="col">Story</th>
                                        <th class="col-4 text-center" scope="col">
                                            <i class="fe fe-external-link btn-table-head"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="table-panael d-none">
                                    <tr class="tr-add " v-if="!$storyPresenter.view.addRow.toggleRow">
                                        <td colspan="5" class="col-12">
                                            <strong class="hover-cursor table-panael-button" @click=" 
                                                $storyPresenter.view.addRow.toggleRow = !$storyPresenter.view.addRow.toggleRow
                                            ">
                                            <i class="fe fe-plus-circle mr-1"></i> Add Row</strong>
                                        </td>
                                    </tr>
                                    <tr class="tr-input faster" v-if="$storyPresenter.view.addRow.toggleRow" 
                                        v-bind:class="{
                                            'fadeIn' : $storyPresenter.view.addRow.toggleRow,
                                            'animated' : $storyPresenter.view.addRow.toggleRow,
                                        }"
                                    >
                                        <th scope="row" class="col-2">
                                            <button type="button" class="btn btn-table btn-link" title="Cancle" 
                                            @click="
                                                $storyPresenter.view.addRow.toggleRow = !$storyPresenter.view.addRow.toggleRow
                                            ">
                                                <i class="fe fe-minimize-2"></i>
                                            </button>
                                        </th>
                                        <td class="col-7"><input type="text" class="form-control-plaintext p-0" placeholder="Story Name Here" v-model="$storyPresenter.view.addRow.name"></td>
                                        <td class="col-3 text-center">
                                            <button type="button" class="btn btn-link btn-table hover-success" title="Add Row" @click="$storyPresenter.insertStory()">
                                                <i class="fe fe-plus-circle"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                                <!-- <tbody class="table-select"> -->
                                <tbody class="table-select">
                                    <tr v-for="(item, index) in $storyPresenter.view.stories" v-bind:class="{'tr-active' : $storyPresenter.view.currentStory == item.id }"
                                        @click="
                                            $storyPresenter.view.currentStory = item.id
                                        ">
                                        <th scope="row" class="col-2">
                                            <!-- <input :value="item.id" :id="item.id" v-model="$storyPresenter.view.storiesCheckList.ids" type="checkbox" class="styled-checkbox"> -->
                                            <input :value="item.id" :id="item.id" disabled type="checkbox" class="styled-checkbox">
                                            <label :for="item.id"></label>
                                        </th>
                                        <td class="col-10">
                                            <h3 class="story-input">{{ item.name }}</h3>
                                        </td>
                                    </tr>
                                    <!-- <tr v-for="(item, index) in $storyPresenter.view.stories" v-bind:class="{'tr-active' : $storyPresenter.view.currentStory == item.id }"
                                        @click="
                                                                                $storyPresenter.view.currentStory = item.id
                                                                            ">
                                        <th scope="row" class="col-2">
                                            <input :value="item.id" :id="item.id" v-model="$storyPresenter.view.storiesCheckList.ids" type="checkbox" class="styled-checkbox">
                                            <label :for="item.id"></label>
                                        </th>
                                        <td class="col-6">
                                            <h3 class="story-input" v-bind:class="{ 'd-none' : item.is_edit }">{{ item.name }}</h3>
                                            <input type="text" class="form-control-plaintext p-0 story-input" placeholder="Story Name" v-model="item.name" ref="story"
                                                v-bind:class="{ 'd-none' : !item.is_edit }" @keyup.enter="
                                                                                                                item.is_edit = false;
                                                                                                                item.is_edit ? $storyPresenter.editStoryByID(item.id, index) : true;
                                                                                                            ">
                                        </td>
                                        <td class="col-4 text-center">
                                            <button type="button" class="btn btn-link btn-table hover-warning mr-2" title="edit" @click="
                                                                                        item.is_edit = !item.is_edit;
                                                                                        !item.is_edit ? $storyPresenter.editStoryByID(item.id, index) : true;
                                                                                    ">
                                                <i class="fe fe-edit" v-bind:class="{ 'fe-save' : item.is_edit, 'fe-edit' : !item.is_edit }"></i>
                                            </button>
                                            <button type="button" class="btn btn-link btn-table hover-danger mr-2" title="remove" @click="$storyPresenter.deleteStoryByID(item.id)">
                                                <i class="fe fe-delete"></i>
                                            </button>
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="table-responsive">
                            <table class="table table-fixed">
                                <thead>
                                    <tr>
                                        <th class="col-1" scope="col">#</th>
                                        <th class="col-4" scope="col">Sentence</th>
                                        <th class="col-4" scope="col">Intent</th>
                                        <th class="col-2" scope="col">Story</th>
                                        <th class="col-1 text-center" scope="col"></th>
                                    </tr>
                                    
                                </thead>

                                <tbody class="table-panael" v-bind:class="{ 'd-none' : $nlpRecordPresenter.view.toggleType != 'add' }">
                                    <tr class="tr-input faster"
                                        v-bind:class="{ 
                                        'd-none': $nlpRecordPresenter.view.addRow.toggleRow,
                                        'fadeIn' : !$nlpRecordPresenter.view.addRow.toggleRow,
                                        'animated' : !$nlpRecordPresenter.view.addRow.toggleRow
                                    }">
                                        <th scope="row" class="col-1">
                                            <button @click="$nlpRecordPresenter.insertNlpRecordsRow()" type="button" class="btn btn-link btn-table hover-success ml-2" title="Add Row">
                                                <i class="fe fe-plus-circle" v-bind:class="{'d-none' : $nlpRecordPresenter.view.addRow.inputDisabled }"></i>
                                                <div class="spinner-border" role="status" v-bind:class="{'d-none' : !$nlpRecordPresenter.view.addRow.inputDisabled }">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                        </th>
                                        <!-- // TODO: add one new keyword, intent, story -->
                                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Insert Sentence" v-model="$nlpRecordPresenter.view.addRow.keyword" @keyup.enter="$nlpRecordPresenter.insertNlpRecordsRow()" ref="keyword" autofocus :disabled="$nlpRecordPresenter.view.addRow.inputDisabled" ></td>
                                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Insert Intent" v-model="$nlpRecordPresenter.view.addRow.intent" @keyup.enter="$nlpRecordPresenter.insertNlpRecordsRow()" ref="intent" :disabled="$nlpRecordPresenter.view.addRow.inputDisabled" ></td>
                                        <td class="col-2">
                                            <div class="input-group">
                                                <input type="text" class="form-control-plaintext p-0 input-dropdown-event" placeholder="Story" data-toggle="dropdown" :disabled="true" v-model="$nlpRecordPresenter.view.addRow.story" 
                                                ref="story_name" >
                                            </div>
                                        </td>
                                        <td class="col-1 text-center">
                                            <!-- // TODO: update one keyword, intent, story -->
                                            
                                            <button type="button" class="btn btn-table btn-link" title="hidden add row bar" @click="$nlpRecordPresenter.onToggleAddRows()">
                                                <i class="fe fe-x"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody class="table-panael" v-bind:class="{ 'd-none' : $nlpRecordPresenter.view.toggleType == 'add' }">
                                    <tr class="tr-input faster"
                                        v-bind:class="{ 
                                        'd-none': !$nlpRecordPresenter.view.addRow.toggleRow,
                                        'fadeIn' : $nlpRecordPresenter.view.addRow.toggleRow,
                                        'animated' : $nlpRecordPresenter.view.addRow.toggleRow
                                    }">
                                        <th scope="row" class="col-1 pl-3">
                                            <i class="fe fe-search mr-3"></i>
                                        </th>
                                        <!-- // TODO: add one new keyword, intent, story -->
                                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Search Sentence" v-on:input="$nlpRecordPresenter.searchNlpRecordByKeyword($event)" v-model="$nlpRecordPresenter.view.searchKeyword"
                                             ref="keyword" autofocus ></td>
                                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Search  Intent" v-on:input="$nlpRecordPresenter.searchNlpRecordByKeyword($event)" v-model="$nlpRecordPresenter.view.searchKeyword"></td>
                                        <td class="col-2">
                                            <span class="badge badge-secondary badge-120"><i class="fe fe-bookmark"></i>VIEW ALL</span>
                                        </td>
                                        <td class="col-1 text-center">
                                            <button 
                                                type="button" 
                                                class="btn btn-table btn-link" 
                                                title="hidden add row bar" 
                                                @click="$nlpRecordPresenter.onToggleAddRows()" 
                                            >
                                                <i class="fe fe-x"></i>
                                            </button>
                                        </td>
                                    </tr>

                                </tbody>

                                <tbody v-if="searchNlpRecordByKeywordComputed === '' " @scroll="$nlpRecordPresenter.getMoreNlpRecordByInfiniteScroll($event)" v-bind:class="{ 'highlight' : $nlpRecordPresenter.view.addRow.highlight }" class="table-select" >
                                    <tr v-for="item in $nlpRecordPresenter.view.nlpRecords" :ref="item.id" v-bind:class="{ 'tr-active' : $nlpRecordPresenter.view.currentRow == item.id }"
                                        @click="$nlpRecordPresenter.view.currentRow = item.id"
                                    >
                                        <th scope="row" class="col-1">
                                            <input :value="item.id" :id="item.id" v-model="$nlpRecordPresenter.view.nlpRecordsCheckedList.ids" type="checkbox" class="styled-checkbox">
                                            <label :for="item.id"></label>
                                        </th>
                                        <td class="col-4"><input @keyup.enter="$nlpRecordPresenter.updateNlpRecordRow(item,$event)" type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" v-model="item.keyword"></td>
                                        <td class="col-4"><input @keyup.enter="$nlpRecordPresenter.updateNlpRecordRow(item,$event)" type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.intent"></td>
                                        <td class="col-2 overflow-hidden"><input @keyup.enter="$nlpRecordPresenter.updateNlpRecordRow(item,$event)" type="hidden" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.story_name"><span class="badge badge-purple bg-purple badge-120"><i class="fe fe-lock"></i>{{ item.story_name }}</span></td>
                                        <td class="col-1 text-center"> 
                                            <button @click="$nlpRecordPresenter.deleteNlpRecordByID(item.id)" type="button" class="btn btn-link btn-table" title="cancel">
                                                <i class="fe fe-delete"></i>
                                                <div class="spinner-border" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody v-else v-bind:class="{ 'highlight' : $nlpRecordPresenter.view.addRow.highlight }" >
                                    
                                    <tr v-for="item in $nlpRecordPresenter.view.nlpRecordsByKeyword"">
                                        <th scope="row" class="col-1">
                                            <input :value="item.id" v-model="$nlpRecordPresenter.view.nlpRecordsByKeywordCheckedList.ids" type="checkbox">
                                        </th>
                                        <!-- // TODO: update one keyword, intent, story -->
                                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" v-model="item.keyword"></td>
                                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.intent"></td>
                                        <td class="col-2 overflow-hidden"><input type="hidden" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.story_name"><span class="badge badge-purple bg-dark px-2"><i class="fe fe-lock"></i>{{ item.story_name }}</span></td>
                                        <td class="col-1 text-center">
                                            <button type="button" class="btn btn-link btn-table" title="cancel">
                                                <i class="fe fe-delete"></i>
                                                <div class="spinner-border" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
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
        </div>
    </div>
    `,
    data: function () {
        return {
            view: this.$nlpRecordPresenter.view,
            story : this.$storyPresenter.view
        }
    },
    mounted: function () {
        this.$nlpRecordPresenter.onMounted(this.$refs)
        this.$storyPresenter.onMounted(this.$refs)
    },
    computed: {
        searchNlpRecordByKeywordComputed: function(e) {  return this.$nlpRecordPresenter.searchNlpRecordByKeywordComputed() }
    },
    beforeDestroy: function () {
        this.$nlpRecordPresenter.beforeDestroy()
        this.$nlpRecordPresenter.onToggleAddRows()
    }
})