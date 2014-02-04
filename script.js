var fb = new Firebase("https://blistering-fire-3637.firebaseio.com/");

$(document).ready(function(){
$('#submit').on('click', function () {
    var task = $('#tasks').val();
    $('#tasks').val('');
    $('#tasks').focus();
    fb.push({name: task});
});
fb.on('child_added', function(snapshot) {
    var saved_task = snapshot.val();
	$('.tasks-list').append('<li> <input type="checkbox" class="taskIsCompleted">' + saved_task.name + ' ' + '<button type="button" class="trash"> <span class="glyphicon glyphicon-trash"> </span> </button></li>');
});

$('.tasks-list').on('click', '.taskIsCompleted', function () {
    var existing_task = $(this).parent();
    completed_task = existing_task.toggleClass('done');
    fb.set({name: completed_task});
    //fb.child('name').set(completed_task);

});
//fb.on('child_changed', function(snapshot){
//	var completed = snapshot 
//});


//fb.on('child_changed', function(snapshot) {






$('.tasks-list').on('click', '.trash', function () {
    $(this).parent().remove();
});

$('#active').on('click', function () {
    $('.tasks-list .done').hide();
    $('.tasks-list :not(.done)').show();
});

$('#completed').on('click', function () {
    $('.tasks-list :not(.done)').hide();
    $('.tasks-list .done').show();
});

$('#all').on('click', function () {
    $('.tasks-list :not(.done)').show();
    $('.tasks-list .done').show();
});

});
