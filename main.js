let flag = true;
//名前の処理
document.getElementById("plySt0")
let name = prompt("名前を入力")
plySt0.textContent = name
//プレイヤーデータ 配列にする
let k=0
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = [5,15,20,25,30,35,40,45,50,55,60,65,70,100,200];
let plyExpNeed = [5,15,20,25,30,35,40,45,50,55,60,65,70,100,200];
let plyImg = document.getElementById("plyImg");
let plySt = new Array(7);
for (let i = 0; i < 7; i++) {
    plySt[i] = document.getElementById("plySt"+[i])
    
}
//エネミーデータ配列にする
let i=1
let eneLv = 1;
let eneHp = [99,15,20,25,30,35,40,50,75,90,100];
let eneHpMax0 = [99,15,20,25,30,35,40,50,75,90,100];
let eneAtt0 = [50,3,4,5,7,8,9,10,12,15,18];
let eneKill0 = [0,0,0,0,0,0,0,0,0,0,0];
let eneExp0 =[1,1,5,7,8,9,10,12,14,16,18];
let eneCnt = 5;
let eneCntMax0 = 5;
let eneImg = document.getElementById("eneImg");
let eneSt = new Array(5)
for (let j = 0; j < 4; j++) {
    eneSt[j] = document.getElementById("eneSt"+[j])
    
}
//エネミー名前
let enename = new Array("スライムにすら逃げる臆病者を狩る死神","スライム","蝙蝠","鼠","蛇","狼","小鬼","幽霊","死体","火球","熊");
//逃げる
let run = document.getElementById("left");
run.addEventListener("click",()=>{
    if(0<eneLv && flag){
        eneLv--;
        i--;
        eneSt0.textContent = enename[eneLv];
        eneImg.src = "enemyA" + (eneLv-1) + ".png";
        eneHp[eneLv] = eneHpMax0[eneLv];
        eneSt1.textContent = "レベル:" + eneLv;
        eneSt2.textContent = "HP:" + eneHpMax0[eneLv];
        eneSt3.textContent = "攻撃力:" + eneAtt0[eneLv];
    }else{
        alert("逃げられない！")
    }
})
//次のエネミー
let next = document.getElementById("right");
next.addEventListener("click",()=>{
    if(eneLv<10){
        eneLv++;
        i++;
        eneSt0.textContent = enename[eneLv];
        eneImg.src = "enemyA" + (eneLv-1) + ".png";
        eneHp[eneLv] = eneHpMax0[eneLv];
        eneSt1.textContent = "レベル:" + eneLv;
        eneSt2.textContent = "HP:" + eneHpMax0[eneLv];
        eneSt3.textContent = "攻撃力:" + eneAtt0[eneLv];
    }
})

//プレイヤー回復
plyImg.addEventListener("mousedown",()=>{
    if(flag){
        plyImg.src = "playerC.png";
    }
});
plyImg.addEventListener("mouseup",()=>{
    if(flag){
        plyImg.src = "playerA.png";
        plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
        plySt2.textContent = "HP:" + plyHp;
    }
});


//敵を攻撃
eneImg.addEventListener("mousedown",()=>{
    if(flag){
        eneImg.src = "enemyB" + (eneLv-1) + ".png";
    }
});
eneImg.addEventListener("mouseup",()=>{
    if (flag) {
        eneImg.src = "enemyA" + (eneLv-1) + ".png";
        if(eneHp[eneLv] > 0){
            eneHp[eneLv] -= plyAtt;
        }else{
            eneHp[eneLv] = eneHpMax0[eneLv];
            eneKill0[eneLv]++;
            eneSt4.textContent = "倒した回数:" + eneKill0[eneLv];
            
            
            if(eneLv ==10){
                flag = false;
                eneImg.src="c.png";
            eneSt2.textcontent = "Thank you";
            eneSt3.textcontent = "for";
            eneSt4.textcontent = "playing";
            }
            //クリア
            if(eneKill0[11]>0){
                flag = false;
                eneImg.src="c.png";
            };
            //経験値の処理
            plyExp += eneExp0[eneLv];
            plySt5.textContent = "経験値:" + plyExp;
            plyExpNext[plyLv-1] -= eneExp0[eneLv];
            //レベルアップの処理
            if (plyExpNext[plyLv-1] <= 0) {
                plyExpNext[plyLv-1] = plyExpNeed[plyLv];
                plyLv++;
                plySt1.textContent = "レベル:" + plyLv;
                plyHpMax = plyLv *2 + 6;
                plyHp = plyHpMax;
                plySt2.textContent = "HP:" + plyHp;
                plyAtt ++;
                plySt3.textContent = "攻撃力:" + plyAtt;
                plyHeal++;
                plySt4.textContent = "回復魔法:" + plyHeal;
                
            }
            plySt6.textContent = "次のレベルまでの経験値" + plyExpNext[plyLv-1] + "ポイント";
        }
        eneSt2.textContent ="HP:" + eneHp[eneLv];
    }
});
//敵の攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(()=>{
  if (flag) {
    if (eneCnt > 0) {
      eneCnt--;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    }else{
      plyImg.src = "playerB.png";
      if (plyHp > eneAtt0[eneLv]) {
        plyHp -= eneAtt0[eneLv];
        plySt2.textContent = "HP:" + plyHp;
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    }else{
        plyHp = 0;
        clearInterval(loop);
        flag = false;
        plySt2.textContent = "HP:" + plyHp;
        eneSec.textContent = "ゲームオーバー";
    }
    setTimeout(()=>{
      if (flag) {
        eneCnt = eneCntMax0;
        plyImg.src = "playerA.png";
      }
    }, 500);
  }
}
}, 1000);