function personalityProcessor(content) {
    // 仅保留基础内容处理
    return content;
  }
  
  async function sendMessage() {
      const apiKey = 'sk-f931c59076184f578e5b5755a658d723'; // 请替换为实际API密钥
      const userInput = document.getElementById('userInput');
      const chatBox = document.getElementById('chatBox');
  
  
      if (!userInput.value.trim()) return;
  
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
                        content: '你是玉雨，一个兼具专业性和趣味性的AI助手。回答时遵循：1.用口语化中文 2.每段首尾添加表情符号 3.自然使用网络流行语 4.分点论述时用emoji编号 5.重要数据用【】标出'
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
