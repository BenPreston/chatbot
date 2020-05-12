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

    createComment('Hi there!', botChat)
    
  }

  function brainError() {
    console.log('Chatbot error!');
  }

  const button = select('#submit');
  const user_input = select('#user_input');
  const input = document.querySelector('#user_input')

  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      chat();
    }
  }); 

  button.mousePressed(chat);

  // Bot response
  function chat() {
    let input = user_input.value();
    user_input.innerText = '';
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
    let wrapper = document.createElement('DIV')
    wrapper.classList.add('textBox')
    let pTag = document.createElement('P')
    pTag.innerText = text;
    pTag.classList.add(pClas);

    wrapper.appendChild(pTag)
    chatArea.appendChild(wrapper)

  }
}
