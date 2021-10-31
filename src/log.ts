import { Signale } from 'signale';

export const log = new Signale();
log.config({
    displayFilename: true,
    displayTimestamp: true,
    displayDate: false
});
