const fetch = require('node-fetch');

class Xitroo {
    constructor(xitrooEmail, refreshCounter = 5, refreshWait = 5, httpTimeout = 15) {
        this.xEmail = xitrooEmail;
        this.refreshC = refreshCounter;
        this.refreshW = refreshWait;
        this.httpT = httpTimeout;
    }

    async getLatestInboxRaw() {
        for (let i = 0; i < this.refreshC; i++) {
            try {
                const response = await fetch(`https://api.xitroo.com/v1/mails?locale=de&mailAddress=${this.xEmail}&mailsPerPage=25&minTimestamp=0.0&maxTimestamp=${Math.floor(Date.now() / 1000) + 500}`, {
                    timeout: this.httpT * 1000
                });

                const idSite = await response.json();

                try {
                    const mailResponse = await fetch(`https://api.xitroo.com/v1/mail?locale=de&id=${idSite.mails[0]._id}`);
                    return await mailResponse.json();
                } catch (error) {
                    console.log(`[Xitroo] ${idSite.type}`);
                    if (i === this.refreshC - 1) process.exit();
                    await new Promise(resolve => setTimeout(resolve, this.refreshW * 1000));
                }
            } catch (error) {
                console.log("[Xitroo] HTTP Error");
                if (i === this.refreshC - 1) process.exit();
                await new Promise(resolve => setTimeout(resolve, this.refreshW * 1000));
            }
        }
    }

async getBodyHtmlStrict() {
        const latestInbox = await this.getLatestInboxRaw();
        return Buffer.from(latestInbox.bodyHtmlStrict, 'base64').toString('utf-8');
    }

    async getBodyHtml() {
        const latestInbox = await this.getLatestInboxRaw();
        return Buffer.from(latestInbox.bodyHtml, 'base64').toString('utf-8');
    }

    async getBodyText() {
        const latestInbox = await this.getLatestInboxRaw();
        return Buffer.from(latestInbox.bodyText, 'base64').toString('utf-8');
    }

    async getSubject() {
        const latestInbox = await this.getLatestInboxRaw();
        return Buffer.from(latestInbox.subject, 'base64').toString('utf-8');
    }
}

module.exports = Xitroo;