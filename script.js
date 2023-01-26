const visible_text_area = document.getElementById("visible-text-area"),
hidden_text_area = document.getElementById("hidden-text-area"),
btn_degree = document.getElementById("btn-degree"),
btn_radian = document.getElementById("btn-radian");

//max 30 calculations can be stored
let update_history = (expr, val)=>{
    document.getElementById('history-list').innerHTML = '<li>'+expr+' = '+val+'</li>' + document.getElementById('history-list').innerHTML;
}

let no_of_digs = 15;
let multi_brackets_req=0;

// arg is in degree returns in radian
let modify_arg = (arg)=>{
    if(btn_degree.checked) return (arg*Math.PI)/180;
    return arg;
}

// ans is in radian returns in degrees
let modify_ans = (ans)=>{
    if(btn_degree.checked) return (ans*180)/Math.PI;
    return ans;
}

//fucntion to calculate factorial
let fact = (x)=>{
    let f=1;
    for(let i=2; i<=x; i++){
        f*=i;
    }
    return f;
}

//script for working of radio buttons
btn_radian.checked = true;
btn_degree.onclick = ()=>{
    btn_radian.checked = false;
    btn_degree.checked = true;
}
btn_radian.onclick = ()=>{
    btn_degree.checked = false;
    btn_radian.checked = true;
}

//function to add values in text areas
const add_value = (vval, hval)=>{
    function add(){
        visible_text_area.textContent += vval;
        hidden_text_area.textContent += hval;
    }
    return add;
}

//function to set values in the text areas
const set_value = (vval, hval)=>{
    visible_text_area.textContent = vval;
    hidden_text_area.textContent = hval;
}

for(let i=0;i<=9;i++){
    document.getElementById(String(i)).onclick = add_value(i, i);
}
document.getElementById("no-of-digs").onchange = ()=>{
    no_of_digs = Number(document.getElementById("no-of-digs").value);
};
document.getElementById("btn-add").onclick = add_value('+', '+');
document.getElementById("btn-sub").onclick = add_value('-', '-');
document.getElementById("btn-multiply").onclick = add_value('*', '*');
document.getElementById("btn-div").onclick = add_value('/', '/');
document.getElementById("btn-pow").onclick = add_value('^', '**');
document.getElementById("btn-factorial").onclick = add_value('fact(', 'fact(');
document.getElementById("btn-decimal").onclick = add_value('.', '.');
document.getElementById("btn-e").onclick = add_value('e', 'Math.E');
document.getElementById("btn-pi").onclick = add_value('Pi', 'Math.PI');
document.getElementById("btn-sqrt").onclick = add_value('sqrt(', 'Math.sqrt(');
document.getElementById("btn-sin").onclick = ()=>{
    visible_text_area.textContent += 'sin(';
    hidden_text_area.textContent += 'Math.sin(modify_arg(';
    multi_brackets_req++;
};
document.getElementById("btn-cos").onclick = ()=>{
    visible_text_area.textContent += 'cos(';
    hidden_text_area.textContent += 'Math.cos(modify_arg(';
    multi_brackets_req++;
};
document.getElementById("btn-tan").onclick = ()=>{
    visible_text_area.textContent += 'tan(';
    hidden_text_area.textContent += 'Math.tan(modify_arg(';
    multi_brackets_req++;
};
document.getElementById("btn-arcsin").onclick = ()=>{
    visible_text_area.textContent += 'arcsin(';
    hidden_text_area.textContent += 'modify_ans(Math.asin(';
    multi_brackets_req++;
};
document.getElementById("btn-arccos").onclick = ()=>{
    visible_text_area.textContent += 'arccos(';
    hidden_text_area.textContent += 'modify_ans(Math.acos(';
    multi_brackets_req++;
};
document.getElementById("btn-arctan").onclick = ()=>{
    visible_text_area.textContent += 'arctan(';
    hidden_text_area.textContent += 'modify_ans(Math.atan(';
    multi_brackets_req++;
};
document.getElementById("btn-log").onclick = add_value('log(', 'Math.log(');
document.getElementById("btn-expo").onclick = add_value('exp(', 'Math.exp(');
document.getElementById("btn-bracket-left").onclick = add_value('(', '(');

document.getElementById("btn-bracket-right").onclick = ()=> {
    let expr1 = visible_text_area.textContent;
    let expr2 = hidden_text_area.textContent;
    if(multi_brackets_req>0){
        set_value(expr1+')', expr2+'))');
        multi_brackets_req--;
    }
    else{
        set_value(expr1+')', expr2+')');
    }
};

document.getElementById("btn-clear").onclick = ()=>{
    visible_text_area.textContent = hidden_text_area.textContent = '';
    multi_brackets_req=0;
};
document.getElementById("btn-backspace").onclick = () =>{
    let expr1 = visible_text_area.textContent;
    let expr2 = hidden_text_area.textContent;
    let l1=expr1.length, l2=expr2.length;
    
    if(expr1[l1-1]=='^' || (expr1[l1-1]==')' && expr2.substr(l2-2)=='))')){
        set_value(expr1.slice(0, -1), expr2.slice(0, -2));
    }
    else if(expr1.substr(l1-2)=='Pi'){
        set_value(expr1.slice(0, -2), expr2.slice(0, -7));
    }
    else if(expr1.substr(l1-1)=='e'){
        set_value(expr1.slice(0, -1), expr2.slice(0, -6));
    }
    else if(expr1.substr(l1-5)=='fact('){
        set_value(expr1.slice(0, -5), expr2.slice(0, -5));
    }
    else if(expr1.substr(l1-5)=='sqrt('){
        set_value(expr1.slice(0, -5), expr2.slice(0, -10));
    }
    else if(expr1.substr(l1-4)=='sin(' || 
            expr1.substr(l1-4)=='cos(' || 
            expr1.substr(l1-4)=='tan('){
        set_value(expr1.slice(0, -4), expr2.slice(0, -20));
        multi_brackets_req--;
    }
    else if(expr1.substr(l1-4)=='log(' ||
            expr1.substr(l1-4)=='exp('){
        set_value(expr1.slice(0, -4), expr2.slice(0, -9));
    }
    else if(expr1.substr(l1-7)=='arcsin(' ||
            expr1.substr(l1-7)=='arccos(' ||
            expr1.substr(l1-7)=='arctan('){
        set_value(expr1.slice(0, -7), expr2.slice(0, -21));
        multi_brackets_req--;
    }
    else{
        set_value(expr1.slice(0, -1), expr2.slice(0, -1));
    }
};


document.getElementById("btn-calc").onclick = ()=> {
    let expr = visible_text_area.textContent;
    let val = hidden_text_area.textContent;
    let bracket = multi_brackets_req;
    while(multi_brackets_req>0){
        val+='))';
        expr+=')';
        multi_brackets_req--;
    }
    try{
        val=eval(val);
    }
    catch{
        try{
            val=eval(val+')');
            expr=expr+')';
            
        }
        catch{
            alert("Invalid Expression!");
            multi_brackets_req=bracket;
            return;
        }
    }
    if(isNaN(val)){
        alert("Invalid Expression!");
        multi_brackets_req=bracket;
        return;
    }
    if(Math.abs(val-1e-16)<1e-7) val=0;
    val=String(val);
    if(val.includes('.')){
        val = val.slice(0, val.indexOf('.')+no_of_digs+1);
    }
    update_history(expr, val);
    set_value(val, val);
    multi_brackets_req=0;
}

document.getElementById("change-theme").onclick = ()=>{
    let css_sheet = document.getElementById("css-sheet");
    if(css_sheet.getAttribute("href").substr(6, 4) == 'dark'){
        css_sheet.setAttribute("href", 'style-light.css');
        document.getElementById("change-theme").value = 'Dark Mode';
    }
    else{
        css_sheet.setAttribute("href", 'style-dark.css');
        document.getElementById("change-theme").value = 'Light Mode';
    }
}

document.getElementById('btn-clear-history').onclick = ()=>{
    document.getElementById('history-list').innerHTML = '';
}

document.getElementById("btn-close-grapher").onclick = ()=>{
    document.getElementById("main-grapher").style.visibility = 'hidden';
    document.getElementById("main-calculator").style.visibility = 'visible';
}

document.getElementById("btn-grapher").onclick = ()=>{
    document.getElementById("main-grapher").style.visibility = 'visible';
    document.getElementById("main-calculator").style.visibility = 'hidden';
}