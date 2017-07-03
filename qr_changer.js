function impossibruChk(){                //deals with people entering firmware values they don't see on their system settings :/

	var sys_i=document.getElementById("0").selectedIndex;
	var maj_i=document.getElementById("1").selectedIndex;
	
	if(sys_i==1){     //new 3ds is very specific
		forceOption("1",5);
		disableOption("2",2);
		forceOption("4",13);
		return;
	}
	//alert(maj_i);  //old 3ds checks. case 0 is firm 4, 5 is firm 9
    switch(maj_i){
		case 0: disableOption("2",-1);disableOption("4",3);  break;  
		case 1: disableOption("2",1); disableOption("4",-1); break;
		case 2: disableOption("2",3); disableOption("4",-1); break;
		case 3: disableOption("2",2); disableOption("4",-1); break;
		case 4: disableOption("2",1); disableOption("4",-1); break;
		case 5: disableOption("2",2); disableOption("4",-1); 
				disableOption("1",-1);						 break;
		default:
	}
}

function impossibruChk2(){                //deals with people entering firmware values they don't see on their system settings :/
	var maj_i=document.getElementById("11").selectedIndex;
	//var min_i=document.getElementById("12").selectedIndex;
	if(maj_i==1){
		disableOption("12",1);
	}
	else{
		disableOption("12",-1);
	}
}

function disableOption(id,index){       //enables all options up to the index and disables the options after. -1 index enables all
    var obj=document.getElementById(id);
	var len=obj.length
	
	if(index<0)index=len; //enable all
	
	for(var i=0;i<len;i++){
		if(i<=index){
			obj.options[i].disabled=false;
		}
		else{
			obj.options[i].disabled=true;
		}
	}
	if(obj.selectedIndex > index)obj.selectedIndex=index;
}

function forceOption(id,index){        //disables all options except index and sets selectedIndex to index
    var obj=document.getElementById(id);
	var len=obj.length
	
	for(var i=0;i<len;i++){
		if(i!=index){
			obj.options[i].disabled=true;
		}
		else{
			obj.options[i].disabled=false;
		}
	}
	obj.selectedIndex=index;
}

function getRegion_1(v)   //different ways of naming regions for each version
{
	if(v[5] < 2)
		return "WEST";
	else
		return "JPN";
}
function getRegion_2(v)
{
    if(v[5]==0)
		 return "E";
	if(v[5]==1)
		return "U";
	if(v[5]==2)
		return "J";
}


function getFirmVersion(v)  //common to both versions
{
	v[1]+=4;
	
    if(v[0]==1)
    {
        return "N3DS";
    }else{
        if(v[1]<5)
        {
            return "PRE5";
        }else{
            return "POST5";
        }
    }
}


function getSpiderVersion(v)  //spider is version 1 module only
{
	v[4]+=7;
	
	
    if (v[4]<=10)
    {
        return "2050";
    }
	else if (v[4]<16 && v[4]>10)
    {
        return "3074";
    }
	else if (v[4]>15)
	{
		return "4096";
	}
	else
	{
		return "unsupported";
	}
}


function getRoVersion(v)   //version 1 only. determined by first and second number in firmware
{
    if(v[1] == 4)
    {
        return "1024";
    }
    else if(v[1]==5 || v[1]==6)
    {
        return "2049";
    }
	 else if(v[1]==7 && v[2]<2)
    {
        return "2049";
    }
	else if(v[1]==7 && v[2]==2)
	{
		return "3074";
	}
	else 
	{
		return "4096";
	}
}


function getMenuVersion(v)  //version 2 only (home menu)
{
    //Firm 10x
	if(v[1]==10){
	     if(v[5]==1){
		    if (v[2]==0)return "20480_usa";
			if (v[2]==1)return "21504_usa";
		 }
	     else {
		    if (v[2]==0)return "19456";
			if (v[2]==1)return "20480";
		 }
	}
	
	//Firm 9x
    if (v[2]==0 || v[2]==1)
    {
        return "11272";
    }
    else if (v[2]==2)
    {
        return "12288";
    }
    else if (v[2]==3)
    {
        return "13330";
    }
	 else if (v[2]==4)
    {
        return "14336";
    }
    else if (v[2]==5)
    {
        return "15360";
    }
    else if (v[2]==6)
    {
        return "16404";
    }
    else if (v[2]==7)
    {
        return "17415";
    }
    else if (v[2]==9 && v[5]==1)
    {
        return "20480_usa";  
    }
    else if (v[2]>=8)
    {
        return "19456";
    }
}


function getMsetVersion(v)   //version 2 only (system settings)
{   
	//Firm 10x
    if(v[1]==10)return "9221";
	
	//Firm 9x
    if(v[2] < 6)
    {
        return "8203";
    }
    else
    {
        return "9221";
    }
}


function getFilename_1()
{   
	var v=[];
	v[0]=document.getElementById("0").selectedIndex;
	v[1]=document.getElementById("1").selectedIndex;
	v[2]=document.getElementById("2").selectedIndex;
	v[4]=document.getElementById("4").selectedIndex;
	v[5]=document.getElementById("5").selectedIndex;
	
	var ret="q/"+getFirmVersion(v)+"_"+getRegion_1(v)+"_"+getSpiderVersion(v)+"_"+getRoVersion(v)+".png";
    //alert(ret+" "+v);
    return ret;
}
function getFilename_2()
{
    var v=[];
	v[0]=document.getElementById("10").selectedIndex;
	v[1]=document.getElementById("11").selectedIndex;
	if(v[1]==0)v[1]=5;
	else v[1]=6;
	v[2]=document.getElementById("12").selectedIndex;
	v[5]=document.getElementById("15").selectedIndex;
	
	var ret="rMVPFSoVNs/q/"+getFirmVersion(v)+"_"+getRegion_2(v)+"_"+getMenuVersion(v)+"_"+getMsetVersion(v)+".png";
	//alert(ret+" "+v);
    return ret;
}


function updateQrCode_1()
{
    var filepath=getFilename_1();

    document.getElementById("qr_code_out_1").src = filepath;
	setTimeout(   //error check
				function(){
					if(document.getElementById("qr_code_out_1").height < 200)           //qr's height should be 471
					document.getElementById("qr_code_out_1").src = "images/error.png";
				}																	    , 250);
}
function updateQrCode_2()
{
    document.getElementById("qr_code_out_2").src = getFilename_2();
}