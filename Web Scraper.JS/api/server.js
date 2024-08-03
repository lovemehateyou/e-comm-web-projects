const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const sql = require('mssql');
const path = require('path');
const app = express();
const cors = require('cors');
const fs = require('fs');
const port = process.env.PORT || 3000;

// SQL Server connection settings
const config = {
    user: 'lovemehateyou',
    password: 'zerubabel11821996',
    server: 'LAPTOP-RRR8Q3CJ',
    database: 'news',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function fetchNews() {
    try {
        const { data } = await axios.get('https://www.animenewsnetwork.com/');
        const $ = cheerio.load(data);
        const sections = $('.mainfeed-section.herald-boxes');
        const news = sections.find('.herald.box.news.t-news');

        const now = new Date();
        const currentDay = now.getDate();
        
        let articles = [];

        for (let i = 0; i < news.length; i++) {
            let time = $(news[i]).find('time').text().trim();
            let genre = $(news[i]).find('.topics').text().trim().toLowerCase();
            if (time.includes(currentDay) && (genre === "live-action" || genre === "anime" || genre === "manga")) {
                let title = $(news[i]).find('h3').text().trim();
                let description = $(news[i]).find('.snippet span').text().trim() || 'No description available';
                let detailLink = $(news[i]).find('a').attr('href');

                articles.push({
                    title,
                    description,
                    detailLink: 'https://www.animenewsnetwork.com' + detailLink,
                    genre,
                    time
                });
            }
        }

        const pathToFile = path.join(__dirname, 'public', 'articles.json');
        fs.writeFileSync(pathToFile, JSON.stringify(articles, null, 2));

        const pathToFile2 = path.join(__dirname, 'public', 'all-articles.json');
        fs.writeFileSync(pathToFile2, JSON.stringify(articles, null, 2));

        await sql.connect(config);
        

        for (const article of articles) {
            let request = new sql.Request();

            let result = await request
            .input('title', sql.NVarChar, article.title)
            .query(`SELECT COUNT(*) AS count FROM aninews WHERE title = @title`);

            if (result.recordset[0].count === 0) {

                request = new sql.Request();
                await request
                    .input('title', sql.NVarChar, article.title)
                    .input('description', sql.NVarChar, article.description)
                    .input('detailLink', sql.NVarChar, article.detailLink)
                    .input('genre', sql.NVarChar, article.genre)
                    .input('time', sql.NVarChar, article.time)
                    .query(`
                        INSERT INTO aninews (title, descriptions, detail_link, genre, timeing, statues)
                        VALUES (@title, @description, @detailLink, @genre, @time, 'read')
                    `);
            }
        }
        await sql.close()
        console.log('Articles saved!');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

app.use(cors({
    origin: 'http://127.0.0.1:5500'  // Allow only this origin
}));

app.get('/scrape-news', async (req, res) => {
    await fetchNews();
    res.send('News articles have been scraped and saved.');
    res.end()
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


