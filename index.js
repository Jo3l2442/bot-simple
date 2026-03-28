const { Client, GatewayIntentBits } = require("discord.js");

console.log("🚀 Iniciando bot...");

// ====== CLIENT ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ====== CONFIG ======
const logRoleIds = [
  "ID1","ID2","ID3" // poné tus IDs reales
];

// ====== READY ======
client.on("ready", () => {
  console.log(`🤖 Bot conectado como ${client.user.tag}`);
});

// ====== CAMBIO DE ROLES ======
client.on("guildMemberUpdate", async (oldM, newM) => {
  try {
    const added = newM.roles.cache.filter(r => !oldM.roles.cache.has(r.id));
    const removed = oldM.roles.cache.filter(r => !newM.roles.cache.has(r.id));

    const addedLog = added.filter(r => logRoleIds.includes(r.id));
    const removedLog = removed.filter(r => logRoleIds.includes(r.id));

    if (addedLog.size === 0 && removedLog.size === 0) return;

    console.log(`🔄 Cambio en ${newM.user.tag}`);

    addedLog.forEach(role => {
      console.log(`➕ ${role.name}`);
    });

    removedLog.forEach(role => {
      console.log(`➖ ${role.name}`);
    });

  } catch (err) {
    console.error("❌ Error en roles:", err);
  }
});

// ====== ANTI CRASH ======
process.on("unhandledRejection", err => console.error("❌ Error:", err));
process.on("uncaughtException", err => console.error("❌ Error:", err));

// ====== LOGIN ======
client.login(process.env.TOKEN)
  .then(() => console.log("✅ Login correcto"))
  .catch(err => console.error("❌ Error login:", err));
