var storyPresenter = Vue.component('story-presenter', {    
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
                                    <a class="dropdown-item" href="#">Select All</a>
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
                    <div class="col-6">
                        <div class="table-responsive">
                            <table class="table table-fixed">
                                <thead>
                                    <tr>
                                        <th class="col-1" scope="col">#</th>
                                        <th class="col-4" scope="col">Story Name</th>
                                        <th class="col-5" scope="col">Description</th>
                                        <th class="col-2 text-center" scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="tr-add">
                                        <td class="col-12" colspan="12" >
                                            <strong class="mx-3"><i class="fe fe-plus-circle mr-1"></i> New Story</strong>
                                        </td>
                                    </tr>
                                    <tr class="tr-input d-none">
                                        <th scope="row" class="col-1">
                                            <button type="button" class="btn btn-table btn-link hover-danger" title="Cancle">
                                                <i class="fe fe-x text-danger "></i>
                                            </button>
                                        </th>
                                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Story Name Here"></td>
                                        <td class="col-5"><input type="text" class="form-control-plaintext p-0" placeholder="Description Here"></td>
                                        <td class="col-2 text-center">
                                            <button type="button" class="btn btn-link btn-table hover-success" title="Add Row">
                                                <i class="fe fe-plus-circle"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-for="item in stories">
                                        <th scope="row" class="col-1">
                                            <input type="checkbox">
                                        </th>
                                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Story Name" v-model="item.name"></td>
                                        <td class="col-5"><input type="text" class="form-control-plaintext p-0" placeholder="Description" v-model="item.desc"></td>
                                        <td class="col-2 text-center" @click="deleteStoryByID(item.id)" >
                                            <button type="button" class="btn btn-link btn-table hover-danger mr-2" title="Cancle">
                                                <i class="fe fe-delete"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="table-responsive">
                            <table class="table table-fixed">
                                <thead>
                                    <tr>
                                        <th class="col-1" scope="col">#</th>
                                        <th class="col-4" scope="col">Intents</th>
                                        <th class="col-5" scope="col">Description</th>
                                        <th class="col-2 text-center" scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="tr-add">
                                        <td class="col-12" colspan="12" >
                                            <strong class="mx-3"><i class="fe fe-plus-circle mr-1"></i> Add Intents</strong>
                                        </td>
                                    </tr>
                                    <tr class="tr-input">
                                        <th scope="row" class="col-1">
                                            <button type="button" class="btn btn-table btn-link hover-danger" title="Cancle">
                                                <i class="fe fe-x text-danger "></i>
                                            </button>
                                        </th>
                                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intents Here"></td>
                                        <td class="col-5"><input type="text" class="form-control-plaintext p-0" placeholder="Description Here"></td>
                                        <td class="col-2 text-center">
                                            <button type="button" class="btn btn-link btn-table hover-success" title="Add Row">
                                                <i class="fe fe-plus-circle"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-for="item in intents">
                                        <th scope="row" class="col-1">
                                            <input type="checkbox">
                                        </th>
                                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intents" v-model="item.intent"></td>
                                        <td class="col-5"><input type="text" class="form-control-plaintext p-0" placeholder="Description" v-model="item.desc"></td>
                                        <td class="col-2 text-center" @click="deleteStoryByID(item.id)" >
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
        return {
            stories: [],
            intents: [
                { id: 1, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 2, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 3, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 4, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 5, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 6, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 7, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' }
            ]
        }
    },
    mounted: function () {
        this.$storyService.getStoryState().subscribe(it => { 
            this.stories.push(...it) 
        })
    },
    
    methods: {
        deleteStoryByID: function(id) {
            this.$storyService.deleteStoryByID(id).subscribe( () =>  {
                this.stories = this.stories.filter( item => item.id !== id ) 
            })
        }
    },
    beforeDestroy: function () {
        this.$storyService.disposable()
    },
})