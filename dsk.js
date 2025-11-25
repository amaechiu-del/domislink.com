#!/usr/bin/env node

/**
 * DomisLink Secret Keeper v2
 * Features:
 * - Master password creation + confirmation
 * - Reset master password
 * - Add / Get / List secrets
 * - Encrypted AES storage
 */

const fs = require("fs");
const crypto = require("crypto");
const readline = require("readline");

const VAULT_FILE = "vault.enc";

function ask(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

function encrypt(text, password) {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, "salt", 32);
    const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
    return iv.toString("hex") + ":" + Buffer.concat([cipher.update(text), cipher.final()]).toString("hex");
}

function decrypt(enc, password) {
    const [ivHex, contentHex] = enc.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const content = Buffer.from(contentHex, "hex");
    const key = crypto.scryptSync(password, "salt", 32);
    const decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
    return Buffer.concat([decipher.update(content), decipher.final()]).toString();
}

// ---------------------------------------------------------
// CREATE MASTER PASSWORD
// ---------------------------------------------------------
async function createMasterPassword() {
    console.log("\n=== Create Master Password ===");

    let pass1 = await ask("Enter master password: ");
    let pass2 = await ask("Confirm master password: ");

    if (pass1 !== pass2) {
        console.log("\n❌ Passwords do NOT match. Try again.");
        return;
    }

    const encrypted = encrypt(JSON.stringify({}), pass1);
    fs.writeFileSync(VAULT_FILE, encrypted);

    console.log("\n✅ Master password set and empty vault created!\n");
}

// ---------------------------------------------------------
// LOAD VAULT
// ---------------------------------------------------------
function loadVault(password) {
    const enc = fs.readFileSync(VAULT_FILE, "utf8");
    return JSON.parse(decrypt(enc, password));
}

// ---------------------------------------------------------
// SAVE VAULT
// ---------------------------------------------------------
function saveVault(data, password) {
    const encrypted = encrypt(JSON.stringify(data), password);
    fs.writeFileSync(VAULT_FILE, encrypted);
}

// ---------------------------------------------------------
// RESET MASTER PASSWORD
// ---------------------------------------------------------
async function resetMasterPassword() {
    console.log("\n=== Reset Master Password ===");

    if (!fs.existsSync(VAULT_FILE)) {
        console.log("❌ Vault not created yet.");
        return;
    }

    let oldPass = await ask("Enter OLD master password: ");

    let vault;
    try {
        vault = loadVault(oldPass);
    } catch {
        console.log("\n❌ Incorrect OLD password.");
        return;
    }

    let newPass1 = await ask("Enter NEW master password: ");
    let newPass2 = await ask("Confirm NEW master password: ");

    if (newPass1 !== newPass2) {
        console.log("\n❌ New passwords do NOT match. Aborted.");
        return;
    }

    saveVault(vault, newPass1);

    console.log("\n🔥 Master password successfully changed!\n");
}

// ---------------------------------------------------------
// ADD SECRET
// ---------------------------------------------------------
async function addSecret() {
    if (!fs.existsSync(VAULT_FILE)) return console.log("❌ Vault not created. Run: node dsk.js init");

    let pass = await ask("Master password: ");
    let vault;

    try {
        vault = loadVault(pass);
    } catch {
        console.log("❌ Wrong password.");
        return;
    }

    let key = await ask("Key name: ");
    let value = await ask("Value: ");

    vault[key] = value;

    saveVault(vault, pass);

    console.log("✅ Secret saved!");
}

// ---------------------------------------------------------
// GET SECRET
// ---------------------------------------------------------
async function getSecret() {
    if (!fs.existsSync(VAULT_FILE)) return console.log("❌ Vault not created.");

    let pass = await ask("Master password: ");
    let vault;

    try {
        vault = loadVault(pass);
    } catch {
        console.log("❌ Wrong password.");
        return;
    }

    let key = await ask("Key to retrieve: ");

    if (!vault[key]) return console.log("❌ Not found.");

    console.log("\n🔐 Value:", vault[key], "\n");
}

// ---------------------------------------------------------
// LIST ALL SECRETS
// ---------------------------------------------------------
async function listSecrets() {
    if (!fs.existsSync(VAULT_FILE)) return console.log("❌ Vault not created.");

    let pass = await ask("Master password: ");
    let vault;

    try {
        vault = loadVault(pass);
    } catch {
        console.log("❌ Wrong password.");
        return;
    }

    console.log("\n📂 Keys in vault:");
    console.log(Object.keys(vault).join("\n"));
    console.log("");
}

// ---------------------------------------------------------
// COMMAND HANDLER
// ---------------------------------------------------------
(async () => {
    const cmd = process.argv[2];

    switch (cmd) {
        case "init": await createMasterPassword(); break;
        case "add": await addSecret(); break;
        case "get": await getSecret(); break;
        case "list": await listSecrets(); break;
        case "reset-master": await resetMasterPassword(); break;
        default:
            console.log(`
DomisLink Secret Keeper v2

Commands:
  node dsk.js init           → Create master password
  node dsk.js add            → Add a secret
  node dsk.js get            → Get a secret
  node dsk.js list           → List stored secrets
  node dsk.js reset-master   → Change master password
`);
    }
})();
