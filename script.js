var fb = new Firebase("https://blistering-fire-3637.firebaseio.com/");

$(document).ready(function(){
$('#submit').on('click', function () {
    var task = $('#tasks').val();
    $('#tasks').val('');
    $('#tasks').focus();
    // tworzymy referencje listy by ja pozniej uzyc
    fbTask = fb.push();
    // ustawiamy wartosc name aktualnego elementu listy
    fbTask.set({name: task});
});
fb.on('child_added', function(snapshot) {
    var saved_task = snapshot.val();
    // tworzymy element listy jako element jquery
    list_elem = $('<li> <input type="checkbox" class="taskIsCompleted">' + saved_task.name + ' ' + '<button type="button" class="trash"> <span class="glyphicon glyphicon-trash"> </span> </button></li>')
	// dodajemy element listy do listy
	$('.tasks-list').append(list_elem);
	// do 'storage' danego elementu zapisujemy referencje obiektu firebase
	// dla ktorego niniejszy callback sie wywolal
	// wiecej na
	// http://api.jquery.com/data/ - o metodzie data()
	// i czego potrzebujemy w firebase:
	// https://www.firebase.com/docs/javascript/firebase/on.html
	// https://www.firebase.com/docs/javascript/datasnapshot/index.html
	// i najwazniejsze: https://www.firebase.com/docs/creating-references.html
	list_elem.data("fbRef", snapshot.ref());
});

$('.tasks-list').on('click', '.taskIsCompleted', function () {
    var existing_task = $(this).parent();
    existing_task.toggleClass('done');
    // a tutaj odczytujemy dane z aktualnego noda jquery
    // klucz to fbRef zapisany powyzej. Przechowuje on referencje
    // do obiektu listy ktory jest uzywany do przechowywania danych w firebase
    fbRef = existing_task.data().fbRef
    // fbRef ponizej to taka sama referencja jak ta tworzona przez
    // var fb = new Firebase(adres), co najwyzej odnosi sie do innego
    // 'noda' w bazie. I znow:
    // https://www.firebase.com/docs/creating-references.html
    fbRef.child('done').set(true);
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
