import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Component from './Component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileWink } from '@fortawesome/free-solid-svg-icons';
import { click } from '@testing-library/user-event/dist/click';



  let i=0;
  function App() {
    
    
    const [current,New]=useState("");

    useEffect(()=>{
      if(current==="Infinity" || current.includes("Not") || current.includes("NaN")){
        New("Not Allowed! Click C");
      }
      if(current.length<15){
        document.getElementsByClassName("output")[0].style.fontSize="8vh";
      }
      else if(current.length>=15 && current.length<=19 ){
        document.getElementsByClassName("output")[0].style.fontSize="5vh";
      }
      else if(current.length>19  && current.length<=22){
        document.getElementsByClassName("output")[0].style.height="20vh";
        document.getElementsByClassName("output")[0].style.fontSize="5vh";
      }
      else{
          New(current.slice(1,23  ))
      }
    })

    const Seperate=(current,sign)=>{
      let p1= Number(current.slice(0,current.indexOf(sign)));
      let p2=Number(current.slice(current.indexOf(sign)+1,current.charAt(current.length-1)+1));
      return {p1,p2};
    }
  const CombineAndReturn=(current)=>{
    if(current.includes("x")){
      let obj=Seperate(current,"x");
      return(String(obj.p1*obj.p2))
    }
    else if(current.includes("+")){
      let obj=Seperate(current,"+");
      return(String(obj.p1+obj.p2))
    }
    else if(current.includes("-")){
      if(current[0]=="-"){
        let obj=Seperate((current.slice(1)).replace("-","+"),"+");
        return(String("-"+String(obj.p1+obj.p2)))
      }else{
        let obj=Seperate(current,"-");
        return(String(obj.p1-obj.p2))
      }
    }
    else if(current.includes("/")){
        console.log("Inside 2");
        let obj=Seperate(current,"/");
        return(String(obj.p1/obj.p2))
    }
    else if(current.includes("%")){
      let obj=Seperate(current,"%");
      return(String(obj.p1%obj.p2))
    }
  }
  const checkSignMain=(current,sign,spc)=>{
    if(current.includes("x")){
      console.log("adugas8dg");
      New(CombineAndReturn(current).concat(sign))
    }
    else if(current.includes("+")){
      console.log("Add");
      New(CombineAndReturn(current).concat(sign))
    }
    else if(current.includes("-")){
      if(current[0]==="-"){
        console.log(current.slice(1));
        if(sign=="/"){
          checkSignMain(current.slice(1),"/",true)
        }
        else if(sign=="+"){
          checkSignMain(current.slice(1),"+",true)
        }
        else if(sign=="-"){
          checkSignMain(current.slice(1),"-",true)
        }
        else if(sign=="x"){
          checkSignMain(current.slice(1),"x",true)
        }
        else if(sign=="%"){
          checkSignMain(current.slice(1),"%",true)
        }
      }
      else{
          New("-"+CombineAndReturn(current.slice(1)))
      }

      // New(CombineAndReturn(current).concat(sign))
    }
    else if(current.includes("/")){
      if(spc==true){
        console.log("sauiodyasnidya");
        New("-"+CombineAndReturn(current).concat(sign))
      }
      else{
        console.log("sauiodyasnidyasasdasdada");
        New(CombineAndReturn(current).concat(sign))
      }
    }
    else if(current.includes("%")){
      New(CombineAndReturn(current).concat(sign))
    }
    else{
      if(spc==true){
        New("-"+current.concat(sign));
      }else{
        New(current.concat(sign));
      }
    }
  }
  const checkSignMain2=(current,sign,spc)=>{
    if(current.includes("x")){
      New(CombineAndReturn(current))
    }
    else if(current.includes("+")){
      console.log("Add");
      New(CombineAndReturn(current))
    }
    else if(current.includes("-")){
      if(current[0]==="-"){
        console.log(current.slice(1));
        if(sign=="/"){
          checkSignMain2(current.slice(1),"/",true)
        }
        else if(sign=="+"){
          checkSignMain2(current.slice(1),"+",true)
        }
        else if(sign=="-"){
          checkSignMain2(current.slice(1),"-",true)
        }
        else if(sign=="x"){
          checkSignMain2(current.slice(1),"x",true)
        }
        else if(sign=="%"){
          checkSignMain2(current.slice(1),"%",true)
        }
      }
      else{
          New("-"+CombineAndReturn(current.slice(1)))
      }

    }
    else if(current.includes("/")){
      if(spc==true){
        console.log("sauiodyasnidya");
        New("-"+CombineAndReturn(current))
      }
      else{
        console.log("sauiodyasnidyasasdasdada");
        New(CombineAndReturn(current))
      }
    }
    else if(current.includes("%")){
      New(CombineAndReturn(current))
    }
    else{
      New(current.concat(sign));
    }
  }
  const returnSign=(current)=>{
    if(current.includes("x")){
      return "x";
    }
    else if(current.includes("+")){
      return "+";
    }
    else if(current.includes("-")){
      return "-";
    }
    else if(current.includes("/")){
      return "/";
    }
  }
  const checkInvalid=(current,sign, isequal)=>{
    if(isequal===true){
      let pos=current.charAt(current.length-1)
      if(pos=="x" || pos=="+" || pos=="-" || pos=="/" || pos=="%"){
        console.log("Logged");
        New(current)
      }
      else{
        checkSignMain2(current,sign,false);
      } 
      
    }else{
      let pos=current.charAt(current.length-1)
      if(pos=="x" || pos=="+" || pos=="-" || pos=="/" || pos=="%"){
        console.log("Logged");
        New(current)
      }
      else{
        checkSignMain(current,sign);
      } 
      
    }
  }
  
  const checkOperators=(current)=>{
    let a=current;
    if(a.includes("x") || a.includes("+") || a.includes("-") || a.includes("/") || a.includes("+") || a.includes("%")){
      return true;
    }
    else if(current.charAt(current.length-1)=="."){
      return true;
    }
    return false;   
  }
  const removeLast=()=>{
    console.log("removed ",current);
    New(current.slice(0,current.length-1));
  }
  
  const Clicked0=()=>{
    if(current=="0"){
      New("0")
    }
    else{
      New(current.concat("0"))
    }
  }
  const Clicked1=()=>{
    if(current=="0"){
      New("1")
    }
    else{
      New(current.concat("1"))
    }
  }
  const Clicked2=()=>{
    if(current=="0"){
      New("2")
    }
    else{
      New(current.concat("2"))
    }
  }
  const Clicked3=()=>{
    if(current=="0"){
      New("3")
    }
    
    else{
      New(current.concat("3"))
    }
  }
  const Clicked4=()=>{
    if(current=="0"){
      New("4")
    }
    
    else{
      New(current.concat("4"))
    }
  }
  const Clicked5=()=>{
    if(current=="0"){
      New("5")
    }
    
    else{
      New(current.concat("5"))
    }
  }
  const Clicked6=()=>{
    if(current=="0"){
      New("6")
    }
    
    else{
      New(current.concat("6"))
    }
  }
  const Clicked7=()=>{
    if(current=="0"){
      New("7")
    }
    
    else{
      New(current.concat("7"))
    }
  }
  const Clicked8=()=>{
    if(current=="0"){
      New("8")
    }
    
    else{
      New(current.concat("8"))
    }
    
  }
  const Clicked9=()=>{
    if(current=="0"){
      New("9")
    }
    else{
      New(current.concat("9"))
    }
    
  }
  // const listen=()=>{
  //   document.addEventListener("keypress",(event)=>{
  //     console.log(event.key);
  //     if(event.key.toLowerCase()=="0"){
  //       Clicked0();
  //         console.log(event.key);
  //         let i=0;
  //       }
  //       else if(event.key=="1"){
  //         Clicked1();
  //         let i=0;
  //       }
  //       else if(event.key=="2"){
  //         Clicked2();
  //         let i=0;
  //       }
  //       else if(event.key=="3"){
  //         Clicked3();
  //         let i=0;
  //       }
  //       else if(event.key=="4"){
  //         Clicked4();
  //         let i=0;
  //       }
  //       else if(event.key=="5"){
  //         Clicked5();
  //         let i=0;
  //       }
  //       else if(event.key=="6"){
  //         Clicked6();
  //         let i=0;
  //       }
  //       else if(event.key=="7"){
  //         document.querySelector(".a7").click()
  //         let i=0;
  //       }
  //       else if(event.key=="8"){
  //         Clicked8();
  //         let i=0;
  //       }
  //       else if(event.key=="9"){
  //         Clicked9();
  //         let i=0;
  //     }
  //     i++;
  //   })
  // }
  // listen();
  const NegativePositive=()=>{
    if(current.includes("x") || current.includes("+")  || current.includes("/")){
      New(current);
    }
    else if(current=="0" || current==""){
      New("0")
    }
    else if(current[0]=="-"){
      New(current.replace("-",""))
    }
    else{
      New("-".concat(current))
    }
  }
  
  
  const Clear=()=>{ 
    New("0")
    
  }
  const Clearall=()=>{
    New("0")
  }
  const Backspace=()=>{
    New(current.substring(0,current.length-1))
  }
const Multiply=()=>{
  checkInvalid(current,"x",false);
}
const Add=()=>{
  checkInvalid(current,"+");
}  
const Minus=()=>{
  checkInvalid(current,"-");
}
const Divide=()=>{
  checkInvalid(current,"/");
}
const Reciprocal=()=>{
   if(checkOperators(current)){
    New(current)
  }
  else{
    New(String(1/(Number(current))));
  }
}
const Decimal=()=>{
    if(current.charAt(current.length-1)=="."){
      New(current)
      console.log("asd");
    }
    else{
      if(current.includes(".")){
        if(checkOperators(current)){
          New(current.concat("."))
        }else{
          New(current)
          console.log("asd2");
        }
      }
      else{
        New(current.concat("."))
      }
    }
  }
  const Square=()=>{
    if(checkOperators(current)){
      New(current)
    }
    else{
      New(String(Number(current)*Number(current)));
    }
  }
  const Modulus=()=>{
    checkInvalid(current,"%");
  }
  const Squareroot=()=>{
    if(checkOperators(current)){
      New(current)
    }
    else{
      New(String(Math.sqrt(Number(current))));
    }
  }
  let i=0;
  const Time=()=>{
    New("")
    document.getElementsByTagName("body")[0].style.backgroundColor="rgba(128, 128, 128, 0)";
    i=i+1;
    document.getElementsByTagName("div")[5].style.backgroundColor="#151922";
    document.getElementsByTagName("div")[6].style.backgroundColor="#151922";
  }
  const Clicked=()=>{
    // i=i+1;
    if(i%2==0){

  
  
      New("0");
      document.getElementsByTagName("body")[0].style.backgroundColor="rgba(128, 128, 128, 0.13)";
      
      document.getElementsByTagName("div")[5].style.backgroundColor="#0037b6c2";
      document.getElementsByTagName("div")[6].style.backgroundColor="#0037b6c2";
      i=i+1;
    }
    else{
      
      New("")
      document.getElementsByTagName("body")[0].style.backgroundColor="rgba(128, 128, 128, 0)";
      i=i+1;
      document.getElementsByTagName("div")[5].style.backgroundColor="#151922";
      document.getElementsByTagName("div")[6].style.backgroundColor="#151922";
      document.getElementsByTagName("div")[5].style.color="#151922";
      document.getElementsByTagName("div")[6].style.color="#151922";
    }

  }
  const Isequalto=()=>{
    if(current.includes("x")){
        checkInvalid(current,"x",true);
      // removeLast(current)
    }
    else if(current.includes("+")){
      checkInvalid(current,"+",true);
      // New(current.slice(0,current.length-1)) 
    }
    else if(current.includes("-")){
      if(current[0]==="-"){
        checkInvalid(current.slice(1),"/",true)
      }
      else{
        checkInvalid(current,"-",true)
      }
    }
    else if(current.includes("/")){
      checkInvalid(current,"/",true)
    }
    else if(current.includes("%")){
      checkInvalid(current,"%",true)
    }
    else{
      New(current)
    }
  }
  return (
    <>
   
      <div className="main">
        <div className="calc">
            <div className="output" style={{backgroundColor:"#1597BB"}}>{current}  </div>
            <div className="PofGrid">

            <div className="grids">
              <div className="modulus common" onClick={Modulus}  ><i className="fa-solid fa-percent"></i></div>
              <div className="clearall common" onClick={Clearall}><i class="fa-solid fa-ban"></i></div>
              <div className="clear common" onClick={Clear}><i class="fa-solid fa-c"></i></div>
              <div className="backspace common" onClick={Backspace}><i class="fa-solid fa-delete-left"></i></div>
              <div className="reciprocal common" onClick={Reciprocal}>1/x</div>
              <div className="square common" onClick={Square}> x<sup >2</sup> </div>
              <div className="root common" onClick={Squareroot}> <i class="fa-solid fa-square-root-variable"> </i> </div>
              <div className="divide common" onClick={Divide}> <i class="fa-solid fa-divide"></i>  </div>
              <div className="a7 common common1" onClick={Clicked7}><i class="fa-solid fa-7"></i></div>
              <div className="a8 common common1" onClick={Clicked8}><i class="fa-solid fa-8"></i></div>
              <div className="a9 common common1" onClick={Clicked9}><i class="fa-solid fa-9"></i></div>
              <div className="multiply common " onClick={Multiply}><i class="fa-solid fa-xmark"></i></div>
              <div className="a4 common common1" onClick={Clicked4}><i class="fa-solid fa-4"></i></div>
              <div className="a5 common common1" onClick={Clicked5}><i class="fa-solid fa-5"></i></div>
              <div className="a6 common common1" onClick={Clicked6}> <i class="fa-solid fa-6"></i>  </div>
              <div className="minus common "onClick={Minus}> <i class="fa-solid fa-minus"></i>  </div>
              <div className="a1 common common1" onClick={Clicked1}><i class="fa-solid fa-1"></i></div>
              <div className="a2 common common1" onClick={Clicked2}> <i class="fa-solid fa-2"></i> </div>
              <div className="a3 common common1" onClick={Clicked3}> <i class="fa-solid fa-3"></i>  </div>
              <div className="add common common1" onClick={Add}> <i class="fa-solid fa-plus"></i> </div>
              <div className="negative common common1" onClick={NegativePositive}> <i class="fa-solid fa-plus-minus"></i>  </div>
              <div className="a0 common common1" onClick={Clicked0} > <i class="fa-solid fa-0"></i> </div>
              <div className="decimal common common1"onClick={Decimal}> <img src="https://img.icons8.com/ios-glyphs/12/full-stop--v1.png" ></img>  </div>
              <div className="isequalto common common1 special" onClick={Isequalto}> <i class="fa-solid fa-equals"></i> </div>
            </div>
            </div>
        </div>
      </div> 
      <br /><br /> <br />
      <div style={{display:"flex",justifyContent:"center", alignItems:"center",opacity:".5", backgroundColor: "#00B9FB"}}>
      &copy; 2022 Pratham Rajgor
      </div>
   </>
  );
}

export default App;
