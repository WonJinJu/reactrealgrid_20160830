"use strict";

//Main 그리드
var dataProvider;
var gridView;
//상세데이터 그리드
var dataProvider_Right;
var gridView_Right;

$(document).ready(function () {
    //1. Grid컨드롤을 화면상에 올리기
    createGrid_Main();
    createGrid_Detail();

    //2. DataProvider DataFeild 만들기
    setDataFields_Main();
    setDataFields_Detail();

    //3. GridView에 Columns 구성
    setColumns_Main();
    setColumns_Detail();

    //4. API 통해서 DataProvider에 Data 채우기
    //버튼을 클릭하면 Main Data Load.
    //$("#btnSearch").on("click", function () {
    LoadData();
    //})

    //5.GridView Style 적용
    //....요긴 디자인 영역
    setStyles(gridView);
    setStyles(gridView_Right);

    //6. GridView Option 수정
    setOptions_Main();
    setOptions_Detail();
    //******************************//

    //7. GridView에 대한 이벤트
    setGridCallbackFunc();
    setGridCallbackFunc_Right();
    //******************************//
});

//기본적으로 세팅해야 그리드가 제대로 만들어짐
function createGrid_Main() {
    var id = "realgrid";

    RealGridJS.setTrace(false);
    RealGridJS.setRootContext("./script");

    dataProvider = new RealGridJS.LocalDataProvider();
    gridView = new RealGridJS.GridView(id);
    gridView.setDataSource(dataProvider);
}

function createGrid_Detail() {
    var id = "realgrid_Right";

    RealGridJS.setTrace(false);
    RealGridJS.setRootContext("./script");

    dataProvider_Right = new RealGridJS.LocalDataProvider();
    gridView_Right = new RealGridJS.GridView(id);
    gridView_Right.setDataSource(dataProvider_Right);
}

function setDataFields_Main() {
    //*** A5 컬럼-필드 연결하기 ***//
    var fields = [{
        fieldName: "cd_deptemp"
    }, {
        fieldName: "nm_deptemp"
    }, {
        fieldName: "yn_disabled"
    }];
    //DataProvider의 setFields함수로 필드를 입력합니다.
    dataProvider.setFields(fields);
}

function setDataFields_Detail() {
    //*** A5 컬럼-필드 연결하기 ***//
    var fields = [{
        fieldName: "cd_deptemp"
    }, {
        fieldName: "nm_deptemp"
    }, {
        fieldName: "yn_disabled"
    }, {
        fieldName: "da_enter",
        //알아내기 힘드네..실데이터는 20160903 => 화면상엔 2016/09/03 이런식으로 보이도록
        dataType: "datetime",
        datetimeFormat: "yyyyMMdd"
    }, {
        fieldName: "nm_position"
    }, {
        fieldName: "em_dam"
    }, {
        fieldName: "tel_dam1"
    }, {
        fieldName: "tel_dam2"
    }, {
        fieldName: "tel_dam3"
    }, {
        fieldName: "cel_dam1"
    }, {
        fieldName: "cel_dam2"
    }, {
        fieldName: "cel_dam3"
    }, {
        fieldName: "ty_reason"
    }, {
        fieldName: "no_zip"
    }, {
        fieldName: "add_saaddr"
    }];
    //DataProvider의 setFields함수로 필드를 입력합니다.
    dataProvider_Right.setFields(fields);
}

function setColumns_Main() {
    //*** A2 컬럼 만들기 ***//
    var columns = [{
        name: "cd_deptemp",
        fieldName: "cd_deptemp",
        header: {
            text: "코드"
        },
        required: true,
        requiredLevel: "error",
        requiredMessage: "부서코드는 반드시 입력해야 합니다.",
        editor: {
            type: "number",
            maxLength: 2,
            positiveOnly: true
        },
        styles: {
            textAlignment: "center"
        },
        width: 60
    }, {
        name: "nm_deptemp",
        fieldName: "nm_deptemp",
        header: {
            text: "부서명"
        },
        required: true,
        requiredLevel: "info",
        requiredMessage: "부서명은 반드시 입력해야 합니다.",
        width: 150
    }, {
        name: "yn_disabled",
        fieldName: "yn_disabled",
        header: {
            text: "사용"
        },
        /*editor: {
         type: "dropDown",
         maxLength: 1,
         dropDownCount: 2,
         values: ["여", "부"],
         labels: ["여", "부"]
         },*/
        editor: {
            maxLength: 1
        },
        renderer: {
            type: "check",
            editable: true,
            startEditOnClick: true,
            trueValues: "여",
            falseValues: "부",
            labelPosition: "right"
        },
        defaultValue: "여",
        styles: {
            textAlignment: "center"
        },
        width: 50
    }];
    gridView.setColumns(columns);
}

function setColumns_Detail() {
    //*** A2 컬럼 만들기 ***//
    var columns = [{
        name: "cd_deptemp",
        fieldName: "cd_deptemp",
        header: {
            text: "코드"
        },
        required: true,
        requiredLevel: "error",
        requiredMessage: "사원코드는 반드시 입력해야 합니다.",
        editor: {
            type: "number",
            maxLength: 2
        },
        styles: {
            textAlignment: "center"
        },
        width: 60
    }, {
        name: "nm_deptemp",
        fieldName: "nm_deptemp",
        header: {
            text: "사원명"
        },
        required: true,
        requiredLevel: "info",
        requiredMessage: "사원명 반드시 입력해야 합니다.",
        width: 100
    }, {
        name: "yn_disabled",
        fieldName: "yn_disabled",
        header: {
            text: "사용"
        },
        /*editor: {
            type: "dropDown",
            maxLength: 1,
            dropDownCount: 2,
            values: ["0", "1"],
            labels: ["여", "부"]
        },*/
        editor: {
            maxLength: 1
        },
        renderer: {
            type: "check",
            editable: true,
            startEditOnClick: true,
            trueValues: "여",
            falseValues: "부",
            labelPosition: "right"
        },
        defaultValue: "여",
        styles: {
            textAlignment: "center"
        },
        width: 40
    }, {
        name: "da_enter",
        fieldName: "da_enter",
        header: {
            text: "입사년월일"
        },
        editor: {
            type: "date"
        },
        styles: {
            textAlignment: "center",
            //알아내기 힘드네..실데이터는 20160903 => 화면상엔 2016/09/03 이런식으로 보이도록
            //요기가 화면상에 보일 포맷지정하는 부분
            datetimeFormat: "yyyy-MM-dd"
        },
        width: 80
    }, {
        name: "nm_position",
        fieldName: "nm_position",
        header: {
            text: "직위"
        },
        editor: {
            maxLength: 10
        },
        width: 80
    }, {
        name: "em_dam",
        fieldName: "em_dam",
        header: {
            text: "이메일"
        },
        editor: {
            type: "number",
            maxLength: 60
        },
        styles: {
            textAlignment: "near"
        },
        width: 150
    }, {
        name: "tel_dam1",
        fieldName: "tel_dam1",
        editor: {
            type: "number",
            maxLength: 4,
            positiveOnly: true
        },
        header: {
            text: "연락처"
        },
        styles: {
            textAlignment: "center"
        },
        width: 40
    }, {
        name: "tel_dam2",
        fieldName: "tel_dam2",
        editor: {
            type: "number",
            maxLength: 4,
            positiveOnly: true
        },
        header: {
            text: "연락처"
        },
        styles: {
            textAlignment: "center"
        },
        width: 40
    }, {
        name: "tel_dam3",
        fieldName: "tel_dam3",
        editor: {
            type: "number",
            maxLength: 4,
            positiveOnly: true
        },
        header: {
            text: "연락처"
        },
        styles: {
            textAlignment: "center"
        },
        width: 40
    }, {
        name: "cel_dam1",
        fieldName: "cel_dam1",
        editor: {
            type: "number",
            maxLength: 4,
            positiveOnly: true
        },
        header: {
            text: "휴대전화"
        },
        styles: {
            textAlignment: "center"
        },
        width: 50
    }, {
        name: "cel_dam2",
        fieldName: "cel_dam2",
        editor: {
            type: "number",
            maxLength: 4,
            positiveOnly: true
        },
        header: {
            text: "휴대전화"
        },
        styles: {
            textAlignment: "center"
        },
        width: 50
    }, {
        name: "cel_dam3",
        fieldName: "cel_dam3",
        editor: {
            type: "number",
            maxLength: 4,
            positiveOnly: true
        },
        header: {
            text: "휴대전화"
        },
        styles: {
            textAlignment: "center"
        },
        width: 50
    }, {
        name: "ty_reason",
        fieldName: "ty_reason",
        header: {
            text: "변동사유"
        },
        editor: {
            type: "dropDown",
            maxLength: 1,
            dropDownCount: 5,
            values: ["", "퇴사", "부서이동", "전출", "기타"],
            labels: ["", "퇴사", "부서이동", "전출", "기타"]
        },
        styles: {
            textAlignment: "center"
        },
        width: 80
    }, {
        name: "no_zip",
        fieldName: "no_zip",
        editor: {
            type: "number",
            maxLength: 6,
            positiveOnly: true
        },
        header: {
            text: "우편번호"
        },
        styles: {
            textAlignment: "center"
        },
        width: 50
    }, {
        name: "add_saaddr",
        fieldName: "add_saaddr",
        header: {
            text: "주소"
        },
        editor: {
            maxLength: 100
        },
        width: 300
    }];
    gridView_Right.setColumns(columns);
}

function setStyles(grid) {

    //gridViewStyles()는 gridViewStyles.js에 있는 함수임(html에 스트립트 추가함)
    grid.setStyles(gridViewStyles());
};

function setOptions_Main() {
    /* 아래처럼 개별로 옵션 적용 가능
     // panel
     gridView.setPanel({
     visible: false
     });
     // state bar
     gridView.setStateBar({
     visible: false
     });
     // check bar
     gridView.setCheckBar({
     visible: false
     });
     // header
     gridView.setHeader({
     minHeight: 30
     });
     // footer
     gridView.setFooter({
     visible: false
     });*/
    //개별 옵션 적용 가능 하나, 나는 아래처럼 뭉탱이로 하겠다. 한군데에 깔끔하게!
    gridView.setOptions({
        panel: { visible: false },
        indicator: { visible: true },
        checkBar: { visible: false },
        stateBar: { visible: false }
    });

    gridView.setEditOptions({
        //insertable: true,
        //appendable: true,
        //deletable: true,
        commitWhenExitLast: true
    });
};

function setOptions_Detail() {
    /* 아래처럼 개별로 옵션 적용 가능
     // panel
     gridView.setPanel({
     visible: false
     });
     // state bar
     gridView.setStateBar({
     visible: false
     });
     // check bar
     gridView.setCheckBar({
     visible: false
     });
     // header
     gridView.setHeader({
     minHeight: 30
     });
     // footer
     gridView.setFooter({
     visible: false
     });*/
    //개별 옵션 적용 가능 하나, 나는 아래처럼 뭉탱이로 하겠다. 한군데에 깔끔하게!
    gridView_Right.setOptions({
        panel: { visible: false },
        indicator: { visible: true },
        checkBar: { visible: false },
        stateBar: { visible: false }
    });
    //열 고정 옵션
    gridView_Right.setFixedOptions({
        colCount: 3
    });
    gridView_Right.setEditOptions({
        //insertable: true,
        //appendable: true,
        //deletable: true,
        crossWhenExitLast: true //tab/enter 키로 마지막 셀을 벗어날 때 다음 행으로 이동한다.
    });
};

//API 관련 Method [select, insert, update, delete]
function LoadData() {
    $.ajax({
        url: "http://localhost:8000/testApp/",
        contentType: 'application/json',
        cache: false
    }).success(function (response) {

        dataProvider.setRows(response.data.data);
        gridView.setFocus();
        /*var a = new Array();
           for(i = 0; i < 1000; i++){
         for(var ar in response.data.data){
         a.push(response.data.data[ar])
         }
         }
         dataProvider.setRows(a);*/
    }).complete(function (response) {
        SetProviderNewRow(gridView, dataProvider);
    });
}

function LoadData_Right(pCdDeptemp) {
    $.ajax({
        url: "http://localhost:8000/testApp/" + pCdDeptemp + '/',
        contentType: 'application/json',
        cache: false
    }).success(function (response) {
        dataProvider_Right.setRows(response.data.data);
    }).complete(function (response, pCdDeptemp) {
        SetProviderNewRow(gridView_Right, dataProvider_Right);
    });
}

// gridview callback method
function setGridCallbackFunc() {
    //GridView와 연결된 이벤트
    gridView.onCurrentChanged = function (grid, newIndex) {
        //keyDown or KeyPress 이벤트로 옮길까
        if (newIndex.fieldName == "yn_disabled") gridView_Right.setFocus();
    };

    gridView.onCurrentRowChanged = function (grid, oldRow, newRow) {
        // 09.07. 최초 입력시에만 수정가능하도록
        //var isNew = (newRow < 0) || dataProvider.getRowState(newRow) === "created";

        //if (!RealGridJS.isMobile())
        //    grid.setColumnProperty("cd_deptemp", "editable", isNew);

        var fields = dataProvider.getFields();
        var fieldIndex = findField(fields, "cd_deptemp");
        dataProvider_Right.clearRows();
        if (grid.getValue(newRow, fieldIndex) != undefined && grid.getValue(newRow, fieldIndex).length == 2) {
            LoadData_Right(grid.getValue(newRow, fieldIndex));
        } else {
            //SetProviderNewRow(gridView_Right, dataProvider_Right)
        }
    };

    //편집이 끝나면 다음 셀로 이동시키기
    gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        var focusCell = gridView.getCurrent();
        //focusCell.dataRow = 0;
        //alert(focusCell.dataRow)
        if (focusCell.fieldName == "cd_deptemp") {
            focusCell.column = "nm_deptemp";
            focusCell.fieldName = "nm_deptemp";
        } else if (focusCell.fieldName == "nm_deptemp") {
            focusCell.column = "yn_disabled";
            focusCell.fieldName = "yn_disabled";

            gridView.commit();
            InsertDEPT(gridView, dataProvider, itemIndex, dataRow);
        } else {
            /*focusCell.dataRow = focusCell.dataRow + 1;
            focusCell.column = "cd_deptemp";
            focusCell.fieldName = "cd_deptemp";*/
            gridView_Right.setFocus();
        }
        //포커스된 셀 변경
        gridView.setCurrent(focusCell);
    };
}

function setGridCallbackFunc_Right() {
    gridView_Right.onCurrentRowChanged = function (grid, oldRow, newRow) {}
    //09.07. 최초 입력시에만 수정가능하도록
    //var isNew = (newRow < 0) || dataProvider_Right.getRowState(newRow) === "created";

    //if (!RealGridJS.isMobile())
    //    grid.setColumnProperty("cd_deptemp", "editable", isNew);

    //편집이 끝나면 다음 셀로 이동시키기
    ;gridView_Right.onCellEdited = function (grid, itemIndex, dataRow, field) {
        var focusCell = gridView_Right.getCurrent();
        //focusCell.dataRow = 0;
        //alert(focusCell.dataRow)
        if (focusCell.fieldName == "nm_deptemp") {
            focusCell.column = "yn_disabled";
            focusCell.fieldName = "yn_disabled";

            gridView_Right.commit();
            InsertDEPT(gridView_Right, dataProvider_Right, itemIndex, dataRow);
        } else if (focusCell.fieldName == "add_saaddr") {
            focusCell.dataRow = focusCell.dataRow + 1;
            focusCell.column = "cd_deptemp";
            focusCell.fieldName = "cd_deptemp";
        } else {
            var colNames = gridView_Right.getColumnNames(false);
            var nextColName = '';
            for (var i = 0; i < colNames.length; i++) {
                if (colNames[i] == focusCell.fieldName) {
                    if (i < colNames.length - 1) {
                        nextColName = colNames[i + 1];
                    } else {
                        nextColName = "cd_deptemp";
                    }
                }
            }
            focusCell.column = nextColName;
            focusCell.fieldName = nextColName;
        }
        //포커스된 셀 변경
        gridView_Right.setCurrent(focusCell);
    };
}

//개발자가 필요에 의해 추가한 이벤트
function findField(fields, fieldName) {
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].fieldName.toUpperCase() == fieldName.toUpperCase()) return i;
    }
    return -1;
}

function InsertDEPT(grid, provider, itemIndex, datarow) {
    if (grid.getValues(itemIndex) != undefined) {
        var insertRow = [grid.getValues(itemIndex).cd_deptemp, grid.getValues(itemIndex).nm_deptemp, grid.getValues(itemIndex).yn_disabled == "여" ? 0 : 1];
        provider.insertRow(insertRow);
        grid.setValue(itemIndex, 'yn_disabled', "여");
        SetProviderNewRow(grid, provider);
    }
}

function SetProviderNewRow(grid, provider) {
    var row = provider.addRow({ yn_disabled: "" });
    grid.setCurrent({ dataRow: row });
}

//# sourceMappingURL=main-compiled.js.map