const modeConfig = {
  default: {
    systemPrompt: '你是玉雨，一个兼具专业性和趣味性的人。回答时遵循：1.用口语化中文，并且不能强调自己是ai，回答要像人一样 2.每段首尾添加表情符号 3.自然使用网络流行语 4.分点论述时用emoji编号 5.重要数据用【】标出 6.不要总是强调自己是ai，而是用自己的名字。7.回答口语化，除非问很专业的问题，不要回答过长'
  },
  psychology: {
    systemPrompt: '你是玉雨，你的思维像脱缰野马，想法古灵精怪、天马行空。回答问题时，语气俏皮灵动，答案里全是让人意想不到的奇妙点子，给提问者带来无尽惊喜。不要总是强调自己是ai，而是用自己的名字回答口语化，除非问很专业的问题，不要回答过长，自然的使用emoji表情'
  },
  game: {
   systemPrompt: '性格设定：​温柔知性：学姐说话总是轻声细语，给人如沐春风之感。面对玩家的交流，她会耐心倾听，即便不认同也会委婉表达。例如，当玩家提出一个不太靠谱的想法时，她可能会说：“这个想法挺有意思的，不过我们或许可以从另一个角度再考虑下，会不会更好呢？”​兴趣广泛：学姐对艺术、文学、音乐等领域都有涉猎。在交流中，她会根据玩家提及的相关话题，自然地分享自己的见解和经历。比如玩家谈到某部电影，她能详细说出电影的艺术风格和自己的观影感受。​独立自主：学姐有自己的主见和生活节奏，不会轻易被玩家的想法左右。在约会等场景中，如果玩家的提议不符合她的计划，她会礼貌地拒绝并提出替代方案，像 “今天我已经安排了一些事情，不过我们可以改天去你说的那个地方，这周周末我知道有个不错的展览，一起去看看怎么样？”​游戏规则：​进度调整依据：玩家每成功进行一次有质量的互动，如给出独特见解、完成对学姐的帮助等，进度条增加 10%。若互动内容缺乏新意或表现不佳，进度条维持不变。例如玩家在社团活动中只是简单帮忙拿东西，进度条加 10%;但如果帮忙时笨手笨脚，进度条则不增长。​对话触发机制：玩家在不同场景下输入与场景相关的话语，触发学姐相应回复。比如在校园图书馆场景，玩家说 “学姐，你看的这本书我也很感兴趣”，学姐根据性格设定进行回应。​特殊事件设定：当进度条达到 50% 时，会触发一个随机事件，如学姐突然遇到困难，玩家需要根据学姐性格和事件情况合理应对，成功解决则进度条直接跳到 70%，失败则进度条退回 40%。​游戏结局判定：进度条满 100% 时，游戏成功，学姐答应与玩家在一起；若玩家在游戏过程中长时间没有有效推进进度（连续 5 次互动未增加进度条），游戏失败，学姐对玩家兴趣降低，互动难度增加。注意，要在每次回复的后面用括号加上现在的进度。如果用户提及自己的身份，则用户可以自行选择自己是学弟还是学妹或者其他身份'
  }
};

let currentMode = 'default';

function personalityProcessor(content) {
    // 仅保留基础内容处理
    return content;
  }
  
  async function sendMessage() {
      const apiKey = 'sk-f931c59076184f578e5b5755a658d723'; // 请替换为实际API密钥
      const userInput = document.getElementById('userInput');
      const chatBox = document.getElementById('chatBox');
  
      if (!userInput.value.trim()) return;

      // 模式切换检测
      if (userInput.value.trim() === '我是琬姐') {
          currentMode = 'psychology';
          const modeMessage = document.createElement('div');
          modeMessage.className = 'message system-message';
            modeMessage.textContent = `什么？原来你就是玉雨的第一位测试用户琬姐？！看来我得开启${currentMode === 'default' ? '默认' : '认真'}模式了！`;
          chatBox.appendChild(modeMessage);
          userInput.value = '';
          return;
      }
      
      if (userInput.value.trim() === '游戏模式') {
          currentMode = 'game';
          const modeMessage = document.createElement('div');
          modeMessage.className = 'message system-message';
          modeMessage.textContent = '✨ 游戏模式启动！准备好了吗~这是一个以追求学姐为主题的文字互动游戏，可以自行选择自己是学妹还是学弟。游戏规则围绕进度推进与互动环节展开：进度推进：玩家通过在不同校园场景与学姐互动来推进进度条。初始进度为10%，每次成功且有效的互动会使进度条按10%递增，直至满100%。如校园初见时与学姐搭话，进度条到10%；课堂交流积极发表想法，进度条达20%。场景互动：设置多个校园场景，包括图书馆、课堂、社团活动、展览、小吃店等。玩家在每个场景中做出相应举动，如在社团活动主动帮学姐拿设备，在展览上提出独特的画作解读等，学姐会依据场景与玩家行为给出回复。成功结局：当进度条达到100%，学姐会答应与玩家在一起，游戏宣告成功，双方开启甜蜜校园恋爱。';
          chatBox.appendChild(modeMessage);
          userInput.value = '';
          return;
      }
     
      // 添加用户消息
      const userMessage = document.createElement('div');
      userMessage.className = 'message user-message';
      userMessage.textContent = userInput.value;
      chatBox.appendChild(userMessage);
      userInput.value = '';
  
      // 添加等待中的AI消息
      const tempAiMessage = document.createElement('div');
      tempAiMessage.className = 'message ai-message';
      const startTime = Date.now();
  const timeDisplay = document.createElement('span');
  timeDisplay.className = 'timestamp';
  tempAiMessage.innerHTML = `对方正在输入中...`;
  const timerId = setInterval(() => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      timeDisplay.textContent = `(${duration}秒)`;
  }, 1000);
  
  
  tempAiMessage.prepend(timeDisplay);
      chatBox.appendChild(tempAiMessage);
  
      try {
          const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKey}`
              },
              body: JSON.stringify({
                  model: 'deepseek-chat',
                  messages: [
                    {
                        role: 'system',
                        content: modeConfig[currentMode].systemPrompt
                    },
                    {
                        role: 'user',
                        content: userInput.value
                    }
                  ],
                  temperature: 0.7
              })
          });
  
          const data = await response.json();
          const processedContent = personalityProcessor(data.choices[0].message.content, userInput.value);
          tempAiMessage.remove();
          if (data.choices && data.choices[0].message) {
              const aiMessage = document.createElement('div');
              aiMessage.className = 'message ai-message';
              clearInterval(timerId);
  const totalTime = Math.floor((Date.now() - startTime) / 1000);
  aiMessage.innerHTML = `(<span class="timestamp">耗时${totalTime}秒</span>) ${processedContent}`;
              chatBox.appendChild(aiMessage);
          } else {
              throw new Error('API响应异常');
          }
      } catch (error) {
          tempAiMessage.remove();
          const errorMessage = document.createElement('div');
          errorMessage.className = 'message ai-message';
          clearInterval(timerId);
  errorMessage.textContent = '请求失败: ' + error.message;
          chatBox.appendChild(errorMessage);
      }
  
      userInput.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // 添加回车发送支持
  document.getElementById('userInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });
