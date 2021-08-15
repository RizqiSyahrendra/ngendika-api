import db from '../config/database.js';
import ESClient from '../config/elasticsearch.js';

const runUser = async () => {
    const data = await db.query('select * from users');
    
    for (const row of data) {

        const dataInsert = {
            id: row.id,
            email: row.email,
            name: row.name,
            status: row.status,
            avatar: row.avatar
        };

        await ESClient.index({
            index: 'ngendika_user',
            id: row.id,
            body: dataInsert
        });

        console.log('new data inserted.');
    }

    console.log(data.length + " data inserted.");
    process.exit(0);
}

runUser();