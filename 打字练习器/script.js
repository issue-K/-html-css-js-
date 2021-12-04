$game_over = $("#game-over");
$nav_div = $(".nav-div");
$print_game = $("#print-game");
$select_sid = $("#sid");
$setting_btn = $(".setting-btn");
$remain_time = $("#remain-time");
$score = $("#score");
$answer = $("#answer");
$standard_answer = $("#standard-answer");
$reload_btn = $(".reload-btn");
$final_score = $("#final-score");

$game_over.hide();

let count = 0;//用来记录设置按钮点了奇数次还是偶数次
let time_left = 10;//记录当前单词还剩多少秒事件
let answer_word = $standard_answer.text();//当前的答案单词
let Difficulty = "Easy";//记录当前的难度
let score = 0;//记录当前的分数
let increment = 6;
let nav_div_height = 0;//当前设置难度栏目的高度
let nav_div_timer;//定时器



let c = 0;
let timer = setInterval( Time_Flow,1000 );

function start(){
    let s = $answer.val();
    if( s===answer_word ){//刷新单词,增加分数,清除输入框
        if( Difficulty==="Easy" )    set_time_left(10);
        else if( Difficulty==="Medium" ) set_time_left(8);
        else    set_time_left(6);

        set_score( score+1 );//分数增加
        set_answer_word( rand_word() );//刷新单词
    }
    if( time_left==0 )  return;
    requestAnimationFrame( start );
}
start();

add_listening_events();

function set_score(x){
    score = x;
    $score.text("Score: "+score );
    $final_score.text("Your final score is "+score);
}
function set_time_left(x){
    time_left = x;
    $remain_time.text("Time left: "+time_left+"s" );
}
function set_answer_word( x ){
    answer_word = x;
    $standard_answer.text( answer_word );
    $answer.val("");//输入框重置
}

function add_listening_events(){

    $setting_btn.click( function(){//设置函数
        count ^= 1;
        increment *= -1;
        nav_div_timer = setInterval( function(){
            nav_div_height += increment;
            $nav_div.css("top",nav_div_height );
            if( nav_div_height==-60 || nav_div_height==0 ){
                clearTimeout( nav_div_timer );
            }
        },40 );
    });

    $select_sid.click( function(){
        let s = $select_sid.find('option:selected').text();
        Difficulty = s;
    });

    $reload_btn.click( function(){
        if( Difficulty==="Easy" )    set_time_left(10);
        else if( Difficulty==="Medium" ) set_time_left(8);
        else    set_time_left(6);

        set_answer_word( rand_word() );//随机一个新的答案单词
        set_score(0);//清空当前的分数
        $print_game.show();
        $game_over.hide();
        timer = setInterval( Time_Flow,1000 );
        start();
    });

}

function Game_Over(){//游戏结束调用的函数
    $print_game.hide();
    $final_score.text("Your final score is "+score );
    $game_over.show();
}
function Time_Flow(){//随着事件的流逝需要变化的有
    time_left--;
    $remain_time.html( "Time left: "+time_left+"s" );
    if( time_left==0 )  clearTimeout(timer),Game_Over();
}
function rand_word(){
    let word = "";
    let len = Math.max( 3,Math.round( (Math.random()*9) ) );
    var s = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    for (let i = 0; i < len; i++)
        word += s.charAt(Math.floor(Math.random() * s.length));
    return word;
}
