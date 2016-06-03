/**
* Json data 
*/
var TaskDetails = [
	{
		id: 0,
		taskName: "Login UI Design",
		taskDescription: "Pellentesque dapibus hendrerit tortor. Ut id nisl quis enim dignissim sagittis. Quisque id mi. Nulla porta dolor. Curabitur suscipit suscipit tellus.Ut varius tincidunt libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Suspendisse potenti. Sed hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
		employeeName: "Edwin",
		status: "Assigned Task"
	},{
		id: 1,
		taskName: "Registration UI Design",
		taskDescription: "Pellentesque dapibus hendrerit tortor. Ut id nisl quis enim dignissim sagittis. Quisque id mi. Nulla porta dolor. Curabitur suscipit suscipit tellus. Ut varius tincidunt libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Suspendisse potenti. Sed hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
		employeeName: "Xavier",
		status: "In Development"
	}
]

$(function() {
	var selected,
		id = 1,
		createTask = false,
		listView,
		item,
		notification,
		taskId = $("#taskId"),
		taskName = $("#taskName"),
		taskDescription = $("#taskDescription"),
		assignee = $("#assignee"),
		actionButton = $("#action-buttons");

	/**
    * @name getSelectedTaskDetails
    * @description
    * Gets the details of the selected list
    */
	var getSelectedTaskDetails = function() {
		var id = this.select().data();
		for(var i=0; i<dataSource.data().length; i++) {
			if(id.id === dataSource.data()[i].id) {
				selected = dataSource.data()[i];
			}
		}

		taskId.val(selected.id);
		taskName.val(selected.taskName);
		taskDescription.val(selected.taskDescription);
		assignee.val(selected.employeeName);
		setEditPermission();
		showPopUpWindow();
	}

	// Might be helpful for deleting the sorted cards
	var getTheSortedItem = function(e) {
		item = e.item.data().id;
		listView.remove(listView.at(item));
	}

	/**
    * @name showPopUpWindow
    * @description
    * opens up the popup window
    */
	var showPopUpWindow = function() {
		$("#taskDetails").show().kendoWindow({
			width: "23%",
	        height: "50%",
	        modal: true,
	        visible: false,
	        title: "Task Details"
	    }).data("kendoWindow").center().open();
	}

	/**
    * @name clearData
    * @description
    * clears the data in the input fields
    */
	var clearData = function() {
		taskId.val("") && taskName.val("") && taskDescription.val("") && assignee.val("");
	}

	/**
    * @name setEditPermission
    * @description
    * sets readonly attribute according to the
    * flag set
    */
    var setEditPermission = function() {
    	if(createTask) {
    		$("#id-field").hide();
			taskName.attr("readonly", false);
			taskDescription.attr("readonly", false);
			assignee.attr("readonly", false);
			actionButton.show();
    	} else {
    		$("#id-field").show();
    		taskId.attr("readonly", true);
			taskName.attr("readonly", true);
			taskDescription.attr("readonly", true);
			assignee.attr("readonly", true);
			actionButton.hide();
    	}
    }

	var dataSource = new kendo.data.DataSource({
		data: TaskDetails
	});

	var listViewConfig = {
		dataSource: dataSource,
		template: kendo.template($("#template").html()),
		selectable: true,
		change: getSelectedTaskDetails
	};

	/**
 	* Initializes the Task List and other list views
	*/
	$("#task-list").kendoListView(listViewConfig);

	listView = $("#task-list").data("kendoListView").dataSource;

	$("#dev-list, #review-list, #completed-list").kendoListView({
		selectable: true,
		change: getSelectedTaskDetails
	});

	/**
 	* Initializes all the list view to be sortable
	*/
	$("#task-list").kendoSortable({
		filter: ">div.cards",
		cursor: "move",
		connectWith: "#dev-list, #review-list, #completed-list"
        //start: getTheSortedItem
	});

	$("#dev-list").kendoSortable({
		connectWith: "#review-list, #completed-list, #task-list"
	})
	$("#review-list").kendoSortable({
		connectWith: "#completed-list, #task-list, #dev-list"
	})
	$("#completed-list").kendoSortable({
		connectWith: "#dev-list, #task-list, #review-list"
	})

	notification = $("#notification").kendoNotification({
        position: {
            pinned: true,
            top: 102,
            right: 30
        },
        autoHideAfter: 3000,
        stacking: "down",
        templates: [{
            type: "error",
            template: $("#errorTemplate").html()
        }, {
        	type: "success",
        	template: $("#successTemplate").html()
        }]
	}).data("kendoNotification");

	/**
    * @event click
    * @description
    * Open the popup window which displays
    * task details in a popup window
    */
	$(".cards").on("click",function() {
		setEditPermission();
		showPopUpWindow();
	})

	/**
    * @event click
    * @description
    * closes the popup of create new task
    */
    $("#cancel").click(function() {
    	$("#taskDetails").data("kendoWindow").close();
	})


	/**
    * @event click
    * @description
    * Open the popup window to create a
    * new task and assign it to a person
    */
    $("#create").click(function() {
    	createTask = true;
		clearData();
		setEditPermission();
		showPopUpWindow();
		createTask = false;
    })

    /**
    * @event click
    * @description
    * saves the new task
    */
    $("#create-new").click(function() {
    	if(taskName.val() === "" || taskDescription.val() === "" || assignee.val() === "") {
    		notification.show({
	            message: "Please fill in all the details"
	        }, "error");
    	} else {
    		listViewConfig.dataSource.add({id: ++id, taskName: taskName.val(), taskDescription: taskDescription.val(), 
    									employeeName: assignee.val()});
    		$("#taskDetails").data("kendoWindow").close();
    		notification.show({
	            message: "Task created successfully"
	        }, "success");
    	}
    })
})