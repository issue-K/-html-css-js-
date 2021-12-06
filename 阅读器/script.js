const main = $('#main');
const voicesSelect = $('#voices');
const textarea = $('#text');
const readBtn = $('#read');
const toggleBtn = $('#toggle');
const closeBtn = $('.close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

data.forEach(createBox);

// Create speech boxes

// var parentdiv=$('<div></div>');        //创建一个父div
// parentdiv.attr('id','parent');        //给父div设置id
// parentdiv.addclass('parentdiv');    //添加css样式
//
// var childdiv=$('<div></div>');        //创建一个子div
// childdiv.attr('id','child');            //给子div设置id
// childdiv.addclass('childdiv');    //添加css样式
// childdiv.appendto(parentdiv);        //将子div添加到父div中
//
// parentdiv.appendto('body');            //将父div添加到body中
function createBox(item) {
  let box = $('<div></div>');

  const { image, text } = item;

  box.attr('class','box');

  box.html( `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `);


  main.append( box );
}
