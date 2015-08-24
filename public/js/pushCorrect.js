var pushFirst=null;

$(document).ready(function(){
	
	function agregaItems(){
		var localData = JSON.parse(localStorage.getItem('verbos'));
			
		$.each(localData.items,function (index,data){
			$("#izquierdo").append("<a id=\"boton_"+data.espanol.replace(/[\s|'('|')']/g,"")+"\" class=\"common push-down\" lang=\"mx\" rel=\""+data.ingles.replace(/[\s|'('|')']/g,"")+"\">"+data.espanol+"</a>");
	        $("#derecho").append("<a id=\"boton_"+data.ingles.replace(/[\s|'('|')']/g,"")+"\" class=\"common push-down\" lang=\"us\" rel=\""+data.espanol.replace(/[\s|'('|')']/g,"")+"\">"+data.ingles+"</a>");
	    })
	            
	    $("a[id^=boton]").click(function() {
	    	//Si no tiene la clase correcto no entra al cilco
	 		if($("#"+this.id).hasClass( "correcto" )==false){
	 			
	 			//se escucha la palabra solo en ingles
	 			if(this.lang=='us'){
	 				var msg = new SpeechSynthesisUtterance(this.text);
	 				msg.lang = 'en-US';
	 				window.speechSynthesis.speak(msg);
	 				
	 				
	 			}
	 						
	 			if($("#"+this.id).hasClass( "push-down-active" )==true){
	 				$("#"+this.id).removeClass('push-down-active');
					$("#"+this.id).addClass('push-down');	
				}else{
					$("#"+this.id).addClass('push-down-active');
					$("#"+this.id).removeClass('push-down');
				}
	 			
	 			if(pushFirst==null){
	 				pushFirst=this.id;
	 			}else{
	 				if($("#"+pushFirst)[0].rel==this.text.replace(/[\s|'('|')']/g,"")){
			 			//si ya es correcto le agregamos la clase correcto
			 			$("#"+this.id).addClass('correcto');
			 			$("#"+pushFirst).addClass('correcto');
			 			pushFirst=null;
			 		}else{
			 			$("#"+this.id).removeClass('push-down-active').addClass('push-down');;
			 			$("#"+pushFirst).removeClass('push-down-active').addClass('push-down');
			 			pushFirst=null;
			 		}
			 					
	 			}
	 		}			
					
		});
				
	}//Fin agregaItems()
			
			
			 if(typeof(Storage) !== "undefined") {
			        //if (localStorage.verbos) {
			            var verbos ;

			           
			            if(localStorage.getItem('verbos')==null){
							$.ajax({
				            	  type:     "GET",
				            	  url:      "http://15.156.24.35:8585/api/",
				            	  dataType: "jsonp",
				            	  success: function(data){
				            		  console.log(data);
				            		  verbos=data;
				            		  var dataToStore = JSON.stringify(verbos);
	 					              localStorage.setItem('verbos', dataToStore);
	 					             agregaItems();
							      }
				            	});
			            } else{
			            	agregaItems();
			            }
			            
			            
			            
	
			    } else {
			        alert("Sorry, your browser does not support web storage...");
			    }
			
			
					
 			
		
			

		});