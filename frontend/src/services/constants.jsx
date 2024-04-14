export function getChatId(chatId1, chatId2) {
  if (chatId1 > chatId2) {
    return `${chatId1}-${chatId2}`;
  }
  return `${chatId2}-${chatId1}`;
}
