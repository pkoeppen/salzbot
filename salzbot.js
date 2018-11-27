(function() {

  /*
            /)     /)        
   _   _   // _   (/_ ____/_ 
  /_)_(_(_(/_'_)_/_) (_) (__ 
            .-/              
           (_/ 

  A relatively useless, copy-paste
  chatbot for the WhatsApp web console.
  */

  var chatWindow, chat, messages;
  var responded = [];

  const users = {
    "436763168285":   "Nick",
    "4741203103":     "Tommy",
    "381631730494":   "Teodora",
    "381646626955":   "Kosta",
    "436504182982":   "Kiki",
    "436506362578":   "Clemens",
    "436641685232":   "Sophia",
    "436647915852":   "Iuliu",
    "491747712675":   "Angelika",
    "4915161418797":  "Clara",
    "4915730667939":  "Florian",
    "4917665292417":  "Peter"
  };

  const replies_de = [
    "ＪＡ",
    "ＮＥＩＮ",
    "ＶＩＥＬＬＥＩＣＨＴ",
    "ＷＡＨＲＳＣＨＥＩＮＬＩＣＨ",
    "ＺＷＥＩＦＥＬＨＡＦＴ"
  ];

  const replies_en = [
    "ＹＥＳ",
    "ＮＯ",
    "ＭＡＹＢＥ",
    "ＰＲＯＢＡＢＬＹ",
    "ＤＯＵＢＴＦＵＬ"
  ];

  const truths = [
    "What are you most self-conscious about?",
    "What is the most embarrassing picture of you?",
    "What would you do if you were the opposite sex for a month?",
    "What is the most expensive thing you have stolen?",
    "What is the most childish thing you still do?",
    "Have you ever let someone take the blame for something you did?",
    "What do most of your friends think about you that is totally untrue?",
    "Have you ever cheated or been cheated on?",
    "What lie have you told that hurt someone?",
    "What is the meanest you have been to someone that didn’t deserve it?",
    "What is something that people think you would never do but you have?",
    "What was the worst encounter you had with a police officer?",
    "Tell me about your most awkward date.",
    "What is the silliest thing you have an emotional attachment to?",
    "What is your deepest darkest fear?",
    "Tell me about your first kiss.",
    "Where is the strangest place you have peed?",
    "Who is the person you most regret kissing?",
    "Have you ever crapped your pants since you were a child?",
    "What is the most embarrassing thing your parents have caught you doing?",
    "What secret about yourself did you tell someone in confidence and then they told a lot of other people?",
    "When was the most inappropriate time you farted?",
    "What is the scariest dream you have ever had?",
    "What is the most embarrassing thing in your room?",
    "Why did you break up with your last boyfriend or girlfriend?",
    "What is the stupidest thing you have ever done?",
    "When was the last time you peed in bed?",
    "What is the grossest thing that has come out of your body?",
    "What terrible thing have you done that you lied to cover up?",
    "Who have you loved but they didn’t love you back?",
    "What is something that you have never told anyone?",
    "What is the most disgusting habit you have?",
    "What was the cruelest joke you played on someone?",
    "What is the most embarrassing thing you have put up on social media?",
    "What bad thing have you done that no one else found out about?",
    "What was the most awkward romantic encounter you have had?",
    "What is the grossest thing you have had in your mouth?",
    "Tell me about the last time someone unexpectedly walked in on you while you were naked.",
    "What is the most embarrassing nickname you have ever had?",
    "What is the biggest lie you have ever told?",
    "What is the most embarrassing photo you have on your phone?",
    "Describe your most recent romantic encounter.",
    "What is the weirdest thing you have done for a boyfriend or girlfriend?",
    "What is your biggest regret?",
    "When was the last time you picked your nose without a tissue?",
    "What do you really hope your parents never find out about?",
    "Tell us your most embarrassing vomit story.",
    "Tell me something you don’t want me to know.",
    "What have you done that people here would judge you most for doing?",
    "What would you do if you were the opposite gender for a day?",
    "Who is your crush?"
  ];

  const dares = [
    "For a guy, put on makeup. For a girl, wash off your make up.",
    "Dance with no music for 1 minute.",
    "Try to drink a glass of water while standing on your hands.",
    "Let the group pose you in an embarrassing position and take a picture.",
    "Curse like sailor for 20 seconds straight.",
    "Do four cartwheels in row.",
    "Play a song on by slapping your butt cheeks till someone guesses the song.",
    "Give someone your phone and let them send one text to anyone in your contacts.",
    "Depict a human life through interpretive dance.",
    "Lick the floor.",
    "Drink a small cup of a concoction that the group makes.",
    "Write something embarrassing somewhere on your body (that can be hidden with clothing) with a permanent marker.",
    "Let someone shave part of your body.",
    "Eat five spoonfuls of a condiment.",
    "Let the group give you a new hairstyle.",
    "Make every person in the group smile, keep going until everyone has cracked a smile.",
    "Sniff the armpits of everyone in the room.",
    "Let the person to your left draw on your face with a pen.",
    "Make up a 30 second opera about a person or people in the group and perform it.",
    "Serenade the person to your right.",
    "Talk in an accent for the next 3 rounds.",
    "Beg and plead the person to your right not to leave you for that other boy or girl. Weeping, gnashing of teeth, and wailing is encouraged.",
    "Attempt to break dance for 30 seconds.",
    "Kiss the person to your left.",
    "Do the worm.",
    "Do push-ups until you can’t do any more, wait 5 seconds, and then do one more.",
    "Sell a piece of trash to someone in the group. Use your best salesmanship.",
    "Attempt to do a magic trick.",
    "Switch clothes with someone of the opposite sex in the group for three rounds.",
    "Imitate a celebrity every time you talk for three minutes.",
    "Try to juggle 2 or 3 items of the group’s choosing.",
    "Stick your arm into the trash can past your elbow.",
    "Walk on your hands from one side of the room to the other. You can ask someone to hold your legs if necessary.",
    "Gargle something that shouldn’t be gargled, but won’t hurt you.",
    "Get slapped on the face by the person of your choosing.",
    "Grab a trash can and make a hoop with your hands above the trash can. Have other members of the group try to shoot trash through your impromptu trashketball hoop. (No bottles or other injury causing trash should be thrown. Once again, no trips to the hospital please.)",
    "Spin an imaginary hula hoop around your waist for 3 minutes while the game continues.",
    "Imitate popular YouTube videos until someone can guess the video you are imitating.",
    "Dance to a song of the group’s choosing.",
    "Be someone’s pet for the next 5 minutes.",
    "Compose a poem on the spot based on something the group comes up with.",
    "Take a shower with your clothes on.",
    "Choose someone from the group to give you a spanking.",
    "Post an extremely unflattering picture of yourself to the social media outlet of your choosing.",
    "Make a funny face and keep making it for 2 minutes while the game continues.",
    "Imagine something in your room. Now spell it with your nose and keep spelling it with your nose until someone from the group guesses what you are trying spell.",
    "After the group chooses one rude word, sing a song and insert that rude word once into every line of the song.",
    "Drag your butt on the carpet like a dog from one end of the room to the other. You’ll need to be wearing shorts or pants for this one.",
    "Open a bag of snacks or candy using only your mouth, no hands or feet.",
    "Do your best impression of a baby being born.",
    "Bend at the waist so that you are looking behind you between your legs. Now run backwards until you can tag someone with your butt.",
    "Make a tea out of something that isn’t tea, then drink it.",
    "Go to the bathroom, take off your underwear and put it on your head. Wear it on your head for the rest of the game.",
    "Act like whatever animal someone yells out for the next 1 minute.",
    "Eat one teaspoon of the spiciest thing you have in the kitchen.",
    "Transfer an icecube from your mouth to the person’s mouth on your right.",
    "Call the 7th contact in your phone and sing them 30 seconds of a song that the group chooses.",
    "No talking. Pretend to be a food. Don’t pretend to eat the food, pretend to be the food. Keep pretending until someone in the group guesses the food you are.",
    "Drop something in the toilet and then reach in to get it.",
    "Find the person whose first name has the same letter as your first name or whoever’s first name’s first letter is closest to yours. Now lick their face.",
    "Put 4 ice cubes down your pants.",
    "Sit in a spinning chair and have the group spin you for 30 seconds. Might help to hold a trash can just in case."
  ];

  const insults = [
    "If laughter is the best medicine, $NAME's face must be curing the world.",
    "$NAME is so ugly, they scared the crap out of the toilet.",
    "$NAME's family tree must be a cactus because everybody on it is a prick.",
    "$NAME, it's better to let someone think you are an idiot than to open your mouth and prove it.",
    "If I had a face like $NAME's, I'd sue my parents.",
    "$NAME's birth certificate is an apology letter from the condom factory.",
    "I guess $NAME proves that even God makes mistakes sometimes.",
    "The only way $NAME will ever get laid is if they crawl up a chicken's ass and wait.",
    "$NAME is so fake, Barbie is jealous.",
    "I’m jealous of people that don’t know $NAME!",
    "$NAME is so ugly, when their mom dropped them off at school they got a fine for littering.",
    "$NAME must have been born on a highway because that's where most accidents happen.",
    "Brains aren't everything. In $NAME's case, they're nothing.",
    "Calling $NAME an idiot would be an insult to all the stupid people.",
    "Some babies were dropped on their heads, but $NAME was clearly thrown at a wall.",
    "Please shut your mouth when you’re talking to me.",
    "I'd slap $NAME, but that would be animal abuse.",
    "They say opposites attract. I hope $NAME meets someone who is good-looking, intelligent, and cultured.",
    "The last time I saw something like $NAME, I flushed it.",
    "If ugly were a crime, $NAME would get a life sentence.",
    "$NAME, why don't you slip into something more comfortable... like a coma.",
    "I don't know what $NAME's problem is, but I'll bet it's hard to pronounce.",
    "$NAME is the reason the gene pool needs a lifeguard.",
    "Sure, I've seen people like $NAME before - but I had to pay an admission.",
    "$NAME is like Monday mornings. Nobody likes them.",
    "I'd like to see things from $NAME's point of view, but I can't seem to get my head that far up my ass.",
    "Stupidity is not a crime, so $NAME is free to go.",
    "$NAME is so dumb, they think Cheerios are donut seeds.",
    "Every time I'm next to $NAME, I get a fierce desire to be alone.",
    "How did $NAME get here? Did someone leave their cage open?",
    "Is $NAME always this stupid or is today a special occasion?"
  ];

  const compliments = [
    "$NAME is more fun than anyone or anything I know, including bubble wrap.",
    "$NAME is the most perfect $NAME there is.",
    "$NAME is enough.",
    "$NAME is one of the strongest people I know.",
    "$NAME looks great today.",
    "$NAME has the best smile.",
    "$NAME's outlook on life is amazing.",
    "$NAME just lights up the room.",
    "$NAME makes a bigger impact than they realize.",
    "$NAME is always so helpful.",
    "$NAME has the best laugh.",
    "I appreciate my friendship with $NAME.",
    "$NAME's inside is even more beautiful than their outside.",
    "$NAME just glows.",
    "I love the way $NAME brings out the best in people.",
    "Our dorm is better because $NAME is part of it.",
    "$NAME brings out the best in the rest of us.",
    "$NAME inspires me.",
    "Nothing can stop $NAME.",
    "$NAME just made my day.",
    "$NAME is an excellent friend.",
    "When it comes to cooking, no one’s meals are quite as delicious as $NAME's.",
    "I am a better person because of $NAME.",
    "$NAME has taught me so much.",
    "I like the way $NAME is.",
    "$NAME has the best sense of style.",
    "$NAME makes me want to be a better person.",
    "I hope $NAME is proud of themself, because I am!",
    "$NAME is one of the bravest people I know.",
    "Everything seems brighter when $NAME is around.",
    "I know that $NAME will always have my back, because that is the kind of person they are.",
    "$NAME has the best ideas.",
    "$NAME is a great example to others.",
    "$NAME has great leadership skills.",
    "$NAME has amazing creative potential.",
    "$NAME really seems to know who they are. I admire that.",
    "$NAME is the reason I am smiling today.",
    "$NAME is a gift to everyone they meet.",
    "$NAME has a gift for making people comfortable.",
    "I enjoy spending time with $NAME.",
    "I tell everyone how amazing $NAME is."
  ];

  const commands = {

    toss: () => {

      // Simulate a coin toss.

      const toss = Math.random() > .5 ? "ＨＥＡＤＳ" : "ＴＡＩＬＳ";
      return toss;
    },

    pick: () => {

      // Pick a random member of the group.

      const names = Object.values(users);
      const name  = names[Math.floor(Math.random() * names.length)];
      return name;
    },

    drink: () => {

      // Suggest something to drink.

      const alcohols = [
        "ＶＯＤＫＡ",
        "ＷＨＩＳＫＥＹ",
        "ＧＩＮ",
        "ＴＥＱＵＩＬＡ",
        "ＲＵＭ",
        "ＲＡＫＩＡ",
        "ＧＡＳＯＬＩＮＥ",
        "ＢＥＥＲ",
        "ＷＩＮＥ",
        "ＷＡＴＥＲ"
      ];
      const alcohol = alcohols[Math.floor(Math.random() * alcohols.length)];
      return alcohol;
    },

    truth: () => {

      // Pick a random "truth".

      const truth = truths[Math.floor(Math.random() * truths.length)];
      return truth;
    },

    dare: () => {

      // Pick a random "dare".

      const dare = dares[Math.floor(Math.random() * dares.length)];
      return dare;
    },

    insult: (insultee) => {

      // Insult somebody.

      if (!insultee) { throw new Error(); }
      insultee = insultee[0].toUpperCase() + insultee.slice(1);
      const insult = insults[Math.floor(Math.random() * insults.length)].replace("$NAME", insultee);
      return insult;
    },

    compliment: (complimentee) => {

      // Compliment somebody.

      if (!complimentee) { throw new Error(); }
      complimentee = complimentee[0].toUpperCase() + complimentee.slice(1);
      const compliment = compliments[Math.floor(Math.random() * compliments.length)].replace("$NAME", complimentee);
      return compliment;
    }
  };

  function findChatComponent(dom) {
    var result;
    for (let key in dom) {
      if (key.startsWith("__reactInternalInstance$")) {
        try {
          result = dom[key].child.child.memoizedProps.children._owner.stateNode.props.chat;
        } catch (error) {
          try {
            result = dom[key].child.sibling.sibling.pendingProps.chat
          } catch (error) {}
        }
      }
    }
    return result;
  }

  function findMessageComponents(dom) {
    for (let key in dom) {
      if (key.startsWith("__reactInternalInstance$")) {
        return dom[key].memoizedProps.children.map(o => o.props.msg).filter(o => o);
      }
    }
  }

  function extractUsersFromMessages(messages) {
    const users = {};
    messages.forEach(element => {
      if (!element.props.msg ||
          !element.props.msg.__x_senderObj ||
          Object.keys(users).indexOf(element.props.msg.__x_senderObj.__x_id.user) > -1) {
        return;
      } else {
        users[element.props.msg.__x_senderObj.__x_id.user] = element.props.msg.__x_senderObj.__x_pushname;
      }
    });
    return users;
  }

  function poll() {
    messages = findMessageComponents(chatWindow);
    messages.reduce((acc, message) => {

      if (responded.indexOf(message.__x_id.id) > -1) {

        // If bot has already replied to this message, don"t reply.

        return;
      }

      else if (!message.__x_text || message.__x_text.startsWith("🤖")) {

        // If bot message, don"t reply.

        return;
      }

      else {

        // Else, reply to the message.

        const name = users[message.__x_senderObj.__x_id.user];
        const body = message.__x_text;
        const id   = message.__x_id.id;

        if (/^bot.*\?$/i.test(body)) {

          // If message is a question for the Bot...

          const isGerman = [
            "clara",
            "sophia",
            "clemens",
            "angelika",
            "florian"
          ].indexOf(name.toLowerCase()) > -1;

          const replies = isGerman ? replies_de : replies_en;
          const reply   = replies[Math.floor(Math.random() * replies.length)]

          chat.sendMessage(`🤖 ${reply}`);
        }

        else if (/^\/[a-z]+(\s[a-z]+)?$/i.test(body)) {

          // If message has the format "/command [argument]"...

          const [ command, argument ] = body.slice(1).split(" ");
          try {
            const text = commands[command.toLowerCase()](argument);
            chat.sendMessage(`🤖 ${text}`);
          } catch(error) {
            console.error(error);
          }
        }

        else {

          // For every other message...

          //chat.sendMessage(`🤖 ${name} said: ${body}`);
        }

        // Add ID to list of responded message IDs.

        responded.push(id);
      }
    });
  }

  function init() {
    chatWindow = document.getElementsByClassName("_9tCEa")[0];
    chat = findChatComponent(document.getElementsByTagName("footer")[0]);

    // Set "responded" to all existing messages. In other words, only
    // reply to new messages that are posted after bot's initialization.

    responded = findMessageComponents(chatWindow).map(m => m.__x_id.id);
    setInterval(poll, 1000);
  }

  init();

})();