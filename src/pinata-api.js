import pinataSDK from '@pinata/sdk';
import { PINATA_API_KEY, PINATA_API_SECRET } from './config.js';

const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

export default pinata;
