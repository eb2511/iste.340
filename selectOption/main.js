//<!--
'use strict';
//this is so chaotic
var data = {};
async function doFetch(){//does fetch from different data
	fetch('http://solace.ist.rit.edu/~eb2511/340/Project1/emotions.js')//change this to load different data.
		.then(responce =>responce.json())
		.then( data=>fetchDisplay(data))
        .catch (error => {console.log('there was an error: '+error+' when fetching data, we are using the default test data instead.');
                data['0']=['There was an arror in fetching data, We are using the default data instead.','infinite loop','1','end'];
                data['infinite loop']=['This is an infinite loop.','infinite loop','1'];
                data['1']=['random stuff','2','3'];
                init('0');
    });
}
function fetchDisplay(jsdata){
    console.log(jsdata);
    checkLocal(jsdata);
	for (const key in jsdata) {
        data[key]=jsdata[key];
    }
    init(0);
    document.body.insertBefore(document.createTextNode('Note: '+data['Note']),$$('div')[0]);//prints out the note for referencing.
}

function chooseFontSize(dom){
    window.localStorage.setItem('fontSize',dom.value);
    location.reload();
    }
function removeFontSize(){
    if(confirm('Are you sure? If you hit Ok, your selections will be discarded.')){
        window.localStorage.removeItem('fontSize');
    location.reload();
    };
}
function init(val){//makes one level of select option menu, with styles
    
    if(window.localStorage){
        if (window.localStorage.getItem('fontSize')){//if fontsize was previously determined
        $$('body')[0].style.fontSize = window.localStorage.getItem('fontSize') + 'em';
        var removeBtn = document.createElement('button');
        removeBtn.setAttribute('onclick','removeFontSize()');
        removeBtn.appendChild(document.createTextNode("I don't like this font size"));
        removeBtn.style.fontSize = window.localStorage.getItem('fontSize') + 'em';
        removeBtn.style.position="fixed";
        removeBtn.style.bottom="0";
        document.body.appendChild(removeBtn);
        if($('choose')){
            $$('body')[0].removeChild($('choose'));
        }
    }else{
        if(removeBtn){removeBtn.remove;}
        for (let i=0;i<$('choose').children.length;i++) {
            $('choose').children[i].style.fontSize = parseFloat($('choose').children[i].value)+'em';
        }
    }
    }else{window.location = "legacy.html";}//if version too old, leave
    
    if(data[val]){//if there are options:
        let dEle = document.createElement('div');//wraps everything in a div.

        dEle.append(document.createTextNode(data[val][0]),document.createElement('br'));// make first thing different
        let menuEle = document.createElement('select');//<select name="FindADate" onchange = "getMore()"></select>
        menuEle.setAttribute('name','FindADate');
        menuEle.setAttribute('onChange','getMore(this)');
        menuEle.style.fontSize = window.localStorage.getItem('fontSize') + 'em';
        let eOpt = document.createElement('option');//make a placeholder option
        eOpt.setAttribute('hidden','true');
        eOpt.appendChild(document.createTextNode('select...'))
        menuEle.appendChild(eOpt);
        makeOptions(menuEle,val);//makes options
        dEle.style.position = 'relative';
        dEle.appendChild(menuEle);
        if (val!=0){
            //$("selectMenu").lineBreak;
            dEle.style.left = $('selectMenu').lastChild.style.left;
            dEle.style.opacity = '0';
            go(dEle,true,'left',parseInt($('selectMenu').lastChild.style.left)+25);
            

        }else{
            dEle.style.left=0
        }
        
        $("selectMenu").appendChild(dEle);//put on page
    }
    else{
        buildForm(val);//This happens when user reach an end.
    }
}
function validate(){
//did I enter any data?
let ret = true;//return is true
    if($('name').value==''){
        $('name').style.border='2px solid red';
        alert('you must put in your name');
        ret = false;
    }
    //if($('emoEle')&&$('emoEle').value!=''){}
    return ret;
}
function buildForm(val){//builds the end form, probably long:(
    var formEle = document.createElement('form');//builds form
    formEle.style.position='absolute';
    formEle.style.right = '0';
    formEle.style.maxWidth="50%";
    formEle.style.opacity = '0';
    formEle.setAttribute('method','get');
    formEle.setAttribute('action','menu.html');
    formEle.setAttribute('onsubmit','return validate()');
    
    
    document.createElement('input');//name of user, cookie used here to preserve
    var nameEle = makeInput('text','name','Your name: ');
    nameEle.lastChild.setAttribute('id','name');
    nameEle.lastChild.setAttribute('onchange',"style=''");
    nameEle.lastChild.setAttribute('placeholder','for future referencing (fake)');
    if(GetCookie('user_name')){//if there is a cookie for username, use it.
            nameEle.lastChild.setAttribute('value',GetCookie('user_name'));
        
    }

    if(val=='Something else?'){// if other emotion, user can define their emotion & put in data.
        buildForm2(formEle,val);
    }else{
        formEle.appendChild(document.createTextNode("You've reached the end! You got: "+ val));
        lineBreak(formEle);
        formEle.appendChild(document.createTextNode("Is this the emotion you're trying to describe?"));
        var yEle = makeInput('radio','yes_no',"Yes ");
        var nEle = makeInput('radio','yes_no',"No ");
        yEle.lastChild.checked = true;
        nEle.lastChild.setAttribute('onfocus',"if(!$$('form')[0].lastChild.lastChild){buildForm2($$('form')[0])}");//if not, make your own...
        yEle.lastChild.setAttribute('onfocus',"while($$('form')[0].lastChild.value!='Submit'){$$('form')[0].removeChild($$('form')[0].lastChild)}");
        lineBreak(formEle);
        formEle.appendChild(yEle);
        lineBreak(formEle);
        formEle.appendChild(nEle);
    }
    lineBreak(formEle);
    formEle.appendChild(nameEle);


    var submitBut = document.createElement('input');//submit button
    submitBut.type='submit';
    submitBut.value = 'Submit';
    submitBut.style.fontSize = window.localStorage.getItem('fontSize') + 'em';
    submitBut.setAttribute('onclick',"submitFunc()");
    formEle.appendChild(submitBut);
    document.body.appendChild(formEle);//puts form onto page
    go(formEle,true,'right',50);
}
function submitFunc(){
    if($('name').value!=''){SetCookie('user_name',$('name').value,3000);}//for name, cookie.
    //below should be for more emotioins, local storage.
    if($('emoEle')&&$('emoEle').lastChild.value!=''){
        let EmotionName = $('emoEle').lastChild.value;
        var sel = $('selections').childNodes;
        if(sel[0].lastChild.checked==true&&sel[2].lastChild.checked==true){var EmotionDescription='Strong-pos'}
        else if(sel[0].lastChild.checked==true&&sel[3].lastChild.checked==true){var EmotionDescription='Weak-pos'}
        else if(sel[2].lastChild.checked==true){var EmotionDescription='Strong-neg'}
        else{var EmotionDescription='Weak-neg'};
        let newItem = {EmotionName,EmotionDescription};
        var cart = [];
        if(window.localStorage.getItem('notedEmotions')){//puts suztomized emotioins in localStorage.
            cart = JSON.parse(window.localStorage.getItem('notedEmotions'));
        }
            cart.push(newItem);
            window.localStorage.setItem('notedEmotions',JSON.stringify(cart));
    }
    
}
function checkLocal(dataSet){//checks localStorage to see if theres stuff to put in.
    if(window.localStorage.getItem('notedEmotions')){
        var cart = JSON.parse(window.localStorage.getItem('notedEmotions'));//converts
        for(let i=0;i<cart.length;i++){//for each, find place, put in
            dataSet[cart[i]['EmotionDescription']][dataSet[cart[i]['EmotionDescription']].length-1]=cart[i]['EmotionName'];
            dataSet[cart[i]['EmotionDescription']].push("Something else?");
        }
    }
}
function buildForm2(formEle){//the customize emotion part of the form.

    lineBreak(formEle);
    formEle.appendChild(document.createTextNode("You can log your own emotion here."));
    lineBreak(formEle);
    var emoEle = makeInput('text','emotion',"Name of your emotion: ");
    emoEle.setAttribute('id','emoEle');
    formEle.appendChild(emoEle);
    lineBreak(formEle);
    formEle.appendChild(document.createTextNode('Description: '));
    var frag = document.createElement('div');
    frag.setAttribute('id','selections');
    frag.append(makeInput('radio','pos_neg','Positive'),makeInput('radio','pos_neg','Negative'),makeInput('radio','str_weak','Strong'),makeInput('radio','str_weak','Weak'));
    frag.firstChild.lastChild.checked=true;
    frag.lastChild.previousSibling.lastChild.checked=true;
    formEle.append(frag);
    }

function go(dom,appear,pos,end){//simple function, handles dHTML transition
    if(appear==true){
        if(parseInt(dom.style[pos])<end){
            
            dom.style[pos] = parseInt(dom.style[pos]) +1+'px';
            dom.style.opacity = parseFloat(dom.style.opacity)+0.04;
            setTimeout(function(){go(dom,appear,pos,end)},25);
        }
    }else{
        if(parseInt(dom.style[pos])>end){
            console.log(parseInt(dom.style[pos]),end);
            dom.style[pos] = parseInt(dom.style[pos]) -1+'px';
            dom.style.opacity = parseFloat(dom.style.opacity)-0.04;
            setTimeout(function(){go(dom,appear,pos,end)},25);
        }
    }
}
function getMore(dom){
    document.body.lastChild.tagName==='FORM'?document.body.removeChild(document.body.lastChild):console.log('all clear!');//remove the form if change happens...
    //there's a bug here, if i change choices within the first ...
    while(dom!=$('selectMenu').lastChild.lastChild){
/////////////////////////bug////////////////////////////////////////
        //go($('selectMenu').lastChild,false,'left',parseInt($('selectMenu').lastChild.previousSibling.style.left));
/////////////somehow deletes everything instantly////////////////////
        $('selectMenu').removeChild($('selectMenu').lastChild);
        //if this is not the last child then kill the last child, repeting so it kills everyone!
    }
    let val = document.getElementsByName("FindADate")[document.getElementsByName("FindADate").length-1].value;
    init(val);
}
function makeOptions(menuEle,val){//grab data from object data,put them into <option>, not much to do here i think
    data[val].forEach(element => {//internet code
        if(data[val][0]==element){
            console.log('jump the first data element.')
        }else{
            let oele = document.createElement('option');
            oele.setAttribute('value',element);
            oele.appendChild(document.createTextNode(element));
            menuEle.appendChild(oele);
        };
        
    }); 
}
function $(dom){//shortcut
    return document.getElementById(dom);
}
function $$(dom){
    return document.getElementsByTagName(dom);
}
function makeInput(eleType,eleName,desc){
    var Ele = document.createElement('input');
    Ele.style.fontSize=window.localStorage.getItem('fontSize') + 'em';
    Ele.setAttribute('type',eleType);
    Ele.setAttribute('name',eleName);
    var lEle = document.createElement('label');
    lEle.for = Ele;
    lEle.appendChild(document.createTextNode(desc));
    lEle.appendChild(Ele);
    return lEle;
}
function lineBreak(dom){
    dom.appendChild(document.createElement('br'));
}

//-->