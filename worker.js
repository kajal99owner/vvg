addEventListener('fetch', event => {
     event.respondWith(handleRequest(event.request))
   })

   async function handleRequest(request) {
     if (request.method === 'POST') {
       const body = await request.json()
       const message = body.message || body.channel_post
       if (message) {
         const chatId = message.chat.id
         const text = message.text || ''

         // Example integration with an external service (e.g., https://blackbox.ai)
         // You can replace this with actual API calls to blackbox.ai
         const blackboxResponse = await fetch('https://blackbox.ai/some-endpoint', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ query: text }),
         })

         const blackboxData = await blackboxResponse.json()

         // Send a response back to Telegram
         const responseText = blackboxData.response || `You said: ${text}`
         await sendMessage(chatId, responseText)
       }
       return new Response('OK', { status: 200 })
     }
     return new Response('Not Found', { status: 404 })
   }

   async function sendMessage(chatId, text) {
     const botToken = '7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI'
     const url = `https://api.telegram.org/bot${botToken}/sendMessage`
     const response = await fetch(url, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         chat_id: chatId,
         text: text,
       }),
     })
     return response.json()
   }
