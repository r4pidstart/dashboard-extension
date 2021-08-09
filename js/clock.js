const clockText=document.querySelector("#clock");

function updateClock()
{
    const date=new Date();
    const hours=String(date.getHours()).padStart(2,"0")
    const minutes=String(date.getMinutes()).padStart(2,"0")
    clockText.innerText=`${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);