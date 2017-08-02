window.onload= function(){
  var session = localStorage.getItem("session");
  if(session===null){
    location.href = '../index.html';
    }
  };


function Logout(){
  localStorage.clear();
}
