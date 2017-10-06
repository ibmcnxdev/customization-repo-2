
	 // change status
	 
	$('#status').on('click', function(){	$('.status-menu').slideToggle('fast'); 	});
	$('.status-menu').hide();
	$('.status-menu a').on('click',function(){
		var classToApply = $(this).attr('class');
		var nameToApply = $(this).text();
		$('#status').text(nameToApply);
		$('#status').removeClass().addClass(classToApply);
		$('.status-menu').slideToggle('fast');
	});	
 

     function setComboStatus(status) {
   	  console.log("combo status:" + status);
   	  switch (status) {

         case 1:
             console.log("AVAILABLE");
			 $('#status').removeClass().addClass("green");
			 $('#status').text("Available");
             break;
         case 2:
             console.log("AWAY");
             $('#status').removeClass().addClass("yellow");
			 $('#status').text("Away");
             break;
         case 3:
             console.log("DND");
			 $('#status').removeClass().addClass("red");
			 $('#status').text("Do not Disturb");	
             break;
         case 5:
             console.log("IN_MEETING");
			 $('#status').removeClass().addClass("blue");
			 $('#status').text("In a Meeting");
             break;
         }
   	  
     }
	 
	 
	 

     
     function setSametimeStatus(status) {
   	  console.log("st status:" + status);
   	  switch (status) {
         case 0:
             console.log("st AVAILABLE");
			 $('#status').removeClass().addClass("green");
			 $('#status').text("Available");
             stproxy.status.set(1, function(){console.log('STATUS AVAILABLE SETTED');}, null, function(){console.log("unable to set status AVAILABLE");});
             break;
         case 2:
             console.log("st AWAY");
			 $('#status').removeClass().addClass("yellow");
			 $('#status').text("Away");
             stproxy.status.set(2, function(){console.log('STATUS AWAY SETTED');}, null, function(){console.log("unable to set status AWAY");});
             break;
         case 1:
             console.log("st DND");
			 $('#status').removeClass().addClass("red");
			 $('#status').text("Do not disturb");
             stproxy.status.set(3, function(){console.log('STATUS DND SETTED');}, null, function(){console.log("unable to set status DND");});
            break;
         case 3:
             console.log("st IN_MEETING");
			 $('#status').removeClass().addClass("blue");
			 $('#status').text("In a Meeting");
             stproxy.status.set(5, function(){console.log('STATUS IN_MEETING SETTED');}, null, function(){console.log("unable to set status IN_MEETING");});
             break;
         }
   	  
     }
	 

	 stproxy.addOnLoad(function() {
		   stproxy.hitch = {

          // Hook a function into an event
			   connect: function(parent,child,call){
				   try{
					   scope = (parent || window);
					   var original = parent[child];
					   for(var x in scope){
						   if(scope[x] == parent[child]){
							   scope[x] = function(){
								   original.apply(this,arguments);
								   call.apply(this,arguments);
							   }
							   break;
						   }
					   }
					   return {"parent":parent,"child":child,"original":original};
				   } catch(e){
					   console.error("Error: stproxy.hitch.connect: "+e)
					   console.dir(arguments);
				   }
			   },//END of connect

          /// Remove the connected hook into an event
			   disconnect: function(obj){
				   try{
					   if(obj && obj.parent && obj.child && obj.original){
						   obj.parent[obj.child] = function(){
							   obj.original.apply(this,arguments);
						   }
					   }
				   } catch(e){
					   console.error("Error: stproxy.hitch.disconnect: "+e)
					   console.dir(arguments);
				   }
			   }//END of disconnect

		   }  //END of hitch

		
	   });
	 
	
// Error callback
      function loginFailed(reason, error) {
         // Something has gone wrong: display some information
         alert("Error: " + reason + ": " + error);
      }

      // After logging in, we need to set up the presence behavior
      function loggedIn() {
         var liveNameModel = stproxy.getLiveNameModel();
         // When the model changes, execute this function
         console.log("logged in");
         
		 //function to implement livemodel for network contact
		 //stLiveNames.mailtoliveName();
         stproxy.hitch.connect(liveNameModel, "onUpdate", function() {
        	 setComboStatus(liveNameModel.status);
        	 console.log("stato aggiornato");
         });
         return true;
      }
      
	stproxy.addOnLoad( function(){ 
		   if (!stproxy.hitch.bind) {
             stproxy.hitch.bind = function(scope,func) {
                 return function(){
                    func.stproxyApply(scope,arguments);
		            console.log("hitch - scope " + scope + "hitch arguments " +arguments );
                 }
             }
          }
stproxy.login.loginByToken( null , null, null, loggedIn, loginFailed);

//setComboStatus(stproxy.getLiveNameModel().status);

});

/*
var stLiveNames =  {
	mails : [] ,
	addliveName : function (mail) {
		var stlivename = stproxy.getLiveNameModel(mail);
		stproxy.hitch.connect(stLiveNames[mail] = stlivename , "onUpdate", stproxy.hitch.bind( this, function() {
			stLiveNames.changeLiveNameStatus(mail,stlivename.status);
		}));	
	},	
	mailtoliveName :  function () {
		this.fetchMail();
		$(this.mails).each(function( index , mail ) {
		stLiveNames.addliveName(mail);	
	})},
	fetchMail : function() {
		this.mails = new Array();
		$('.users').each(function(){
			var mail = $(this).data('userattribute');
			stLiveNames.mails.push(mail);
		});	
	},
	changeLiveNameStatus: function(mail,status) {
		switch(status) {
		case 0:
			$("span[data-userattribute='"+mail+"'] #stlink").remove();
			break;
		case 1:
			$("span[data-userattribute='"+mail+"'] #stlink").remove();
			$("span[data-userattribute='"+mail+"']").append("<a id=\"stlink\" href=\"#\" onClick=\"javascript:stproxy.openChat('"+mail+"');\"><i class=\"fa fa-circle status-green\"></i></a>");
			break;                 
		case 2:				 
			$("span[data-userattribute='"+mail+"'] #stlink").remove();
			$("span[data-userattribute='"+mail+"']").append("<a id=\"stlink\" href=\"#\" onClick=\"javascript:stproxy.openChat('"+mail+"');\"><i class=\"fa fa-circle status-yellow\"></i></a>");
			break;                 
		case 3:				 
			$("span[data-userattribute='"+mail+"'] #stlink").remove();
			//$("span[data-userattribute='"+mail+"']").append("<a id=\"stlink\" href=\"#\"><i class=\"fa fa-circle status-red\"></i></a>");
			break;                 
		case 5:				 
			$("span[data-userattribute='"+mail+"'] #stlink").remove();
			$("span[data-userattribute='"+mail+"']").append("<a id=\"stlink\" href=\"#\" onClick=\"javascript:stproxy.openChat('"+mail+"');\"><i class=\"fa fa-circle status-blue\"></i></a>");
			break;
		}
	}
};

*/


