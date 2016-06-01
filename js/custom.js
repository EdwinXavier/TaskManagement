/**
* Json data 
*/
var TaskDetails = [
	{
		Id: 100,
		TaskName: "Login UI Design",
		TaskDescription: "Pellentesque dapibus hendrerit tortor. Ut id nisl quis enim dignissim sagittis. Quisque id mi. Nulla porta dolor. Curabitur suscipit suscipit tellus.Ut varius tincidunt libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Suspendisse potenti. Sed hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
		EmployeeName: "Edwin" 
	},{
		Id: 101,
		TaskName: "Registration UI Design",
		TaskDescription: "Pellentesque dapibus hendrerit tortor. Ut id nisl quis enim dignissim sagittis. Quisque id mi. Nulla porta dolor. Curabitur suscipit suscipit tellus. Ut varius tincidunt libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Suspendisse potenti. Sed hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
		EmployeeName: "Xavier" 
	}
]

$(function() {
	var dataSource = new kendo.data.DataSource({
			data: TaskDetails
		}),
		selectedTask,
		taskId = $("#taskId"),
		taskName = $("#taskName"),
		taskDescription = $("#taskDescription"),
		assignee = $("#assignee"),
		listViewConfig = {
			dataSource: dataSource,
			template: kendo.template($("#template").html()),
			selectable: true,
			change: function() {
				var index = this.select().index();
				selectedTask = this.dataSource.view()[index];

				taskId.val(selectedTask.Id);
				taskName.val(selectedTask.TaskName);
				taskDescription.val(selectedTask.TaskDescription);
				assignee.val(selectedTask.EmployeeName);
			}
		};

	/**
 	* Initializes the Task List
	*/
	$("#task-list").kendoListView(listViewConfig);

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
    * task details
    */
	$(".cards").click(function() {
		$("#taskDetails").show().kendoWindow({
			width: "23%",
	        height: "50%",
	        modal: true,
	        visible: false,
	        title: "Task Details"
	    }).data("kendoWindow").center().open();
	})
})