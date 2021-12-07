export const toEbarimt = (messageBroker, config, sendData, action) => {
  const postData = {
    token: config.apiToken,
    apiKey: config.apiKey,
    apiSecret: config.apiSecret,
    orderInfos: JSON.stringify(sendData),
  };

  messageBroker().sendMessage('rpc_queue:erxes-automation-ebarimt', {
    action,
    payload: JSON.stringify(postData),
  });
}