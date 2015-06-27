
var __mailscrap_uid = "";
var _timer = "";

function openOption(){

	window.open('chrome://mailscrap/content/option.xul', 'mail_optionWindow', 'chrome,toolbar,titlebar');

}

function scrapPage(__contexUrl){
	
	__mailscrap_uid = nsPreferences.getLocalizedUnicharPref('mailscrap.uid');
		
		
	if(__mailscrap_uid == null || __mailscrap_uid == ""){
	
		openOption();
	
	}else{
		
		if(__contexUrl=="" || !__contexUrl){
		
			__mailscrapSendData();
			
		}else{
		
			__mailscrapSendData(__contexUrl);
			
		}
	
	}
}


function __mailscrapSendData(__contexUrl){

	_mytag = prompt("Enter Tags", "");

	if(_mytag != null){
	
		//var __sendURI = 'http://mailscrap.com/send_mail.php'
		var __sendURI = 'http://xxxx.xx/send_mail.php'
		var pars = 'uid=' + __mailscrap_uid;
		pars += '&tag=' + _mytag;
		
		if(__contexUrl==""){
			dump(__contexUrl+"0");
			pars += '&q=' + getWebNavigation().currentURI.spec;
		
		}else{
		dump(__contexUrl+"1");
			pars += '&q=' + __contexUrl;

		}
		
		__requestURI = __sendURI + "?" + pars;
		dump(__requestURI+"2");

		var __statusText = document.getElementById("mailscrap-panel-text");

		//document.getElementById("mailscrap-panel-progress").style.display = "";
		document.getElementById("mailscrap-panel-textarea").style.display = "";
		
		var request = new XMLHttpRequest();
		request.open("GET", __requestURI, true);
		request.onreadystatechange = function() {
		
			if (request.readyState == 4 && request.status == 200) {
			
				var resTxt = request.responseText;
				__statusText.value = "MailScrap Success.";
				document.getElementById("mailscrap-button").style.backgroundColor="yellow";
				
				_timer = setInterval(_afterSend,2000);
				//document.getElementById("mailscrap-panel-progress").style.display = "none";
				//document.getElementById("mailscrap-panel-textarea").style.display = "none";
		
			}else if(request.readyState < 4){
			
				__statusText.value = 'MailScrap Now Sending..';
				document.getElementById("mailscrap-button").style.backgroundColor="white";
				
			}else{
			
				__statusText.value = 'Error'
				document.getElementById("mailscrap-button").style.backgroundColor="red";
				_timer = setInterval(_afterSend,5000);
			}
		
		}
		request.send(null);
		
	}
	
}

function _afterSend(){

	document.getElementById("mailscrap-panel-textarea").style.display = "none";
	document.getElementById("mailscrap-button").style.backgroundColor="";
	clearInterval(_timer);
	
}

function clickScrapContext(){  //context


	if (gContextMenu && gContextMenu.getLinkURL){
	
		scrapPage(gContextMenu.getLinkURL());
		//return(gContextMenu.getLinkURL());
		
	}else if (gContextMenu && gContextMenu.linkURL){

		scrapPage(gContextMenu.linkURL());
		//return(gContextMenu.linkURL());
		
	}

//return(false);

}


function clickScrapContextSelect(){  //context
	dump("test"+gContextMenu.searchSelected());
	alert("+"+gContextMenu.searchSelected());
	//scrapPage(gContextMenu.searchSelected());
	
}


function __mailscrapMenuContextMenu(){

	if(gContextMenu){
         
         gContextMenu.showItem("mailscrap-context-click",  gContextMenu.onLink && !gContextMenu.onMailtoLink);
         //gContextMenu.showItem("mailscrap-context-select",  gContextMenu.isTextSelected); 選択テキスト

	}
	
}

function __mailscrapInit(){

	document.getElementById("mailscrap-context-click").hidden = true;
	//document.getElementById("mailscrap-context-select").hidden = true; 選択テキスト

	__mailscrapMenu = document.getElementById("contentAreaContextMenu");

	if(__mailscrapMenu){
		__mailscrapMenu.addEventListener("popupshowing", __mailscrapMenuContextMenu, false);
	}
	
}

function __mailscrapUnInit(){
     
     __mailscrapMenu.unregister();
     
}
var __mailscrapMenu;
window.addEventListener("load", __mailscrapInit, false);
window.addEventListener("unload", __mailscrapUnInit, false);


