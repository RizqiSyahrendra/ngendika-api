import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
dotenv.config();

const ESClient = new Client({ node: `${process.env.ES_HOST}:${process.env.ES_PORT}` });

export default ESClient;