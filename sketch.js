// Set classes for chatbots
let botChat = 'botChat'
let humanChat = 'humanChat'

// Create the setup
function setup() {
  noCanvas();

  let bot = new RiveScript();

  bot.loadFile('brain.rive').then(brainReady).catch(brainError)

  function brainReady() {

    console.log('Chatbot ready!');
    bot.sortReplies();

    createComment('Hi there how are you doing today?', botChat)
    
    new bot.Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(createComment("Would you like me to explain how I can help you?", botChat))
      }, 2000)
    })
  }

  function brainError() {
    console.log('Chatbot error!');
  }

  let button = select('#submit');
  let user_input = select('#user_input');
  let output = select('#output');

  button.mousePressed(chat);

  function chat() {
    let input = user_input.value();

    createComment(input, humanChat)

    let reply = bot.reply("local-user", input).then(function (reply) {

      bot.sortReplies()
      
      new bot.Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(createComment(reply, botChat))
        }, 1500)
      })
    });
  }

  function createComment(text, pClas) {
    let chatArea = document.querySelector('#chat')
    let pTag = document.createElement('P')
    pTag.innerText = text;
    pTag.classList.add(pClas);

    chatArea.appendChild(pTag)

  }
}
