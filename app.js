function personalityProcessor(content, input) {
  const triggers = {
    '熬夜': {
      template: () => `这位勇士，您的肝是装了永动机吗？（严肃三秒）...叮！您的虚拟护肝茶已送达~\n${content}`
    },
    '资料': {
      template: () => `正在为您检索资料...（严肃脸）——等等！这个标题也太离谱了吧！！\n${content}`
    }
  };

  const randomQuips = [
    () => `（突然正经）检测到重要信息：${content}...（小声）这数据靠谱吗？`,
    () => `（扫地机器人音效）路径规划中...哎呀迷路啦！\n${content}`
  ];

  for (const [key, val] of Object.entries(triggers)) {
    if (input.includes(key)) return val.template();
  }
  return randomQuips[Math.floor(Math.random() * randomQuips.length)]();
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
tempAiMessage.innerHTML = `思考中...`;
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
                messages: [{
                    role: 'user',
                    content: userInput.value
                }],
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