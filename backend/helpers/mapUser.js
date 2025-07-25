function mapUser(user) {
  return {
    id: user._id,
    login: user.login,
    name: user.name,
    avatar: user.avatar || null,
    role: user.role,
    settings: {
      timezone: user.settings?.timezone || "Europe/Chisinau",
    },
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

module.exports = mapUser;
