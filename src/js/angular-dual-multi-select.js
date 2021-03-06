/**
 * @file 两个选择框多级选择组建
 * @author 862802759@qq.com
 */
angular.module('DualMultiSelect', ['TreeView'])
.directive('dualmultiselect', function () {
    return {
        restrict: 'AE',
        scope: {
            inputModel: '=',
            ngModel: '=',
            outputAllInfo: '=',
            recursionCheck: '=',
            outputAllInfo: '=',
            outputDuplicate: '=',
            options: '='
        },
        controller: function ($scope) {

            $scope.options = $scope.options || {};
            $scope.valueProperty = $scope.options.valueProperty || 'id';
            $scope.displayProperty = $scope.options.displayProperty || 'text';
            $scope.children = $scope.options.childrenProperty || 'children';
            $scope.labelSelected = $scope.options.labelSelected || '已选择的内容';
            $scope.labelAll = $scope.options.labelAll || '待选择内容';
            $scope.buttonCheckAll = $scope.options.buttonCheckAll || '全选';
            $scope.buttonDeselectAll = $scope.options.buttonDeselectAll || '全不选';

            $scope.hashObject = {};

            var utils = {
                getParentItem: function (data) {
                    if ($scope.outputAllInfo) {
                        return data.$treeView.parentData;
                    }
                    if ($scope.hashObject[data].$treeView.parentData) {
                        return $scope.hashObject[data].$treeView.parentData[$scope.valueProperty];
                    }
                    return undefined;
                },
                unwrap: function (result) {
                    for (var i = 0; i < result.length; i++) {
                        result[i] = result[i][$scope.valueProperty];
                    }
                }
            };

            $scope.selectAll = function () {
                $scope.ngModel = [];
                angular.forEach($scope.hashObject, function (item) {
                    if ($scope.outputAllInfo) {
                        $scope.ngModel.push(item);
                    }
                    else {
                        $scope.ngModel.push(item[$scope.valueProperty]);
                    }
                });
            };

            $scope.deSelectAll = function () {
                $scope.ngModel = [];
            };
            $scope.deSelect = function (item) {
                var parentItem;
                if ($scope.recursionCheck) {
                    parentItem = utils.getParentItem(item);
                    if (angular.isDefined(parentItem) && $scope.ngModel.indexOf(parentItem) !== -1) {
                        $scope.ngModel.splice($scope.ngModel.indexOf(parentItem), 1);
                    }
                    // 递归去掉子层
                    var currentObj = $scope.outputAllInfo ? item : $scope.hashObject[item];
                    if (currentObj[$scope.children] && currentObj[$scope.children].length) {
                        // 判断ngModel中有没有子层
                        // !outputDuplicate就没有
                        var firstChild = $scope.outputAllInfo
                            ? currentObj[$scope.children][0]
                            : currentObj[$scope.children][0][$scope.valueProperty];
                        if ($scope.ngModel.indexOf(firstChild) !== -1) {
                            var stack = [];
                            for (var i = 0; i < currentObj[$scope.children].length; i++) {
                                stack.push(currentObj[$scope.children][i]);
                            }
                            while (stack.length) {
                                currentObj = stack.pop();
                                var currentItem = $scope.outputAllInfo ? currentObj : currentObj[$scope.valueProperty];
                                $scope.ngModel.splice($scope.ngModel.indexOf(currentItem), 1);
                                if (currentObj[$scope.children] && currentObj[$scope.children].length) {
                                    for (i = 0; i < currentObj[$scope.children].length; i++) {
                                        stack.push(currentObj[$scope.children][i]);
                                    }
                                }
                            }
                        }
                    }
                }
                $scope.ngModel.splice($scope.ngModel.indexOf(item), 1);
            };

            $scope.compareName = function (actual, expected) {
                return $scope.getDisplayName(actual).toString().toLowerCase().indexOf(expected.toLowerCase()) !== -1;
            };

            $scope.getDisplayName = function (item) {
                if ($scope.outputAllInfo) {
                    return item[$scope.displayProperty];
                }
                if ($scope.hashObject[item]) {
                    return $scope.hashObject[item][$scope.displayProperty];
                }
            };
        },
        templateUrl: 'angular-dual-multi-select.tpl'
    };
});
