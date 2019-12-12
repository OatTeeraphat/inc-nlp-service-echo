    export const storyPage = Vue.component('story-page', {    
        template: `
        <div class="warp">
            <nav-component></nav-component>
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col-12 col-md-9">
                            <div class="">
                                <h2 class="">Story</h2>
                            </div>
                        </div>
                        <div class="col-12 col-md-3 text-right">
                            <div class="from-search">
                                <input type="text" class="form-control-plaintext p-0 mt-2" placeholder="Search Here">
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
                                        <!-- TODO: add ajax  -->
                                        <button @click="$storyPresenter.selectAllStory()" class="dropdown-item">Select All</button>

                                        <!-- TODO: -->
                                        <a class="dropdown-item" href="#">Trained Select</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item text-danger" href="#">Delete All</a>
                                    </div>
                                </div>
                                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                    <div class="btn-group" role="group">
                                        <button id="btnGroupDrop" type="button" class="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fe fe-upload mr-1"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-file" aria-labelledby="btnGroupDrop">
                                            <strong>Upload Story Template</strong>
                                            <div class="custom-file mt-2 mb-1">
                                                <label class="custom-file-label" for="customFile">Choose file</label>
                                                <input type="file" class="custom-file-input" id="customFile">
                                            </div>
                                            <small class="text-muted">* XLSX file max size 20 mb</small>
                                        </div>
                                    </div>
                                    <div class="btn-group" role="group">
                                        <button id="btnGroupDrop1" type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fe fe-download mr-1"></i>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                            <a class="dropdown-item" href="#">Export Trained Template</a>
                                            <a class="dropdown-item" href="#">Export Selected</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Export All</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-3 text-right">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                            <div class="table-responsive">
                                <table class="table table-fixed">
                                    <thead>
                                        <tr>
                                            <th class="col-2" scope="col">#</th>
                                            <th class="col-7" scope="col">Story</th>
                                            <th class="col-3 text-center" scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-panael">
                                        
                                        <tr class="tr-add " v-if="!$storyPresenter.view.addRow.toggleRow">
                                            <td colspan="5" class="col-12"><strong class="hover-cursor table-panael-button" 
                                                @click=" 
                                                    $storyPresenter.view.addRow.toggleRow = !$storyPresenter.view.addRow.toggleRow
                                                ">
                                                    <i class="fe fe-plus-circle mr-1"></i> Add Row</strong>
                                            </td>
                                        </tr>
                                        <tr class="tr-input faster" v-if="$storyPresenter.view.addRow.toggleRow" v-bind:class="{
                                            'fadeIn' : $storyPresenter.view.addRow.toggleRow,
                                            'animated' : $storyPresenter.view.addRow.toggleRow,
                                        }">
                                            <th scope="row" class="col-2">
                                                <button type="button" class="btn btn-table btn-link hover-danger" title="Cancle" @click="
                                                    $storyPresenter.view.addRow.toggleRow = !$storyPresenter.view.addRow.toggleRow
                                                ">
                                                    <i class="fe fe-x text-danger"></i>
                                                </button>
                                            </th>
                                            <td class="col-7"><input type="text" class="form-control-plaintext p-0" placeholder="Story Name Here" v-model="addRow.name"></td>
                                            <td class="col-3 text-center">
                                                <button type="button" class="btn btn-link btn-table hover-success" title="Add Row" >
                                                    <i class="fe fe-plus-circle"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody class="table-select">
                                        <tr v-for="(item, index) in $storyPresenter.view.stories" v-bind:class="{'tr-active' : $storyPresenter.view.currentStory == item.id }" @click="
                                            $storyPresenter.view.currentStory = item.id
                                        ">
                                            <th scope="row" class="col-2">
                                                <input :value="item.id" :id="item.id" v-model="$storyPresenter.view.storiesCheckList.ids" type="checkbox" class="styled-checkbox">
                                                <label :for="item.id"></label>
                                            </th>
                                            <td class="col-7">
                                                <h3 class="story-input" v-bind:class="{ 'd-none' : item.is_edit }" >{{ item.name }}</h3>
                                                <input type="text" class="form-control-plaintext p-0 story-input" placeholder="Story Name" v-model="item.name" ref="story" v-bind:class="{ 'd-none' : !item.is_edit }" @keyup.enter="
                                                    item.is_edit = false;
                                                    item.is_edit ? $storyPresenter.editStoryByID(item.id, index) : true;
                                                ">
                                            </td>
                                            <td class="col-3 text-center" >
                                                <button type="button" class="btn btn-link btn-table hover-warning mr-2" title="edit" @click="
                                                    item.is_edit = !item.is_edit;
                                                    item.is_edit ? $storyPresenter.editStoryByID(item.id, index) : true;
                                                ">
                                                    <i class="fe fe-edit"></i>
                                                </button>
                                                <button type="button" class="btn btn-link btn-table hover-danger mr-2" title="remove"  @click="$storyPresenter.deleteStoryByID(item.id)">
                                                    <i class="fe fe-delete"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="table-responsive">
                                <table class="table table-fixed">
                                    <thead>
                                        <tr>
                                            <th class="col-1" scope="col">#</th>
                                            <th class="col-3" scope="col">Sentence</th>
                                            <th class="col-4" scope="col">Intent</th>
                                            <th class="col-2 text-center" scope="col">Story</th>
                                            <th class="col-2 text-center" scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-panael">
                                        <tr class="tr-add " v-if="!$storyPresenter.view.addRow2.toggleRow">
                                            <td colspan="5" class="col-12"><strong class="hover-cursor table-panael-button" 
                                                @click=" 
                                                    $storyPresenter.view.addRow2.toggleRow = !$storyPresenter.view.addRow2.toggleRow
                                                ">
                                                    <i class="fe fe-plus-circle mr-1"></i> Add Row</strong>
                                            </td>
                                        </tr>
                                        <tr class="tr-input faster" v-if="$storyPresenter.view.addRow2.toggleRow" v-bind:class="{
                                            'fadeIn' : $storyPresenter.view.addRow2.toggleRow,
                                            'animated' : $storyPresenter.view.addRow2.toggleRow,
                                        }">
                                            <th scope="row" class="col-1">
                                                <button type="button" class="btn btn-table btn-link hover-danger" title="Cancle" @click="
                                                    $storyPresenter.view.addRow2.toggleRow = !$storyPresenter.view.addRow2.toggleRow
                                                ">
                                                    <i class="fe fe-x text-danger "></i>
                                                </button>
                                            </th>
                                            <td class="col-3"><input type="text" class="form-control-plaintext p-0" placeholder="Sentence"></td>
                                            <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent"></td>
                                            <th class="col-2 text-center" scope="col"><span class="badge badge-purple bg-dark px-2"><i class="fe fe-lock"></i>Greeting</span></th>
                                            <td class="col-2 text-center">
                                                <button type="button" class="btn btn-link btn-table hover-success" title="Add Row">
                                                    <i class="fe fe-plus-circle"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-for="item in $storyPresenter.view.trainingSet">
                                            <th scope="row" class="col-1">
                                                <input :value="item.id" :id="'training'+item.id" v-model="$storyPresenter.view.trainingSetCheckList.ids" type="checkbox" class="styled-checkbox">
                                                <label :for="'training'+item.id"></label>
                                            </th>
                                            <td class="col-3"><input type="text" class="form-control-plaintext p-0" placeholder="Sentence" v-model="item.keyword"></td>
                                            <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Description" v-model="item.intent"></td>
                                            <th class="col-2 text-center" scope="col"><span class="badge badge-purple">{{item.story}}</span></th>
                                            <td class="col-2 text-center" @click="$storyPresenter.deleteStoryByID(item.id)" >
                                                <button type="button" class="btn btn-link btn-table hover-danger mr-2" title="Cancle">
                                                    <i class="fe fe-delete"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,
        data: function () {
            return this.$storyPresenter.view
        },
        mounted: function () {
            this.$storyPresenter.onMounted(this.$refs)
        },
        beforeDestroy: function () {
            this.$storyPresenter.beforeDestroy()
        },
    })