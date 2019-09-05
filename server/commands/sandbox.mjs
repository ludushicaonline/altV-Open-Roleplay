import * as alt from 'alt';
import * as chat from '../chat/chat.mjs';
import * as configurationItems from '../configuration/items.mjs';

console.log('Loaded: commands->sandbox.mjs');

const sandboxhelp = [
    //
    '/pos, /b, /me, /do',
    '/addveh (model)',
    '/addcash (amount)',
    '/wep (hash)',
    '/face',
    '/granola, /coffee',
    '/tpto (rp-name)',
    '/players, /clearchat',
    'Z + Right-Click to Interact',
    'I for Inventory'
];

chat.registerCmd('help', player => {
    sandboxhelp.forEach(helper => {
        player.send(`${helper}`);
    });
});

chat.registerCmd('pos', player => {
    console.log(player.pos);
});

chat.registerCmd('addcash', (player, value) => {
    let data = value * 1;
    if (value > 600000) return;
    player.addCash(data);
});

chat.registerCmd('wep', (player, hash) => {
    if (hash === undefined) {
        player.send(`Hash; such as: -270015777`);
        return;
    }

    player.giveWeapon(hash[0], 9999, true);
});

chat.registerCmd('face', player => {
    player.showFaceCustomizerDialogue(player.pos);
});

chat.registerCmd('granola', player => {
    let itemTemplate = configurationItems.Items['GranolaBar'];
    player.addItem(itemTemplate, 5);
});

chat.registerCmd('coffee', player => {
    let itemTemplate = configurationItems.Items['Coffee'];
    player.addItem(itemTemplate, 5);
});

chat.registerCmd('addveh', (player, arg) => {
    player.addVehicle(arg[0], player.pos, new alt.Vector3(0, 0, 0));
});

chat.registerCmd('tpto', (player, arg) => {
    if (arg === undefined) {
        player.send('/tpto (roleplay_name)');
        return;
    }

    let target = alt.Player.all.find(x => x.data.name.includes(arg[0]));

    if (target === undefined) {
        player.send('User was not found.');
        return;
    }

    player.pos = target.pos;
});

chat.registerCmd('players', player => {
    alt.Player.all.forEach(t => {
        player.send(`${t.data.name}`);
    });
});
