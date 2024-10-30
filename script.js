function startRecording()
{
   let chunks=[];
   const startbtn=document.querySelector("#record");
   const endbtn=document.querySelector("#stop");

   navigator.mediaDevices.getUserMedia({
    audio:true,
    video:true
   }).then((mediaStreamObj)=>{
    document.querySelector("#streaming").srcObject=mediaStreamObj;
    startbtn.disabled=true;
    endbtn.disabled=false;
    const mediaRec=new MediaRecorder(mediaStreamObj);
    window.mediaStream=mediaStreamObj;
    window.mediaRecorder=mediaRec;
    mediaRec.start();
    mediaRec.ondataavailable=(e)=>{
        chunks.push(e.data);
    }

    mediaRec.onstop=()=>{
        const blobfile=new Blob(chunks,{type:"audio/mpeg"});
        chunks=[];
        const url=URL.createObjectURL(blobfile);
         document.querySelector("#Recorded").src=url;    
    }
   });
}

function stopRec(end,start)
{
    window.mediaRecorder.stop();
    window.mediaStream.getTracks().forEach((track)=>{
        track.stop();
    });
    end.disabled=true;
    start.disabled=false;
}