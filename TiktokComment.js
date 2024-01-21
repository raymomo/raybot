function sendComment(device, text) {

		
	var isLive = device.sendAai({actions:[
		"waitQuery(R:.n2p,5000)", 
		 "getText"
	]});
	
	if(isLive){
		print("tiktok Live")
		device.move(tcConst.movement.pageDown);
	
	}
	
    var retval = device.sendAai({actions:[
			"waitQuery(C:.ImageView&&R:.boq&&CC:0,20000)", 
			"click(C:.ImageView&&R:.boq&&CC:0)",
			"click(+R:.boe)",
			"newQuery(R:.boe)",
			`setText('${text}')`, 
			"click(+R:.bq4)"
		]});
    if (retval == null) {
        print("Error: " + lastError());
        return false;
    }
    print(retval);
    return true;
}


function everydeviceRunApp(deviceobj){

	var runAppName = "com.ss.android.ugc.trill"
	var runapp = deviceobj.runApp(runAppName);
	
	if (runapp == 0) {
		print("Succeed to run");
		delay(5000);
		var comment = sendComment(deviceobj, "Hello, how are you?")
		print("End....");
 
	} else {
		print(lastError());
	}
	
}

var devices = Device.searchObject(tcConst.DevAll);
if(devices != null) {
	for(var t = 0; t < devices.length; t++) {
		var deviceobj = devices[t];
		var tcThread= new TCThread(deviceobj.name, everydeviceRunApp);
		tcThread.start(deviceobj);
		delay(200);
	}
}  else {
	log.error("No Device Selected.")
}