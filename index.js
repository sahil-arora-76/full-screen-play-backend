const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const dirPath = '/Users/lazyidlidev01/Desktop/playVid/public';
const isImage = ['.gif', '.jpg', '.jpeg', '.png']; //you can add more
const isVideo = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4']; // you can add more extention
app.use(express.json()); 
app.use(cors());
app.get('/', async (req, res) => {
	try {
		const dirs = await fs.readdirSync(dirPath);
		const tmpDirs = [];
		for (const dir of dirs) {
			const ext = dir.split('.').pop();
			console.log(ext);
			const type = isVideo.includes('.' + ext) ? 'vid' : 'img';
			tmpDirs.push({ name: dir, type: type, path: dirPath + '/' + dir });
		}
		return res.status(200).json({ message: tmpDirs });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: 'error' });
	}
});

app.listen(8000, () => {
	console.log(`Server started on port`);
});
