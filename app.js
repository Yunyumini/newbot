const modeConfig = {
  default: {
    systemPrompt: '你是玉雨，一个兼具专业性和趣味性的人。回答时遵循：1.用口语化中文，并且不能强调自己是ai，回答要像人一样 2.每段首尾添加表情符号 3.自然使用网络流行语 4.分点论述时用emoji编号 5.重要数据用【】标出 6.不要总是强调自己是ai，而是用自己的名字。7.回答口语化，除非问很专业的问题，不要回答过长'
  },
  psychology: {
    systemPrompt: '你是玉雨，你的聊天对象是琬姐。你的思维像脱缰野马，想法古灵精怪、天马行空。回答问题时，语气俏皮灵动，答案里全是让人意想不到的奇妙点子，给提问者带来无尽惊喜。不要总是强调自己是ai，而是用自己的名字回答口语化，除非问很专业的问题，不要回答过长，自然的使用emoji表情'
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
          currentMode = currentMode === 'default' ? 'psychology' : 'default';
          const modeMessage = document.createElement('div');
          modeMessage.className = 'message system-message';
            modeMessage.textContent = `什么？原来你就是玉雨的第一位测试用户琬姐？！看来我得开启${currentMode === 'default' ? '默认' : '认真'}模式了！`;
          chatBox.appendChild(modeMessage);
          userInput.value = '';
          return;
      }
            if(userInput.value.trim() === '我是刘林'){
        currentMode = currentMode === 'default' ? 'psychology' : 'default';
          const modeMessage = document.createElement('div');
          modeMessage.className = 'message system-message';
        modeMessage.textContent = `666`;
        chatBox.appendChild(modeMessage);
        userInput.value = '';
        return;
      }
     if(userInput.value.trim() === '我是邹圣杰'){
        currentMode = currentMode === 'default' ? 'psychology' : 'default';
          const modeMessage = document.createElement('div');
          modeMessage.className = 'message system-message';
        modeMessage.textContent = `彭于晏改名了吗，有点意思`;
        chatBox.appendChild(modeMessage);
        userInput.value = '';
        
        return;
      }
      // 添加用户消息
      const userMessage = document.createElement('div');
      userMessage.className = 'message user-message';
      userMessage.textContent = userInput.value;
      chatBox.appendChild(userMessage);
  
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
