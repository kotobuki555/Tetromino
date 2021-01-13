//������X�y�[�h
const GAME_SPEED=170;

//�q�B�[���h�T�C�Y
const FIELD_COL=10;
const FIELD_ROW=20;


//�u���b�N�Ђ��̃T�C�Y
const BLOCK_SIZE=30;

//�X�N���[���T�C�Y
const SCREEN_W=BLOCK_SIZE*FIELD_COL;
const SCREEN_H=BLOCK_SIZE*FIELD_ROW;

//�e�g���~�m�̃T�C�Y
const TETRO_SIZE=4;


let can=document.getElementById("can");
let con=can.getContext("2d");

can.width=SCREEN_W;
can.height=SCREEN_H;
can.style.border="4px solid #555";

const TETRO_COLORS=[
"#000", //0
"#6CF", //1
"#FA2", //2
"#66F", //3
"#C5C", //4
"#FD2", //5
"#F44", //6
"#5B5", //7
"##8b0000", //8
"##00ffff", //9
"##006400", //10

];

//�e�g���X�~�m�̖{��
const TETRO_TYPES=[
[],//0.��
[  //1.I
[0,0,0,0],
[1,1,1,1],
[0,0,0,0],
[0,0,0,0]
],
[  //2.L
[0,1,0,0],
[0,1,0,0],
[0,1,1,0],
[0,0,0,0]
],
[  //3.J
[0,0,1,0],
[0,0,1,0],
[0,1,1,0],
[0,0,0,0]
],
[  //4.T
[0,1,0,0],
[0,1,1,0],
[0,1,0,0],
[0,0,0,0]
],
[  //5.O
[0,0,0,0],
[0,1,1,0],
[0,1,1,0],
[0,0,0,0]
],
[  //6.Z
[0,0,0,0],
[1,1,0,0],
[0,1,1,0],
[0,0,0,0]
],
[  //7.S
[0,0,0,0],
[0,1,1,0],
[1,1,0,0],
[0,0,0,0]
],
[  //8.S
[0,0,0,0],
[0,1,1,0],
[0,1,0,0],
[0,0,0,0]
],
[  //9.S
[0,0,0,1],
[0,0,0,1],
[0,0,0,1],
[0,1,1,1]
],
[  //
[0,0,0,0],
[1,1,0,0],
[0,1,1,0],
[0,0,0,0]
]
];
const START_X=FIELD_COL/2 -TETRO_SIZE/2;
const START_Y=0;



//�e�g��
let tetro;

//�e�g���X�~�m�̍��W
let tetro_x=START_X;
let tetro_y=START_Y;
//�e�g���~�m�̌`
let tetro_t;

tetro_t=
Math.floor(Math.random()*(TETRO_TYPES.length-1))+1;

tetro=TETRO_TYPES[tetro_t];

//�e�g���X�~�m���g
let field=[];
//�Q�[���I�[���@�[
let over=false;

setInterval(dropTetro,GAME_SPEED);

//������
function init()
{
//�q�B�[���h�N���A

for(let y=0;y<FIELD_ROW;y++ )
{
field[y]=[];
for(let x=0;x<FIELD_COL;x++)
{
field[y][x]=0;
}
}

}
init();
drawAll();

//�u���b�N��̕`��
function drawBlock(x,y,c)
{
let px=x*BLOCK_SIZE;
let py=y*BLOCK_SIZE;


con.fillStyle=TETRO_COLORS[c];
con.fillRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
con.strokeStyle="black"
con.strokeRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
}



//�S���`�悷��
function drawAll()
{

con.clearRect(0,0,SCREEN_W,SCREEN_H);


for(let y=0;y<FIELD_ROW;y++ )
{
for(let x=0;x<FIELD_COL;x++)
{
if(field[y][x])
{
drawBlock(x,y,field[y][x]);

}
}
}

for(let y=0;y<TETRO_SIZE;y++)
{
for(let x=0;x<TETRO_SIZE;x++)
{
if(tetro[y][x]==1)
{

drawBlock(tetro_x+x,tetro_y+y,tetro_t);
}
}
}

if(over)
{
let s="GAME OVER"
con.font="40px'MS �S�V�b�N'";
let w=con.measureText(s).width;
let x=SCREEN_W/2-w/2;
let y=SCREEN_H/2-20;
con.lineWidth=4;
con.strokeText(s,x,y);
con.fillStyle="white";
con.fillText(s,x,y);
}
}
//�u���b�N�̏Փ˔��@
function checkMove(mx,my,ntetro)
{
if(ntetro==undefined)ntetro=tetro;
for(let y=0;y<TETRO_SIZE;y++)
{
for(let x=0;x<TETRO_SIZE;x++)
{

if(ntetro[y][x])
{
let nx=tetro_x+mx+x;
let ny=tetro_y+my+y;

if
(ny<0||
nx<0||
ny>=FIELD_ROW||
nx>=FIELD_COL||
field[ny][nx])
{
return false;
}
}
}
}
return true;
}
//�e�g���̉�]
function rotate()
{
let ntetro=[];

for(let y=0;y<TETRO_SIZE;y++ )
{
ntetro[y]=[];
for(let x=0;x<TETRO_SIZE;x++)
{
ntetro[y][x]=tetro[TETRO_SIZE-x-1][y];
}
}
return ntetro;
}

//�e�g���Œ�
function fixTetro()
{
for(let y=0;y<TETRO_SIZE;y++ )
{
for(let x=0;x<TETRO_SIZE;x++)
{
if(tetro[y][x])
{
field[tetro_y+y][tetro_x+x]=tetro_t;
}}}}
//���C������������������
function checkLine()
{
let linec=0;
for(let y=0;y<FIELD_ROW;y++)
{
let flag=true;

for(let x=0;x<FIELD_COL;x++)
{
if(!field[y][x])
{
flag=false;
break;
}
}
if(flag)
{
linec++;

for(let ny=y;ny>0;ny--)
{
for(let nx=0;nx<FIELD_COL;nx++)
{
field[ny][nx]=field[ny-1][nx];
}
}
}
}
}
//�u���b�N�̗����鏈��
function dropTetro()
{
if(over)return;

if(checkMove(0,1))tetro_y++;
else
{
fixTetro();
checkLine();

tetro_t=Math.floor(Math.random()*(TETRO_TYPES.length-1))+1;
tetro=TETRO_TYPES[tetro_t];
tetro_x=START_X;
tetro_y=START_Y;

if(!checkMove(0,0))
{
over=true;
}
}
drawAll();
}
//�L�[�{�[�h�������ꂽ�Ƃ��̏���
document.onkeydown=function(e)
{
if(over)return;

switch(e.keyCode)
{
case 37://��
if(checkMove(-1,0,))tetro_x--;
break;
case 38://��
if(checkMove(0,-1))tetro_y--;
break;
case 39://�E
if(checkMove(1,0))tetro_x++;

break;
case 40://��
if(checkMove(0,1))tetro_y++;

break;
case 32://�X�y�[�X
let ntetro=rotate();
if(checkMove(0,0,ntetro))tetro=rotate();
break;
}
drawAll();
}
