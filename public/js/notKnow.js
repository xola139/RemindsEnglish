$(function(){
	
	
	
	if(localStorage.getItem('desconocidos')!=null){
		var arraylength = [] ;
		var elementos="";
		arraylength = JSON.parse(localStorage.getItem('desconocidos'));
		$.each(arraylength,function(i,v){
			elementos=elementos +"<a href=\"#!\" class=\"collection-item\">"+v.ingles +" - "+v.espanol +"<input  id=\"verb_"+v.ingles+"\" placeholder=\""+v.ingles+"\" type=\"text\" ></a>"+
			" ";
		});
		
		$("#arecodar").append(elementos);
		
		
	}
	
	
	$("#btnAgregar").on("click",function(){
		var valor=$("#verb");
		var arrayDesconocido = JSON.parse(localStorage.getItem('desconocidos'));
        arrayDesconocido.push({ingles:valor.val(),espanol:""});
        dataDesconocidos = JSON.stringify(arrayDesconocido);
        localStorage.setItem('desconocidos', dataDesconocidos);
	})
	
	
	
	  
	
	
});