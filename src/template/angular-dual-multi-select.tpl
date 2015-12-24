<div class="dualmultiselect">
    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="title badge-info">
                <label>{{ labelAll }}</label>
                <button type="button" class="btn btn-default btn-xs" ng-click="selectAll()"> {{buttonCheckAll}} </button>
            </div>
            <div class="search-wrap">
                <input class="form-control input-sm" ng-model="searchLeft" placeholder="&#xF002;">
            </div>
            <div class="pool">
                <tree-view
                    input-model="inputModel"
                    ng-model="ngModel"
                    recursion-check="recursionCheck"
                    output-duplicate="outputDuplicate"
                    output-all-info="outputAllInfo"
                    options="options"
                    hash-object="hashObject"
                    filter-model="searchLeft">
                    <span>{{node[displayProperty]}}</span>
                </tree-view>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="title badge-info">
                <label>{{ labelSelected }}</label> 
                <button type="button" class="btn btn-default btn-xs" ng-click="deSelectAll()"> {{buttonDeselectAll}} </button>
            </div>
            <div class="search-wrap">
                <input class="form-control input-sm" ng-model="searchRight" placeholder="&#xF002;">
            </div>
            <div class="pool">
                <ul>
                    <li ng-repeat="item in ngModel | filter:searchRight:compareName"> 
                        <a ng-click="deSelect(item)">
                            {{ getDisplayName(item) }}
                        </a>
                    </li>
                </ul> 
            </div>
        </div>
    </div>
</div>