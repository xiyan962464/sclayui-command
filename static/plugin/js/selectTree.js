
//id div 的id，isMultiple 是否多选，chkboxType 多选框类型{"Y": "ps", "N": "s"} 详细请看ztree官网
function initSelectTree(id, isMultiple, chkboxType) {
    var setting = {
        view: {
            dblClickExpand: false,
            showLine: false
        },
        data: {
            simpleData: {
            	enable: true,
    			idKey: "id",
    			pIdKey: "pid",
    			rootPId: ""
            }
        },
        check: {
            enable: false,
            chkboxType: {"Y": "ps", "N": "s"}
        },
        callback: {
            onClick: onClick,
            onCheck: onCheck
        }
    };
    if (isMultiple) {
        setting.check.enable = isMultiple;
    }
    if (chkboxType !== undefined && chkboxType != null) {
        setting.check.chkboxType = chkboxType;
    }
    var html = '<div class = "layui-select-title" >' +
        '<input id="' + id + 'Show"' + 'type = "text" placeholder = "请选择" value = "" class = "layui-input" readonly>' +
        '<i class= "layui-edge" ></i>' +
        '</div>';
    $("#" + id).append(html);
    $("#" + id).parent().append('<div class="tree-content scrollbar">' +
        '<input type="hidden" id="' + id + 'Hide" ' +
        'name="' + $(".select-tree").attr("id") + '" uuids="">' +
        '<ul id="' + id + 'Tree" class="ztree scrollbar" style="margin-top:0;"></ul>' +
        '</div>');
    $("#" + id).bind("click", function () {
        if ($(this).parent().find(".tree-content").css("display") !== "none") {
            hideMenu()
        } else {
            $(this).addClass("layui-form-selected");
            var Offset = $(this).offset();
            var width = $(this).width() - 2;
            $(this).parent().find(".tree-content").css({
                left: Offset.left + "px",
                top: Offset.top + $(this).height() + "px"
            }).slideDown("fast");
            $(this).parent().find(".tree-content").css({
                width: width
            });
         // $("body").bind("mousedown", onBodyDown);
        }
    });
    $.fn.zTree.init($("#" + id + "Tree"), setting, zNodes);
    
    $("body").click(function(){
    	$(".tree-content").fadeOut("fast");
    });
    $("#"+id+", .tree-content").click(function(event){
    	if (event.stopPropagation) { 
            // this code is for Mozilla and Opera 
            event.stopPropagation(); 
        }else if (window.event) { 
            // this code is for IE 
            window.event.cancelBubble = true; 
        }
    });
}

function beforeClick(treeId, treeNode) {
    var check = (treeNode && !treeNode.isParent);
    if (!check) alert("只能选择城市...");
    return check;
}

function onClick(event, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    if (zTree.setting.check.enable == true) {
        zTree.checkNode(treeNode, !treeNode.checked, false)
        assignment(treeId, zTree.getCheckedNodes());
    } else {
        assignment(treeId, zTree.getSelectedNodes());
        hideMenu();
    }
}

function onCheck(event, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    assignment(treeId, zTree.getCheckedNodes());
}

function hideMenu() {
    $(".select-tree").removeClass("layui-form-selected");
    $(".tree-content").fadeOut("fast");
    // $("body").unbind("mousedown", onBodyDown);
}

function assignment(treeId, nodes) {
    var names = "";
    var ids = "";
    var uuids = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        names += nodes[i].name + ",";
        ids += nodes[i].id + ",";
        uuids += nodes[i].uuid + ",";
    }
    if (names.length > 0) {
        names = names.substring(0, names.length - 1);
        ids = ids.substring(0, ids.length - 1);
        uuids = uuids.substring(0, uuids.length - 1);
    }
    treeId = treeId.substring(0, treeId.length - 4);
    $("#" + treeId + "Show").attr("value", names);
    $("#" + treeId + "Show").attr("title", names);
    $("#" + treeId + "Hide").attr("value", ids);
    $("#" + treeId + "Hide").attr("uuids", uuids);
}

function cleanSelectItems(treeId) {
	$("#" + treeId + "Show").attr("value", "");
    $("#" + treeId + "Show").attr("title", "");
    $("#" + treeId + "Hide").attr("value", "");
    $("#" + treeId + "Hide").attr("uuids", "");
}

function getSelectItems(treeId) {
	return {
		names: $("#" + treeId + "Show").attr("value")
		,ids: $("#" + treeId + "Hide").attr("value")
		,uuids: $("#" + treeId + "Hide").attr("uuids")
	};
}

function setTreeValue(treeId, name, val) {
	$("#" + treeId + "Show").attr("value", name);
    $("#" + treeId + "Show").attr("title", name);
    $("#" + treeId + "Hide").attr("uuids", val);
}

function onBodyDown(event) {
    if ($(event.target).parents(".tree-content").html() == null) {
        hideMenu();
    }
}