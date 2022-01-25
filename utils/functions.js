module.exports = {
  shuffleUsers: (userIds) => {
    const shuffledUserIds = userIds.sort((a, b) => 0.5 - Math.random());
    return shuffledUserIds.map((userId, index) => {
      const santaId =
        index === shuffledUserIds.length - 1
          ? shuffledUserIds[0]
          : shuffledUserIds[index + 1];
      return { userId, santaId };
    });
  }
}