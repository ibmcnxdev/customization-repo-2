if(typeof(dojo) != "undefined") {

dojo.place("<link rel=\"stylesheet\" type=\"text/css\" href=\"/files/customizer/SametimeModule/css/style.css\" /> <a id=\"status\" class=\"gray\" href=\"#\">Offline</a> <ul class=\"status-menu\">         <li><a onclick=\"setSametimeStatus(0);\" class=\"green\" href=\"#\">Available</a></li>         <li><a onclick=\"setSametimeStatus(2);\" class=\"yellow\" href=\"#\">Away</a></li>         <li><a onclick=\"setSametimeStatus(3);\" class=\"blue\" href=\"#\">In a Meeting</a></li>         <li><a onclick=\"setSametimeStatus(1);\" class=\"red\" href=\"#\">Do not disturb</a></li> </ul> <a href=\"#\" onclick=\"window.open('https://webchat.ce.collabserv.com:443/stwebclient/popup.jsp');return false;\"> open chat<i class=\"fa fa-comment\"></i></a>   <script src=\"https://code.jquery.com/jquery-2.0.2.min.js\" integrity=\"sha256-TZWGoHXwgqBP1AF4SZxHIBKzUdtMGk0hCQegiR99itk=\" crossorigin=\"anonymous\" ></script>  <script>   var stproxyConfig = {  server: \"https://webchat.ce.collabserv.com:443\",          tunnelURI: \"https://apps.ce.collabserv.com/files/customizer/SametimeModule/html/tunnel.html?repoName=customization-repo-2\",          isConnectClient: false       };        djConfig = {         parseOnLoad: true,         locale: \"en\",         isDebug: false       }; </script>  <script src=\"https://webchat.ce.collabserv.com:443/stwebclient/latest/include.js\"></script> <script src=\"/files/customizer/SametimeModule/js/stproxy_nodojo.js?repoName=customization-repo-2\"></script>",dojo.doc.head,"last");

}