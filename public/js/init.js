(function($){
  $(function(){

	  $("#header").append(""+
	  "<header>"+
		"<nav class=\"red\" role=\"navigation\">"+
		 "   <div class=\"nav-wrapper container\">"+
		  "    <a id=\"logo-container\" href=\"#\" class=\"brand-logo\">Logo</a>"+
			"		      <ul class=\"right hide-on-med-and-down\">"+
			"		        <li><a href=\"pushCorrect.html\">Navbar Link</a></li>"+
			"		        <li><a href=\"notKnow.html\">Navbar Link2</a></li>"+
			"		        <li><a href=\"unknownWords.html\">Navbar Link3</a></li>"+
			"		      </ul>"+
			"		      <ul id=\"nav-mobile\" class=\"side-nav\" style=\"left: -250px;\">"+
			"		        <li><a href=\"pushCorrect.html\">Navbar Link</a></li>"+
			"		        <li><a href=\"notKnow.html\">Navbar Link2</a></li>"+
			"		        <li><a href=\"unknownWords.html\">Navbar Link3</a></li>"+
			"		      </ul>"+
			"		      <a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>"+
			"	</div>"+
		  "</nav>"+
		"</header>");
	  
	  
    $('.button-collapse').sideNav();
	

  }); // end of document ready
})(jQuery); // end of jQuery name space


