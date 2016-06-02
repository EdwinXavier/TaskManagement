/**
* Json data 
*/
var TaskDetails = [
	{
		Id: 0,
		TaskName: "Login UI Design",
		TaskDescription: "Pellentesque dapibus hendrerit tortor. Ut id nisl quis enim dignissim sagittis. Quisque id mi. Nulla porta dolor. Curabitur suscipit suscipit tellus.Ut varius tincidunt libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Suspendisse potenti. Sed hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
		EmployeeName: "Edwin" 
	},{
		Id: 1,
		TaskName: "Registration UI Design",
		TaskDescription: "Pellentesque dapibus hendrerit tortor. Ut id nisl quis enim dignissim sagittis. Quisque id mi. Nulla porta dolor. Curabitur suscipit suscipit tellus. Ut varius tincidunt libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Suspendisse potenti. Sed hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
		EmployeeName: "Xavier" 
	}
]

$(function() {
	var selected,
		id = 1,
		createTask = false,
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
			if(id.id === dataSource.data()[i].Id) {
				selected = dataSource.data()[i];
			}
		}

		taskId.val(selected.Id);
		taskName.val(selected.TaskName);
		taskDescription.val(selected.TaskDescription);
		assignee.val(selected.EmployeeName);
		setEditPermission();
		showPopUpWindow();
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
    	listViewConfig.dataSource.add({Id: ++id, TaskName: taskName.val(), TaskDescription: taskDescription.val(), 
    									EmployeeName: assignee.val()});
    	$("#taskDetails").data("kendoWindow").close();
    })
})