// 01-jsonIntro
var sArray = new Array();
var fArray = new Array();
var newRec;

class Student {
	constructor (name, number, program, coop, list){
		this.name=name; this.number=number;
		this.program=program;
		this.coop = coop; this.list=list;
	}
} // end of class Student

class Faculty {
	constructor (name, number, school, fullTime, list){
		this.name=name; this.number=number;
		this.school=school;
		this.fullTime = fullTime; this.list=list;
	}
} // end of class Faculty

$(document).ready(function() {
	console.log("in doc ready");
  $.getJSON("dataFiles/schoolData.json", function(data) {
		//loaded student array
		for(let stud of data.students.studentRec){
			newRec = new Student(
				stud.name, stud["student-number"],
				stud.program, stud.coop, stud.email
				// stud["name"]
			);
			sArray.push(newRec);
		}
		console.log(sArray);
		//let start = data.faculty.facultyRecs -> we can use this way as well
		for (let fac of data.faculty.facultyRecs){
			newRec = new Faculty(
				fac.name, fac["faculty-number"],
				fac.school, fac["full-time"], fac.email
			);
				fArray.push(newRec);
		}
		console.log(fArray);

		//both arrays are populated
		//display initial view - students as default

		loadData(sArray, true);
	});// end of .getJSON

	$("#students").click(function() { loadData(sArray,true);});

	$("#faculty").click(function() {loadData(fArray, false);});

});// end of doc ready

function headInfo(title, student){

	$("h4:first").html(title);

	if(student) {
		$(".labels").html(
			`
			<th>NAME</th>
			<th>ID</th>
			<th>PROGRAM</th>
			<th>COP</th>
			<th>EMAIL</th>
			`
		);
	}
	else {
		$(".labels").html(
			`
			<th>NAME</th>
			<th>ID</th>
			<th>SCHOOL</th>
			<th>FULL TIME</th>
			<th>EMAIL</th>
			`
		);
	}
};
function loadData(arrList, student) {
	//header column
	headInfo(student ? "Student Data" : "Faculty Info", student);

	//tbody
	$("#sdata").html(""); //clear the sdata

	for (let x of arrList) {
		$("#sdata").append(
			`
				<tr>
					<td>${x.name}</td>
					<td>${x.number}</td>
					<td>${student ? x.program : x.school}</td>
					<td>${student ? (x.coop ? 'YES'  : 'NO') : (x.fullTime ? 'YES' : 'NO')}</td>
					<td>${outputEmail(x.list)}</td>
				</tr>
			`
		)
	}
}//end of load Data

function outputEmail(email) {
	let emailList = "";
	for (let em of email) {
		emailList += `${em}<br>`;
	}
	return emailList;
}




/*
    $.ajax({
        type: "POST",
        url: "dataFiles/schoolData.json",
        dataType: "json",
        success: loadJSON,
				error: function (request,error) {
            alert('Network error has occurred: ' + error);}
    });

		function loadJSON(data) {
			// data holds entire JSON file passed from AJAX call
		}
*/