const {
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    EmbedBuilder
} = require('discord.js');

function initMessage(client, totalAccounts = 0) {
    const startTime = Math.floor(Date.now() / 1000 - client.uptime / 1000);
    const imageURL = 'https://cdn.discordapp.com/attachments/1372859073766232125/1373323664530866286/5acaa78d-3575-44cb-901c-65177cf7f4cf.jpg?ex=68805914&is=687f0794&hm=31d096783ea71946889998173d67d1cdff1a90d6b034ea3cc3cf7c5720a87ffb&';

    return new EmbedBuilder()
        .setColor(0x000000) // BRUTAL DARK
        .setTitle('☠️ 𝗔𝗨𝗧𝗢𝗣𝗢𝗦𝗧 𝗕𝗬 𝗭𝗔𝗖𝗞𝗭 ☠️')
        .setDescription(`**🩸 DARK MODE ENGAGED 🩸**\n> _"We don’t sleep. We automate."_  
  
🕒 **Uptime:** <t:${startTime}:R>  
🧠 **Total Clones Active:** ${totalAccounts}`)
        .setThumbnail(imageURL)
        .setFooter({
            text: '👁 POWERED BY ZACKZ NETWORK',
            iconURL: imageURL
        })
        .setTimestamp();
}

function createMain() {
    const select = new StringSelectMenuBuilder()
        .setCustomId('main_menu')
        .setPlaceholder('💀 CHOOSE YOUR COMMAND')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('☠️ Edit Account')
                .setValue('edit_account')
                .setDescription('Modify your shadow agent.'),
            new StringSelectMenuOptionBuilder()
                .setLabel('⚔️ Add Account')
                .setValue('add_account')
                .setDescription('Recruit a new executor.'),
            new StringSelectMenuOptionBuilder()
                .setLabel('🔥 Start / Stop Auto Post')
                .setValue('toggle_post')
                .setDescription('Unleash or silence the beast.')
        );

    return new ActionRowBuilder().addComponents(select);
}

function selectAccount(accounts, purpose = 'edit') {
    const select = new StringSelectMenuBuilder()
        .setCustomId(`account_select_${purpose}`)
        .setPlaceholder(purpose === 'edit' ? '☠️ Pick an agent to edit' : '☠️ Choose executor to deploy');

    accounts.forEach(account => {
        select.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(`📡 Channel: ${account.channelId}`)
                .setValue(account.token)
                .setDescription(`💬 "${account.message.substring(0, 50)}..."`)
        );
    });

    return new ActionRowBuilder().addComponents(select);
}

function accountModals(isEdit = false) {
    const modal = new ModalBuilder()
        .setCustomId(isEdit ? 'edit_account_modal' : 'add_account_modal')
        .setTitle(isEdit ? '☠️ MODIFY AGENT' : '⚔️ RECRUIT AGENT');

    const tokenInput = new TextInputBuilder()
        .setCustomId('token')
        .setLabel('🧬 Token')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const messageInput = new TextInputBuilder()
        .setCustomId('message')
        .setLabel('📜 Message')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const channelInput = new TextInputBuilder()
        .setCustomId('channelId')
        .setLabel('📡 Channel ID')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const delayInput = new TextInputBuilder()
        .setCustomId('delay')
        .setLabel('⏱️ Delay (ms)')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const rows = [
        new ActionRowBuilder().addComponents(tokenInput),
        new ActionRowBuilder().addComponents(messageInput),
        new ActionRowBuilder().addComponents(channelInput),
        new ActionRowBuilder().addComponents(delayInput)
    ];

    modal.addComponents(rows);
    return modal;
}

module.exports = { initMessage, createMain, selectAccount, accountModals };
