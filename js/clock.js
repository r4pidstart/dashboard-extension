const clockText=document.querySelector("#clock");
let date=new Date();

setInterval(function()
{
    const hours=String(date.getHours()).padStart(2,"0")
    const minutes=String(date.getMinutes()).padStart(2,"0")
    clockText.innerText=`${hours}:${minutes}`;
}, 1000);