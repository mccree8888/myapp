

var socket = io.connect();

socket.on('news', function (data) {
	 console.log(data);
	 socket.emit('my other event', { my: 'data' });
 });

function button1_click() {
	alert("버튼1을 누르셨습니다.");
}


var mainList = new Array() ;
var mainJson = new Array();
function addMainList() {
	var data = new Object() ;
	data.id = 0;
	data.name = "1";
	data.price = "2";
	mainList.push(data);
	//var jsonData = JSON.stringify(mainList) ;
	setTable(mainList);
}

function loadAlarmFile(){
	console.log(document.getElementById("getfile").innerHTML);

}

function pp(str){
	console.log(str);
}

function setTable(data) {
  var obj, dbParam, xmlhttp, myObj, x, txt = "";
 // dbParam = JSON.stringify(obj);
 // myObj = JSON.parse(this.responseText);
  txt += "<table class='table table-striped' >"
	txt += "<thead><tr><th>ID</th><th>NAME</th><th>PRICE</th></tr></thead>";
  for (x in data) {
    txt += "<tr><td>" + data[x].id + "</td><td>" + data[x].name + "</td><td>" + data[x].price + "</td></tr>";
  }
  txt += "</table>"
  	document.getElementById("mainDiv").innerHTML = txt;
}

function setJson(data) {
  var obj, dbParam, xmlhttp, myObj, x, txt = "";
 // dbParam = JSON.stringify(obj);
 // myObj = JSON.parse(this.responseText);
  txt += "<table class='table table-striped' >"
	txt += "<thead><tr><th>DATE</th><th>TIME</th><th>CODE</th><th class='modalTableThCodeText'>codeText</th><th>사유</th><th>조치</th></tr></thead>";
  for (x in data) {
    txt += "<tr><td>" + data[x].date + "</td><td>" + data[x].meta[0].time + "</td><td>" + data[x].meta[0].code + "</td><td class='modalTableThCodeText'>"
		  + data[x].meta[0].contents
			+ "</td><td>" + "<input type='text' class='form-control'>"
			+ "</td><td>" + "<input type='text' class='form-control'>"
		  "</td></tr>";
  }
  txt += "</table>"
  	document.getElementById("modalBody").innerHTML = txt;
}

function changeBody(path){
	$("#mainDiv").load(path);
}

function readFile2(divid){
    var target = document.getElementById(divid);

    var file = target.files[0];
        if (!file) {
            return;
    }
		var flg = checkFile(file.name);

		if(flg == false)
		{
			return alert("알람파일을 불러주세요");
		}

    var reader = new FileReader();
    reader.onload = function(e) {
        fileData = e.target.result;
				catFile2(fileData,flg,divid);
			//	catFile(fileData);
    };

    reader.readAsText(file);
}


function alarmCode(divid){
    var target = document.getElementById(divid);

    var file = target.files[0];
        if (!file) {
            return;
    }
		var flg = checkFile(file.name);



    var reader = new FileReader();
    reader.onload = function(e) {
        fileData = e.target.result;
				alarmCodeCat(fileData,flg,divid);
			//	catFile(fileData);
    };

    reader.readAsText(file);
}

function checkFile(fname){
	fname = fname.replace(/ /g,"");
	var ftype = fname.substring((fname.indexOf("[")+1),fname.indexOf("]"));

	if(ftype != "ALARM")
		return false;
	var fdate = fname.substr(0,8);

	return fdate;
}

function catFile(data) {
  var obj, dbParam, xmlhttp, myObj, x, txt = "";
 // dbParam = JSON.stringify(obj);
 // myObj = JSON.parse(this.responseText)
	//txt += data.replace(/\[/gi, "<br>[");
	txt += data.replace(/\n/g, "<br>");
  	document.getElementById("readFile").innerHTML = txt;
}

function sendJson(jdata,path) {
	var jsonstr = JSON.stringify(jdata);

	$.ajax({
		url : "/api/insertAlarm",
		type: "POST",
		data: jsonstr,
		contentType: 'application/json',
		success : function(data, status, xhr) {
			console.log(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR.responseText); }
		});
}


function alarmCodeCat(data,fdate,machineN) {
  var obj, dbParam, xmlhttp, myObj, x, txt = "";
	var txt2 = "";
	mainJson = [];

	var strArr = data.split("\n");
	for(var i in strArr) {

		var data = new Object() ;
		var meta = new Array() ;
		var metaData = new Object() ;
		data.msg = strArr[i];

		var strArr2 = strArr[i].split(",");
		if(strArr2.length < 2)
			continue;

		for(var j in strArr2){
			if(j == 5 && strArr2[0] != ""){
				txt2 += "default.bmp" + ",";
			}else{
				txt2 += strArr2[j] + ",";
			}
		}
		txt2 = txt2.substring(0,txt2.length-1);
		txt2 +=  "<br>";
	}
//	txt += data.replace(/\n/g, "<br>");
  	document.getElementById("readFile").innerHTML = document.getElementById("readFile").innerHTML + txt2;
		//setJson(mainJson);
		//console.log(mainJson);
		//sendJson(mainJson,"sd");
}

function catFile2(data,fdate,machineN) {
  var obj, dbParam, xmlhttp, myObj, x, txt = "";
	var txt2 = "";
	mainJson = [];

	var strArr = data.split("\n");
	for(var i in strArr) {

		var data = new Object() ;
		var meta = new Array() ;
		var metaData = new Object() ;
		data.msg = strArr[i];

		var strArr2 = strArr[i].split("\] ");
		if(strArr2.length < 2)
			continue;

		var timeEv = strArr2[0].slice(1,19);
		timeEv = timeEv.replace(/ /g,"");
		var code = strArr2[1].substring(6,strArr2[1].length);
		var strText = "";
		for(var j = 2 ; j < strArr2.length ;j++){
			strText += strArr2[j];
		}
		//var str = strArr[i].slice(1,strArr[i].indexOf('\]'));
		data.date = fdate;
		data.type = "alarm";
		data.machine = String(machineN);
		metaData.time = timeEv;
		metaData.code = code;
		metaData.contents = strText;
		metaData.cause = "";
		metaData.execute = "";
		metaData.type = "";
		meta.push(metaData);
		data.meta = meta;

		mainJson.push(data);



    txt += fdate + " " + timeEv + " " + code +  " " + strText + "<br>";
		txt2 += fdate + "," + timeEv + "," + code +  "," + strText + "<br>";
	}
//	txt += data.replace(/\n/g, "<br>");
  	document.getElementById("readFile").innerHTML = document.getElementById("readFile").innerHTML + txt2;
		//setJson(mainJson);
		//console.log(mainJson);
		//sendJson(mainJson,"sd");
}

function setmodalmachineAdd()
{
	var txt ="";
	txt += "<div class='form-group'>";
	txt += " <label for='exampleInputName'>Name</label>";
	txt += "<input type='text' class='form-control' id='exampleInputName'></div>";
	txt += " <label for='exampleInputPos'>POSITION</label>";
	txt += "<input type='text' class='form-control' id='exampleInputPos'></div>";
	modalSaveFlg = 2;
	document.getElementById("modalBody").innerHTML = txt;
}


var modalSaveFlg = 0;
function modalSave(){

	switch (modalSaveFlg) {
		case 1:

		break;
		case 2:
		var sendData =  new Array();
		var data = new Object() ;

		data.name = document.getElementById("exampleInputName").value;
		data.position = document.getElementById("exampleInputPos").value;

		mainJson.push(data);
		var jsonstr = JSON.stringify(mainJson);
		$.ajax({
			url : "/api/machineinsert",
			type: "POST",
			data: jsonstr,
			contentType: 'application/json',
			success : function(data, status, xhr) {
				console.log(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText); }
			});

		break;
	}
}


function downloadInnerHtml(elementid, htmllinereplace, filename, mimeType, extension) {
  var elHtml = $(elementid).html();
		console.log(elHtml);
  if (htmllinereplace) elHtml = elHtml.replace(/\<br\>/gi,'/\n');
	console.log(htmllinereplace);
  var link = document.createElement('a');
  link.setAttribute('download', filename + extension);
	console.log(filename + extension);
  link.setAttribute('href', 'data:' + mimeType  +  ';charset=cp949,' + encodeURIComponent(elHtml));
	console.log(mimeType);
  link.click();
}
